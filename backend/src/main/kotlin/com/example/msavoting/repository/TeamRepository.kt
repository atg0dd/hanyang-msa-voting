package com.example.msavoting.repository

import com.example.msavoting.domain.Team
import com.example.msavoting.dto.TeamCardProjection
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query

interface TeamRepository : JpaRepository<Team, Long> {
    fun findBySlug(slug: String): Team?

    /**
     * Blob-free list of teams for the list/results endpoints. Selects scalar
     * columns only; the photo bytea columns are checked for presence but never
     * transferred. See [TeamCardProjection].
     */
    @Query(
        """
        SELECT new com.example.msavoting.dto.TeamCardProjection(
            t.id, t.slug, t.name, t.slogan, t.accent,
            t.president.name, t.president.dept, t.president.initials,
            t.president.bio, t.president.achievements,
            t.president.photoPositionX, t.president.photoPositionY,
            CASE WHEN t.president.photo IS NOT NULL THEN true ELSE false END,
            t.vp.name, t.vp.dept, t.vp.initials,
            t.vp.bio, t.vp.achievements,
            t.vp.photoPositionX, t.vp.photoPositionY,
            CASE WHEN t.vp.photo IS NOT NULL THEN true ELSE false END
        )
        FROM Team t
        """
    )
    fun findAllCards(): List<TeamCardProjection>
}
