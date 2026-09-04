package com.example.msavoting.service

import com.example.msavoting.domain.CandidateInfo
import com.example.msavoting.domain.Initiative
import com.example.msavoting.domain.Pillar
import com.example.msavoting.domain.Team
import com.example.msavoting.dto.CreateTeamRequest
import com.example.msavoting.dto.InitiativeResponse
import com.example.msavoting.dto.PillarResponse
import com.example.msavoting.dto.TeamDetailResponse
import com.example.msavoting.dto.TeamSummaryResponse
import com.example.msavoting.exception.InvalidTeamDataException
import com.example.msavoting.exception.PhotoNotFoundException
import com.example.msavoting.exception.TeamNotFoundException
import com.example.msavoting.repository.TeamRepository
import com.example.msavoting.repository.VerificationCodeRepository
import com.example.msavoting.repository.VoteRepository
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import java.util.Base64

private val ALLOWED_ACCENTS = setOf("blue", "purple", "green", "orange")
private val ALLOWED_PHOTO_TYPES = setOf("image/jpeg", "image/png")
private const val MAX_PHOTO_BYTES = 2 * 1024 * 1024 // 2MB

@Service
@Transactional(readOnly = true)
class TeamService(
    private val teamRepository: TeamRepository,
    private val voteRepository: VoteRepository,
    private val verificationCodeRepository: VerificationCodeRepository,
) {
    fun listSummaries(): List<TeamSummaryResponse> {
        val voteCounts = voteRepository.countGroupedByTeam().associate { it.teamId to it.voteCount }
        return teamRepository.findAll().map { team -> toSummary(team, voteCounts[team.id] ?: 0L) }
    }

    fun getDetail(slug: String): TeamDetailResponse {
        val team = teamRepository.findBySlug(slug) ?: throw TeamNotFoundException(slug)
        val votes = voteRepository.countGroupedByTeam().firstOrNull { it.teamId == team.id }?.voteCount ?: 0L
        return toDetail(team, votes)
    }

    fun getPhoto(slug: String, role: String): Pair<ByteArray, String> {
        val team = teamRepository.findBySlug(slug) ?: throw TeamNotFoundException(slug)
        val candidate = when (role) {
            "president" -> team.president
            "vp" -> team.vp
            else -> throw PhotoNotFoundException(slug, role)
        }
        val photo = candidate.photo ?: throw PhotoNotFoundException(slug, role)
        val contentType = candidate.photoContentType ?: "application/octet-stream"
        return photo to contentType
    }

    private fun toSummary(team: Team, votes: Long) = TeamSummaryResponse(
        id = team.slug,
        name = team.name,
        slogan = team.slogan,
        accent = team.accent,
        votes = votes,
        president = team.president.toResponse(team.slug, "president"),
        vp = team.vp.toResponse(team.slug, "vp"),
    )

    private fun toDetail(team: Team, votes: Long) = TeamDetailResponse(
        id = team.slug,
        name = team.name,
        slogan = team.slogan,
        accent = team.accent,
        votes = votes,
        president = team.president.toResponse(team.slug, "president"),
        vp = team.vp.toResponse(team.slug, "vp"),
        vision = team.vision,
        pillars = team.pillars.map { PillarResponse(icon = it.icon, title = it.title, desc = it.description) },
        initiatives = team.initiatives.map { InitiativeResponse(headline = it.headline, detail = it.detail) },
    )

    @Transactional
    fun createTeam(request: CreateTeamRequest): TeamDetailResponse {
        val accent = request.accent.trim().lowercase()
        if (accent !in ALLOWED_ACCENTS) {
            throw InvalidTeamDataException("accent must be one of $ALLOWED_ACCENTS")
        }
        if (request.name.isBlank()) throw InvalidTeamDataException("Team name is required.")
        if (request.slogan.isBlank()) throw InvalidTeamDataException("Slogan is required.")
        if (request.vision.isBlank()) throw InvalidTeamDataException("Vision is required.")
        if (request.president.name.isBlank() || request.president.dept.isBlank()) {
            throw InvalidTeamDataException("President name and department are required.")
        }
        if (request.vp.name.isBlank() || request.vp.dept.isBlank()) {
            throw InvalidTeamDataException("VP name and department are required.")
        }
        if (request.pillars.isEmpty()) throw InvalidTeamDataException("At least one pillar is required.")
        if (request.initiatives.isEmpty()) throw InvalidTeamDataException("At least one initiative is required.")

        val team = Team(
            slug = generateSlug(request.name),
            name = request.name.trim(),
            slogan = request.slogan.trim(),
            accent = accent,
            president = CandidateInfo(
                name = request.president.name.trim(),
                dept = request.president.dept.trim(),
                initials = generateInitials(request.president.name),
                bio = request.president.bio?.trim()?.ifBlank { null },
                achievements = request.president.achievements?.trim()?.ifBlank { null },
                photoPositionX = clampPosition(request.president.photoPositionX),
                photoPositionY = clampPosition(request.president.photoPositionY),
            ).also { decodePhotoInto(it, request.president.photoBase64, request.president.photoContentType) },
            vp = CandidateInfo(
                name = request.vp.name.trim(),
                dept = request.vp.dept.trim(),
                initials = generateInitials(request.vp.name),
                bio = request.vp.bio?.trim()?.ifBlank { null },
                achievements = request.vp.achievements?.trim()?.ifBlank { null },
                photoPositionX = clampPosition(request.vp.photoPositionX),
                photoPositionY = clampPosition(request.vp.photoPositionY),
            ).also { decodePhotoInto(it, request.vp.photoBase64, request.vp.photoContentType) },
            vision = request.vision.trim(),
        )
        request.pillars.forEachIndexed { index, p ->
            team.pillars.add(Pillar(team = team, icon = p.icon.trim(), title = p.title.trim(), description = p.desc.trim(), sortOrder = index + 1))
        }
        request.initiatives.forEachIndexed { index, i ->
            team.initiatives.add(Initiative(team = team, headline = i.headline.trim(), detail = i.detail.trim(), sortOrder = index + 1))
        }

        val saved = teamRepository.save(team)
        return toDetail(saved, votes = 0L)
    }

    @Transactional
    fun deleteTeam(slug: String) {
        val team = teamRepository.findBySlug(slug) ?: throw TeamNotFoundException(slug)
        voteRepository.deleteByTeamId(team.id!!)
        verificationCodeRepository.deleteByTeamId(team.id!!)
        teamRepository.delete(team)
    }

    private fun generateSlug(name: String): String {
        val base = name.trim().lowercase()
            .replace(Regex("[^a-z0-9\\s-]"), "")
            .replace(Regex("\\s+"), "-")
            .trim('-')
            .ifBlank { "team" }
        var candidate = base
        var suffix = 2
        while (teamRepository.findBySlug(candidate) != null) {
            candidate = "$base-$suffix"
            suffix++
        }
        return candidate
    }

    private fun decodePhotoInto(candidate: CandidateInfo, photoBase64: String?, contentType: String?) {
        if (photoBase64.isNullOrBlank()) return
        if (contentType !in ALLOWED_PHOTO_TYPES) {
            throw InvalidTeamDataException("Photo must be a JPEG or PNG image.")
        }
        val rawBase64 = photoBase64.substringAfterLast(',')
        val bytes = try {
            Base64.getDecoder().decode(rawBase64)
        } catch (ex: IllegalArgumentException) {
            throw InvalidTeamDataException("Photo data is not valid base64.")
        }
        if (bytes.size > MAX_PHOTO_BYTES) {
            throw InvalidTeamDataException("Photo must be under 2MB.")
        }
        candidate.photo = bytes
        candidate.photoContentType = contentType
    }

    private fun clampPosition(value: Int?): Int = (value ?: 50).coerceIn(0, 100)

    private fun generateInitials(name: String): String {
        val parts = name.trim().split(Regex("\\s+")).filter { it.isNotBlank() }
        return when {
            parts.isEmpty() -> "??"
            parts.size == 1 -> parts[0].take(2).uppercase()
            else -> (parts.first().take(1) + parts.last().take(1)).uppercase()
        }
    }
}
