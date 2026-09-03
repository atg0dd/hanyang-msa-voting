package com.example.msavoting.domain

import jakarta.persistence.*
import java.time.Instant

@Entity
@Table(name = "verification_codes")
class VerificationCode(
        @Id @GeneratedValue(strategy = GenerationType.IDENTITY) var id: Long? = null,
        @Column(name = "email_hash", nullable = false, unique = true, length = 64) var emailHash: String,
        @ManyToOne(fetch = FetchType.LAZY)
        @JoinColumn(name = "team_id", nullable = false)
        var team: Team,
        @Column(name = "code_hash", nullable = false, length = 64) var codeHash: String,
        @Column(nullable = false) var attempts: Int = 0,
        @Column(name = "expires_at", nullable = false) var expiresAt: Instant,
        @Column(name = "last_sent_at", nullable = false) var lastSentAt: Instant,
        @Column(name = "created_at", nullable = false) var createdAt: Instant = Instant.now(),
)
