package com.example.msavoting.dto

data class CreateTeamRequest(
    val name: String,
    val slogan: String,
    val accent: String,
    val vision: String,
    val president: PersonRequest,
    val vp: PersonRequest,
    val pillars: List<PillarRequest>,
    val initiatives: List<InitiativeRequest>,
)

data class PersonRequest(
    val name: String,
    val dept: String,
)

data class PillarRequest(
    val icon: String,
    val title: String,
    val desc: String,
)

data class InitiativeRequest(
    val headline: String,
    val detail: String,
)
