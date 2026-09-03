package com.example.msavoting.dto

import java.time.Instant

data class RequestCodeRequest(
    val email: String,
    val teamId: String,
)

data class RequestCodeResponse(
    val message: String,
    val resendAvailableInSeconds: Long,
)

data class CastVoteRequest(
    val email: String,
    val code: String,
)

data class VoteReceiptResponse(
    val receiptId: String,
    val teamId: String,
    val teamName: String,
    val castAt: Instant,
)
