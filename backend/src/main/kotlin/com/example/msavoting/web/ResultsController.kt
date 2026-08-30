package com.example.msavoting.web

import com.example.msavoting.dto.ResultsResponse
import com.example.msavoting.service.ResultsService
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/results")
class ResultsController(private val resultsService: ResultsService) {

    @GetMapping
    fun getResults(): ResultsResponse = resultsService.getResults()
}
