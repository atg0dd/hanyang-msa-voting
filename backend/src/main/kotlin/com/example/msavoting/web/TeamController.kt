package com.example.msavoting.web

import com.example.msavoting.dto.TeamDetailResponse
import com.example.msavoting.dto.TeamSummaryResponse
import com.example.msavoting.service.TeamService
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/teams")
class TeamController(private val teamService: TeamService) {

    @GetMapping
    fun list(): List<TeamSummaryResponse> = teamService.listSummaries()

    @GetMapping("/{slug}")
    fun getBySlug(@PathVariable slug: String): TeamDetailResponse = teamService.getDetail(slug)
}
