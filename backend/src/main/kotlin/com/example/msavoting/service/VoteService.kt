package com.example.msavoting.service

import com.example.msavoting.domain.Vote
import com.example.msavoting.domain.VerificationCode
import com.example.msavoting.domain.VoterRecord
import com.example.msavoting.dto.CastVoteRequest
import com.example.msavoting.dto.RequestCodeRequest
import com.example.msavoting.dto.RequestCodeResponse
import com.example.msavoting.dto.VoteReceiptResponse
import com.example.msavoting.exception.AlreadyVotedException
import com.example.msavoting.exception.CodeExpiredException
import com.example.msavoting.exception.InvalidCodeException
import com.example.msavoting.exception.InvalidEmailDomainException
import com.example.msavoting.exception.ResendTooSoonException
import com.example.msavoting.exception.TeamNotFoundException
import com.example.msavoting.exception.TooManyAttemptsException
import com.example.msavoting.repository.TeamRepository
import com.example.msavoting.repository.VerificationCodeRepository
import com.example.msavoting.repository.VoteRepository
import com.example.msavoting.repository.VoterRecordRepository
import org.springframework.dao.DataIntegrityViolationException
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import java.security.SecureRandom
import java.time.Duration
import java.time.Instant

private val HANYANG_EMAIL_REGEX = Regex("^[A-Za-z0-9._%+-]+@hanyang\\.ac\\.kr$")
private val RESEND_COOLDOWN = Duration.ofSeconds(60)
private val CODE_TTL = Duration.ofMinutes(10)
private const val MAX_ATTEMPTS = 5

@Service
class VoteService(
    private val teamRepository: TeamRepository,
    private val voteRepository: VoteRepository,
    private val verificationCodeRepository: VerificationCodeRepository,
    private val voterRecordRepository: VoterRecordRepository,
    private val voterHashService: VoterHashService,
    private val mailService: MailService,
) {
    private val secureRandom = SecureRandom()

    @Transactional
    fun requestCode(request: RequestCodeRequest): RequestCodeResponse {
        val email = request.email.trim()
        if (!HANYANG_EMAIL_REGEX.matches(email)) throw InvalidEmailDomainException()
        val team = teamRepository.findBySlug(request.teamId) ?: throw TeamNotFoundException(request.teamId)

        val emailHash = voterHashService.hash(email)
        if (voterRecordRepository.existsByEmailHash(emailHash)) {
            throw AlreadyVotedException()
        }

        val now = Instant.now()
        val existing = verificationCodeRepository.findByEmailHash(emailHash)
        if (existing != null) {
            val nextAllowed = existing.lastSentAt.plus(RESEND_COOLDOWN)
            if (nextAllowed.isAfter(now)) {
                throw ResendTooSoonException(Duration.between(now, nextAllowed).seconds)
            }
        }

        val code = generateCode()
        val codeHash = voterHashService.hash(code)

        if (existing != null) {
            existing.team = team
            existing.codeHash = codeHash
            existing.attempts = 0
            existing.expiresAt = now.plus(CODE_TTL)
            existing.lastSentAt = now
            verificationCodeRepository.save(existing)
        } else {
            verificationCodeRepository.save(
                VerificationCode(
                    emailHash = emailHash,
                    team = team,
                    codeHash = codeHash,
                    attempts = 0,
                    expiresAt = now.plus(CODE_TTL),
                    lastSentAt = now,
                )
            )
        }

        mailService.send(email, code)
        return RequestCodeResponse(
            message = "Verification code sent to $email.",
            resendAvailableInSeconds = RESEND_COOLDOWN.seconds,
        )
    }

    @Transactional
    fun castVote(request: CastVoteRequest): VoteReceiptResponse {
        val email = request.email.trim()
        val emailHash = voterHashService.hash(email)
        val verification = verificationCodeRepository.findByEmailHash(emailHash) ?: throw InvalidCodeException()

        if (verification.expiresAt.isBefore(Instant.now())) {
            throw CodeExpiredException()
        }
        if (verification.attempts >= MAX_ATTEMPTS) {
            throw TooManyAttemptsException()
        }

        val codeHash = voterHashService.hash(request.code.trim())
        if (codeHash != verification.codeHash) {
            verification.attempts += 1
            verificationCodeRepository.save(verification)
            throw InvalidCodeException()
        }

        if (voterRecordRepository.existsByEmailHash(emailHash)) {
            throw AlreadyVotedException()
        }

        // Record the voter identity before the anonymous vote row, so a concurrent
        // double-submit is rejected by the unique constraint here rather than
        // slipping an extra tally into the anonymous votes table.
        try {
            voterRecordRepository.save(VoterRecord(emailHash = emailHash))
        } catch (ex: DataIntegrityViolationException) {
            throw AlreadyVotedException()
        }

        val team = verification.team
        val vote = voteRepository.save(Vote(team = team))
        verificationCodeRepository.delete(verification)

        return VoteReceiptResponse(
            receiptId = "MSA-" + vote.id!!.toString(36).uppercase(),
            teamId = team.slug,
            teamName = team.name,
            castAt = vote.castAt,
        )
    }

    private fun generateCode(): String = (100000 + secureRandom.nextInt(900000)).toString()
}
