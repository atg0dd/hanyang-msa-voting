package com.example.msavoting.domain

import jakarta.persistence.*
import java.time.Instant

@Entity
@Table(name = "votes")
class Vote(
        @Id @GeneratedValue(strategy = GenerationType.IDENTITY) var id: Long? = null,
        @ManyToOne(fetch = FetchType.LAZY)
        @JoinColumn(name = "team_id", nullable = false)
        var team: Team,
        @Column(name = "cast_at", nullable = false) var castAt: Instant = Instant.now(),
)
