package com.example.msavoting.dto

import java.math.BigDecimal

data class TeamResultResponse(
    val id: String,
    val name: String,
    val accent: String,
    val votes: Long,
    val percentage: BigDecimal,
    val president: CandidateResponse,
    val vp: CandidateResponse,
)

data class ResultsResponse(
    val totalVotesCast: Long,
    val totalEligibleVoters: Long,
    val turnoutPercentage: BigDecimal,
    val leadingTeamId: String?,
    val teams: List<TeamResultResponse>,
)
