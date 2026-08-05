package com.example.msavoting.service

import com.example.msavoting.domain.Team
import com.example.msavoting.dto.InitiativeResponse
import com.example.msavoting.dto.PillarResponse
import com.example.msavoting.dto.TeamDetailResponse
import com.example.msavoting.dto.TeamSummaryResponse
import com.example.msavoting.exception.TeamNotFoundException
import com.example.msavoting.repository.TeamRepository
import com.example.msavoting.repository.VoteRepository
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

@Service
@Transactional(readOnly = true)
class TeamService(
    private val teamRepository: TeamRepository,
    private val voteRepository: VoteRepository,
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

    private fun toSummary(team: Team, votes: Long) = TeamSummaryResponse(
        id = team.slug,
        name = team.name,
        slogan = team.slogan,
        accent = team.accent,
        votes = votes,
        president = team.president.toResponse(),
        vp = team.vp.toResponse(),
    )

    private fun toDetail(team: Team, votes: Long) = TeamDetailResponse(
        id = team.slug,
        name = team.name,
        slogan = team.slogan,
        accent = team.accent,
        votes = votes,
        president = team.president.toResponse(),
        vp = team.vp.toResponse(),
        vision = team.vision,
        pillars = team.pillars.map { PillarResponse(icon = it.icon, title = it.title, desc = it.description) },
        initiatives = team.initiatives.map { InitiativeResponse(headline = it.headline, detail = it.detail) },
    )
}
