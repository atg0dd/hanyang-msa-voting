package com.example.msavoting.service

import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Component

interface ElectionSettingsProvider {
    fun totalEligibleVoters(): Long
}

@Component
class PropertyElectionSettingsProvider(
    @Value("\${app.election.total-eligible-voters}") private val totalEligibleVoters: Long,
) : ElectionSettingsProvider {
    override fun totalEligibleVoters(): Long = totalEligibleVoters
}
