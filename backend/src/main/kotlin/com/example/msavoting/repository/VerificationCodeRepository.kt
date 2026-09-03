package com.example.msavoting.repository

import com.example.msavoting.domain.VerificationCode
import org.springframework.data.jpa.repository.JpaRepository

interface VerificationCodeRepository : JpaRepository<VerificationCode, Long> {
    fun findByEmailHash(emailHash: String): VerificationCode?
    fun deleteByEmailHash(emailHash: String)
}
