package com.example.msavoting.service

import com.example.msavoting.dto.ResultsResponse
import com.example.msavoting.dto.TeamResultResponse
import com.example.msavoting.repository.TeamRepository
import com.example.msavoting.repository.VoteRepository
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import java.math.BigDecimal
import java.math.RoundingMode

@Service
@Transactional(readOnly = true)
class ResultsService(
    private val teamRepository: TeamRepository,
    private val voteRepository: VoteRepository,
    private val electionSettings: ElectionSettingsProvider,
) {
    fun getResults(): ResultsResponse {
        val voteCounts = voteRepository.countGroupedByTeam().associate { it.teamId to it.voteCount }
        val totalVotesCast = voteCounts.values.sum()

        val teamResults = teamRepository.findAll()
            .map { team ->
                val votes = voteCounts[team.id] ?: 0L
                TeamResultResponse(
                    id = team.slug,
                    name = team.name,
                    accent = team.accent,
                    votes = votes,
                    percentage = percentageOf(votes, totalVotesCast),
                    president = team.president.toResponse(team.slug, "president"),
                    vp = team.vp.toResponse(team.slug, "vp"),
                )
            }
            .sortedByDescending { it.votes }

        val totalEligibleVoters = electionSettings.totalEligibleVoters()

        return ResultsResponse(
            totalVotesCast = totalVotesCast,
            totalEligibleVoters = totalEligibleVoters,
            turnoutPercentage = percentageOf(totalVotesCast, totalEligibleVoters),
            leadingTeamId = teamResults.firstOrNull()?.id,
            teams = teamResults,
        )
    }

    private fun percentageOf(part: Long, whole: Long): BigDecimal {
        if (whole <= 0) return BigDecimal.ZERO.setScale(1)
        return BigDecimal(part)
            .divide(BigDecimal(whole), 4, RoundingMode.HALF_UP)
            .multiply(BigDecimal(100))
            .setScale(1, RoundingMode.HALF_UP)
    }
}
