package com.example.msavoting.web

import com.example.msavoting.dto.CandidateResponse
import com.example.msavoting.dto.ResultsResponse
import com.example.msavoting.dto.TeamResultResponse
import com.example.msavoting.service.ResultsService
import org.junit.jupiter.api.Test
import org.mockito.Mockito.`when`
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest
import org.springframework.test.context.bean.override.mockito.MockitoBean
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.status
import java.math.BigDecimal

@WebMvcTest(ResultsController::class)
class ResultsControllerTest(@Autowired val mockMvc: MockMvc) {

    @MockitoBean
    lateinit var resultsService: ResultsService

    @Test
    fun `getResults returns computed totals as json`() {
        `when`(resultsService.getResults()).thenReturn(
            ResultsResponse(
                totalVotesCast = 118,
                totalEligibleVoters = 160,
                turnoutPercentage = BigDecimal("73.8"),
                leadingTeamId = "digital-future",
                teams = listOf(
                    TeamResultResponse(
                        id = "digital-future",
                        name = "Team Digital Future",
                        accent = "blue",
                        votes = 49,
                        percentage = BigDecimal("41.5"),
                        president = CandidateResponse("Kim Jun-su", "Computer Science", "JS"),
                        vp = CandidateResponse("Choi Soo-yeon", "Political Science & Diplomacy", "CS"),
                    )
                ),
            )
        )

        mockMvc.perform(get("/api/results"))
            .andExpect(status().isOk)
            .andExpect(jsonPath("$.totalVotesCast").value(118))
            .andExpect(jsonPath("$.leadingTeamId").value("digital-future"))
            .andExpect(jsonPath("$.teams[0].percentage").value(41.5))
    }
}
