package com.example.msavoting.domain

import jakarta.persistence.Column
import jakarta.persistence.Embeddable

@Embeddable
class CandidateInfo(
        @Column(nullable = false) var name: String,
        @Column(nullable = false) var dept: String,
        @Column(nullable = false) var initials: String,
)
