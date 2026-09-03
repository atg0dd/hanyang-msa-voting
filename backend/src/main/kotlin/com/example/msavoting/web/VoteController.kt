package com.example.msavoting.web

import com.example.msavoting.dto.CastVoteRequest
import com.example.msavoting.dto.RequestCodeRequest
import com.example.msavoting.dto.RequestCodeResponse
import com.example.msavoting.dto.VoteReceiptResponse
import com.example.msavoting.service.VoteService
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/votes")
class VoteController(private val voteService: VoteService) {

    @PostMapping("/request-code")
    fun requestCode(@RequestBody request: RequestCodeRequest): RequestCodeResponse =
        voteService.requestCode(request)

    @PostMapping
    fun castVote(@RequestBody request: CastVoteRequest): VoteReceiptResponse =
        voteService.castVote(request)
}
