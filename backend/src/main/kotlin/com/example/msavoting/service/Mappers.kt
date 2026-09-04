package com.example.msavoting.service

import com.example.msavoting.domain.CandidateInfo
import com.example.msavoting.dto.CandidateResponse

fun CandidateInfo.toResponse(slug: String, role: String) = CandidateResponse(
    name = name,
    dept = dept,
    initials = initials,
    photoUrl = if (photo != null) "/teams/$slug/photo/$role" else null,
    bio = bio,
    achievements = achievements,
    photoPositionX = photoPositionX,
    photoPositionY = photoPositionY,
)
