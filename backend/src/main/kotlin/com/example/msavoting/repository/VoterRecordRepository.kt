package com.example.msavoting.repository

import com.example.msavoting.domain.VoterRecord
import org.springframework.data.jpa.repository.JpaRepository

interface VoterRecordRepository : JpaRepository<VoterRecord, Long> {
    fun existsByEmailHash(emailHash: String): Boolean
}
