package com.example.msavoting.domain

import jakarta.persistence.*
import java.time.Instant

@Entity
@Table(name = "teams")
class Team(
        @Id @GeneratedValue(strategy = GenerationType.IDENTITY) var id: Long? = null,
        @Column(nullable = false, unique = true, length = 64) var slug: String,
        @Column(nullable = false, length = 200) var name: String,
        @Column(nullable = false, length = 500) var slogan: String,
        @Column(nullable = false, length = 20) var accent: String,
        @Embedded
        @AttributeOverrides(
                AttributeOverride(
                        name = "name",
                        column = Column(name = "president_name", nullable = false)
                ),
                AttributeOverride(
                        name = "dept",
                        column = Column(name = "president_dept", nullable = false)
                ),
                AttributeOverride(
                        name = "initials",
                        column = Column(name = "president_initials", nullable = false)
                ),
        )
        var president: CandidateInfo,
        @Embedded
        @AttributeOverrides(
                AttributeOverride(
                        name = "name",
                        column = Column(name = "vp_name", nullable = false)
                ),
                AttributeOverride(
                        name = "dept",
                        column = Column(name = "vp_dept", nullable = false)
                ),
                AttributeOverride(
                        name = "initials",
                        column = Column(name = "vp_initials", nullable = false)
                ),
        )
        var vp: CandidateInfo,
        @Column(nullable = false, columnDefinition = "text") var vision: String,
        @OneToMany(mappedBy = "team", cascade = [CascadeType.ALL], orphanRemoval = true)
        @OrderBy("sortOrder ASC")
        var pillars: MutableList<Pillar> = mutableListOf(),
        @OneToMany(mappedBy = "team", cascade = [CascadeType.ALL], orphanRemoval = true)
        @OrderBy("sortOrder ASC")
        var initiatives: MutableList<Initiative> = mutableListOf(),
        @Column(name = "created_at", nullable = false) var createdAt: Instant = Instant.now(),
        @Column(name = "updated_at", nullable = false) var updatedAt: Instant = Instant.now(),
)
