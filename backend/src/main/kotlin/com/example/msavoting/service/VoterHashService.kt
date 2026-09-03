package com.example.msavoting.service

import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Component
import java.security.MessageDigest

@Component
class VoterHashService(
    @Value("\${app.election.voter-hash-pepper}") private val pepper: String,
) {
    fun hash(value: String): String {
        val digest = MessageDigest.getInstance("SHA-256")
        val bytes = digest.digest((value.trim().lowercase() + pepper).toByteArray(Charsets.UTF_8))
        return bytes.joinToString("") { "%02x".format(it) }
    }
}
