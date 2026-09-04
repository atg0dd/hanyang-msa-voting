package com.example.msavoting.web

import com.example.msavoting.dto.CandidateResponse
import com.example.msavoting.dto.CreateTeamRequest
import com.example.msavoting.dto.InitiativeRequest
import com.example.msavoting.dto.PersonRequest
import com.example.msavoting.dto.PillarRequest
import com.example.msavoting.dto.TeamDetailResponse
import com.example.msavoting.dto.TeamSummaryResponse
import com.example.msavoting.exception.InvalidTeamDataException
import com.example.msavoting.exception.TeamNotFoundException
import com.example.msavoting.service.TeamService
import org.junit.jupiter.api.Test
import org.mockito.Mockito.`when`
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest
import org.springframework.http.MediaType
import org.springframework.test.context.bean.override.mockito.MockitoBean
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.status

@WebMvcTest(TeamController::class)
class TeamControllerTest(@Autowired val mockMvc: MockMvc) {

    @MockitoBean
    lateinit var teamService: TeamService

    @Test
    fun `list returns teams as json`() {
        `when`(teamService.listSummaries()).thenReturn(
            listOf(
                TeamSummaryResponse(
                    id = "digital-future",
                    name = "Team Digital Future",
                    slogan = "Transparent governance. Connected campus. Your voice, amplified.",
                    accent = "blue",
                    votes = 49,
                    president = CandidateResponse("Kim Jun-su", "Computer Science", "JS"),
                    vp = CandidateResponse("Choi Soo-yeon", "Political Science & Diplomacy", "CS"),
                )
            )
        )

        mockMvc.perform(get("/api/teams"))
            .andExpect(status().isOk)
            .andExpect(jsonPath("$[0].id").value("digital-future"))
            .andExpect(jsonPath("$[0].votes").value(49))
    }

    @Test
    fun `getBySlug returns 404 for unknown team`() {
        `when`(teamService.getDetail("nope")).thenThrow(TeamNotFoundException("nope"))

        mockMvc.perform(get("/api/teams/nope"))
            .andExpect(status().isNotFound)
            .andExpect(jsonPath("$.error").value("Team not found: nope"))
    }

    private val sampleCreateRequest = CreateTeamRequest(
        name = "Team New Wave",
        slogan = "Fresh energy for ERICA.",
        accent = "orange",
        vision = "A campus that moves forward together.",
        president = PersonRequest("Song Ha-eun", "Media Communication"),
        vp = PersonRequest("Oh Tae-yang", "Economics"),
        pillars = listOf(PillarRequest("🚀", "Momentum", "Keep things moving.")),
        initiatives = listOf(InitiativeRequest("Launch a feedback portal", "Within the first month.")),
    )

    @Test
    fun `create returns the new team as json`() {
        `when`(teamService.createTeam(sampleCreateRequest)).thenReturn(
            TeamDetailResponse(
                id = "team-new-wave",
                name = "Team New Wave",
                slogan = "Fresh energy for ERICA.",
                accent = "orange",
                votes = 0,
                president = CandidateResponse("Song Ha-eun", "Media Communication", "SH"),
                vp = CandidateResponse("Oh Tae-yang", "Economics", "OT"),
                vision = "A campus that moves forward together.",
                pillars = emptyList(),
                initiatives = emptyList(),
            )
        )

        mockMvc.perform(
            post("/api/teams")
                .contentType(MediaType.APPLICATION_JSON)
                .content(
                    """{"name":"Team New Wave","slogan":"Fresh energy for ERICA.","accent":"orange",
                        "vision":"A campus that moves forward together.",
                        "president":{"name":"Song Ha-eun","dept":"Media Communication"},
                        "vp":{"name":"Oh Tae-yang","dept":"Economics"},
                        "pillars":[{"icon":"🚀","title":"Momentum","desc":"Keep things moving."}],
                        "initiatives":[{"headline":"Launch a feedback portal","detail":"Within the first month."}]}"""
                )
        )
            .andExpect(status().isOk)
            .andExpect(jsonPath("$.id").value("team-new-wave"))
            .andExpect(jsonPath("$.votes").value(0))
    }

    @Test
    fun `create returns 400 for an invalid accent`() {
        `when`(teamService.createTeam(sampleCreateRequest))
            .thenThrow(InvalidTeamDataException("accent must be one of [blue, purple, green, orange]"))

        mockMvc.perform(
            post("/api/teams")
                .contentType(MediaType.APPLICATION_JSON)
                .content(
                    """{"name":"Team New Wave","slogan":"Fresh energy for ERICA.","accent":"orange",
                        "vision":"A campus that moves forward together.",
                        "president":{"name":"Song Ha-eun","dept":"Media Communication"},
                        "vp":{"name":"Oh Tae-yang","dept":"Economics"},
                        "pillars":[{"icon":"🚀","title":"Momentum","desc":"Keep things moving."}],
                        "initiatives":[{"headline":"Launch a feedback portal","detail":"Within the first month."}]}"""
                )
        )
            .andExpect(status().isBadRequest)
    }

    @Test
    fun `delete returns 204 on success`() {
        mockMvc.perform(delete("/api/teams/team-new-wave"))
            .andExpect(status().isNoContent)
    }

    @Test
    fun `delete returns 404 for unknown team`() {
        `when`(teamService.deleteTeam("nope")).thenThrow(TeamNotFoundException("nope"))

        mockMvc.perform(delete("/api/teams/nope"))
            .andExpect(status().isNotFound)
    }
}
