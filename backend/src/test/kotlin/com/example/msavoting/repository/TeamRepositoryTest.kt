package com.example.msavoting.repository

import com.example.msavoting.domain.CandidateInfo
import com.example.msavoting.domain.Team
import org.assertj.core.api.Assertions.assertThat
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.data.jpa.test.autoconfigure.DataJpaTest
import org.springframework.boot.jdbc.test.autoconfigure.AutoConfigureTestDatabase
import org.springframework.test.context.ActiveProfiles

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@ActiveProfiles("local")
class TeamRepositoryTest(@Autowired val teamRepository: TeamRepository) {

    private fun candidate(name: String, withPhoto: Boolean) = CandidateInfo(
        name = name,
        dept = "Computer Science",
        initials = "XX",
        photo = if (withPhoto) ByteArray(1024) { 1 } else null,
        photoContentType = if (withPhoto) "image/png" else null,
    )

    @Test
    fun `findAllCards returns blob-free projection with photo presence flags`() {
        teamRepository.save(
            Team(
                slug = "cards-test-${System.nanoTime()}",
                name = "Cards Test",
                slogan = "s",
                accent = "blue",
                president = candidate("Pres", withPhoto = true),
                vp = candidate("Veep", withPhoto = false),
                vision = "v",
            )
        )

        val card = teamRepository.findAllCards().first { it.name == "Cards Test" }

        assertThat(card.presidentName).isEqualTo("Pres")
        assertThat(card.presidentHasPhoto).isTrue()
        assertThat(card.vpHasPhoto).isFalse()
    }
}
