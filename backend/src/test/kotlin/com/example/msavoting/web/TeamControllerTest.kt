package com.example.msavoting.web

import com.example.msavoting.dto.CandidateResponse
import com.example.msavoting.dto.TeamSummaryResponse
import com.example.msavoting.exception.TeamNotFoundException
import com.example.msavoting.service.TeamService
import org.junit.jupiter.api.Test
import org.mockito.Mockito.`when`
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest
import org.springframework.test.context.bean.override.mockito.MockitoBean
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get
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
}
