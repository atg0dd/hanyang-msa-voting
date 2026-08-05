package com.example.msavoting.repository

import com.example.msavoting.domain.Team
import org.springframework.data.jpa.repository.JpaRepository

interface TeamRepository : JpaRepository<Team, Long> {
    fun findBySlug(slug: String): Team?
}
