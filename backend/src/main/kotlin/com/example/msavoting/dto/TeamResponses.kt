package com.example.msavoting.dto

data class CandidateResponse(
    val name: String,
    val dept: String,
    val initials: String,
    val photoUrl: String? = null,
)

data class PillarResponse(
    val icon: String,
    val title: String,
    val desc: String,
)

data class InitiativeResponse(
    val headline: String,
    val detail: String,
)

data class TeamSummaryResponse(
    val id: String,
    val name: String,
    val slogan: String,
    val accent: String,
    val votes: Long,
    val president: CandidateResponse,
    val vp: CandidateResponse,
)

data class TeamDetailResponse(
    val id: String,
    val name: String,
    val slogan: String,
    val accent: String,
    val votes: Long,
    val president: CandidateResponse,
    val vp: CandidateResponse,
    val vision: String,
    val pillars: List<PillarResponse>,
    val initiatives: List<InitiativeResponse>,
)
