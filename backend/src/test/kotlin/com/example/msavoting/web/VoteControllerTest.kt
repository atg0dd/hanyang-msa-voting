package com.example.msavoting.web

import com.example.msavoting.dto.CastVoteRequest
import com.example.msavoting.dto.RequestCodeRequest
import com.example.msavoting.dto.RequestCodeResponse
import com.example.msavoting.dto.VoteReceiptResponse
import com.example.msavoting.exception.AlreadyVotedException
import com.example.msavoting.exception.CodeExpiredException
import com.example.msavoting.exception.InvalidCodeException
import com.example.msavoting.exception.ResendTooSoonException
import com.example.msavoting.service.VoteService
import org.junit.jupiter.api.Test
import org.mockito.Mockito.`when`
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest
import org.springframework.http.MediaType
import org.springframework.test.context.bean.override.mockito.MockitoBean
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.status
import java.time.Instant

@WebMvcTest(VoteController::class)
class VoteControllerTest(@Autowired val mockMvc: MockMvc) {

    @MockitoBean
    lateinit var voteService: VoteService

    @Test
    fun `requestCode returns 200 on success`() {
        `when`(voteService.requestCode(RequestCodeRequest(email = "test@hanyang.ac.kr", teamId = "digital-future"))).thenReturn(
            RequestCodeResponse(message = "Verification code sent to test@hanyang.ac.kr.", resendAvailableInSeconds = 60)
        )

        mockMvc.perform(
            post("/api/votes/request-code")
                .contentType(MediaType.APPLICATION_JSON)
                .content("""{"email":"test@hanyang.ac.kr","teamId":"digital-future"}""")
        )
            .andExpect(status().isOk)
            .andExpect(jsonPath("$.resendAvailableInSeconds").value(60))
    }

    @Test
    fun `requestCode returns 409 when already voted`() {
        `when`(voteService.requestCode(RequestCodeRequest(email = "test@hanyang.ac.kr", teamId = "digital-future"))).thenThrow(AlreadyVotedException())

        mockMvc.perform(
            post("/api/votes/request-code")
                .contentType(MediaType.APPLICATION_JSON)
                .content("""{"email":"test@hanyang.ac.kr","teamId":"digital-future"}""")
        )
            .andExpect(status().isConflict)
            .andExpect(jsonPath("$.error").value("This student has already voted."))
    }

    @Test
    fun `requestCode returns 429 with retryAfterSeconds when resending too soon`() {
        `when`(voteService.requestCode(RequestCodeRequest(email = "test@hanyang.ac.kr", teamId = "digital-future"))).thenThrow(ResendTooSoonException(42))

        mockMvc.perform(
            post("/api/votes/request-code")
                .contentType(MediaType.APPLICATION_JSON)
                .content("""{"email":"test@hanyang.ac.kr","teamId":"digital-future"}""")
        )
            .andExpect(status().isTooManyRequests)
            .andExpect(jsonPath("$.retryAfterSeconds").value(42))
    }

    @Test
    fun `castVote returns receipt on success`() {
        `when`(voteService.castVote(CastVoteRequest(email = "test@hanyang.ac.kr", code = "123456"))).thenReturn(
            VoteReceiptResponse(
                receiptId = "MSA-A1B2C3",
                teamId = "digital-future",
                teamName = "Team Digital Future",
                castAt = Instant.parse("2026-08-26T09:00:00Z"),
            )
        )

        mockMvc.perform(
            post("/api/votes")
                .contentType(MediaType.APPLICATION_JSON)
                .content("""{"email":"test@hanyang.ac.kr","code":"123456"}""")
        )
            .andExpect(status().isOk)
            .andExpect(jsonPath("$.receiptId").value("MSA-A1B2C3"))
            .andExpect(jsonPath("$.teamName").value("Team Digital Future"))
    }

    @Test
    fun `castVote returns 400 for wrong code`() {
        `when`(voteService.castVote(CastVoteRequest(email = "test@hanyang.ac.kr", code = "000000"))).thenThrow(InvalidCodeException())

        mockMvc.perform(
            post("/api/votes")
                .contentType(MediaType.APPLICATION_JSON)
                .content("""{"email":"test@hanyang.ac.kr","code":"000000"}""")
        )
            .andExpect(status().isBadRequest)
            .andExpect(jsonPath("$.error").value("The verification code is incorrect."))
    }

    @Test
    fun `castVote returns 400 for expired code`() {
        `when`(voteService.castVote(CastVoteRequest(email = "test@hanyang.ac.kr", code = "123456"))).thenThrow(CodeExpiredException())

        mockMvc.perform(
            post("/api/votes")
                .contentType(MediaType.APPLICATION_JSON)
                .content("""{"email":"test@hanyang.ac.kr","code":"123456"}""")
        )
            .andExpect(status().isBadRequest)
            .andExpect(jsonPath("$.error").value("The verification code has expired."))
    }
}
