package com.example.msavoting.domain

import jakarta.persistence.Column
import jakarta.persistence.Embeddable

@Embeddable
class CandidateInfo(
        @Column(nullable = false) var name: String,
        @Column(nullable = false) var dept: String,
        @Column(nullable = false) var initials: String,
        @Column(columnDefinition = "bytea") var photo: ByteArray? = null,
        @Column(length = 50) var photoContentType: String? = null,
        @Column(columnDefinition = "text") var bio: String? = null,
        @Column(columnDefinition = "text") var achievements: String? = null,
        @Column(nullable = false) var photoPositionX: Int = 50,
        @Column(nullable = false) var photoPositionY: Int = 50,
)
