package com.example.msavoting.domain

import jakarta.persistence.*

@Entity
@Table(name = "pillars")
class Pillar(
        @Id @GeneratedValue(strategy = GenerationType.IDENTITY) var id: Long? = null,
        @ManyToOne(fetch = FetchType.LAZY)
        @JoinColumn(name = "team_id", nullable = false)
        var team: Team,
        @Column(nullable = false, length = 16) var icon: String,
        @Column(nullable = false, length = 200) var title: String,
        @Column(nullable = false, columnDefinition = "text") var description: String,
        @Column(name = "sort_order", nullable = false) var sortOrder: Int,
)
