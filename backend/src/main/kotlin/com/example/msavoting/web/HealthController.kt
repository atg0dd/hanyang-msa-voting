package com.example.msavoting.web

import org.springframework.jdbc.core.JdbcTemplate
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

/**
 * Cheap liveness probe for the external uptime pinger. Runs `SELECT 1` so it
 * also keeps Neon's compute from suspending (5-minute idle window) without
 * pulling any real data over the connection.
 */
@RestController
@RequestMapping("/api/health")
class HealthController(private val jdbcTemplate: JdbcTemplate) {

    @GetMapping
    fun health(): Map<String, String> {
        jdbcTemplate.queryForObject("SELECT 1", Int::class.java)
        return mapOf("status" to "ok")
    }
}
