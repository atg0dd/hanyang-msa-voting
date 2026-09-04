package com.example.msavoting.web

import com.example.msavoting.dto.CreateTeamRequest
import com.example.msavoting.dto.TeamDetailResponse
import com.example.msavoting.dto.TeamSummaryResponse
import com.example.msavoting.service.TeamService
import org.springframework.http.CacheControl
import org.springframework.http.MediaType
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.DeleteMapping
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import java.util.concurrent.TimeUnit

@RestController
@RequestMapping("/api/teams")
class TeamController(private val teamService: TeamService) {

    @GetMapping
    fun list(): List<TeamSummaryResponse> = teamService.listSummaries()

    @GetMapping("/{slug}")
    fun getBySlug(@PathVariable slug: String): TeamDetailResponse = teamService.getDetail(slug)

    @PostMapping
    fun create(@RequestBody request: CreateTeamRequest): TeamDetailResponse = teamService.createTeam(request)

    @DeleteMapping("/{slug}")
    fun delete(@PathVariable slug: String): ResponseEntity<Void> {
        teamService.deleteTeam(slug)
        return ResponseEntity.noContent().build()
    }

    @GetMapping("/{slug}/photo/{role}")
    fun getPhoto(@PathVariable slug: String, @PathVariable role: String): ResponseEntity<ByteArray> {
        val (bytes, contentType) = teamService.getPhoto(slug, role)
        return ResponseEntity.ok()
            .contentType(MediaType.parseMediaType(contentType))
            .cacheControl(CacheControl.maxAge(1, TimeUnit.HOURS))
            .body(bytes)
    }
}
