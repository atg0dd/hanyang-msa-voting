package com.example.msavoting.repository

import com.example.msavoting.domain.Vote
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query

interface VoteRepository : JpaRepository<Vote, Long> {
    @Query("SELECT v.team.id AS teamId, COUNT(v) AS voteCount FROM Vote v GROUP BY v.team.id")
    fun countGroupedByTeam(): List<TeamVoteCount>

    fun deleteByTeamId(teamId: Long)
}

interface TeamVoteCount {
    val teamId: Long
    val voteCount: Long
}
