package com.example.msavoting.domain

import jakarta.persistence.*
import java.time.Instant

@Entity
@Table(name = "voter_records")
class VoterRecord(
        @Id @GeneratedValue(strategy = GenerationType.IDENTITY) var id: Long? = null,
        @Column(name = "email_hash", nullable = false, unique = true, length = 64) var emailHash: String,
        @Column(name = "voted_at", nullable = false) var votedAt: Instant = Instant.now(),
)
