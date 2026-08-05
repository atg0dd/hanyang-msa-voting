package com.example.msavoting.domain

import jakarta.persistence.*

@Entity
@Table(name = "initiatives")
class Initiative(
        @Id @GeneratedValue(strategy = GenerationType.IDENTITY) var id: Long? = null,
        @ManyToOne(fetch = FetchType.LAZY)
        @JoinColumn(name = "team_id", nullable = false)
        var team: Team,
        @Column(nullable = false, length = 300) var headline: String,
        @Column(nullable = false, columnDefinition = "text") var detail: String,
        @Column(name = "sort_order", nullable = false) var sortOrder: Int,
)
