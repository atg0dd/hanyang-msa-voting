package com.example.msavoting.service

import com.example.msavoting.domain.CandidateInfo
import com.example.msavoting.dto.CandidateResponse
import com.example.msavoting.dto.TeamCardProjection

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

fun TeamCardProjection.presidentResponse() = CandidateResponse(
    name = presidentName,
    dept = presidentDept,
    initials = presidentInitials,
    photoUrl = if (presidentHasPhoto) "/teams/$slug/photo/president" else null,
    bio = presidentBio,
    achievements = presidentAchievements,
    photoPositionX = presidentPhotoPositionX,
    photoPositionY = presidentPhotoPositionY,
)

fun TeamCardProjection.vpResponse() = CandidateResponse(
    name = vpName,
    dept = vpDept,
    initials = vpInitials,
    photoUrl = if (vpHasPhoto) "/teams/$slug/photo/vp" else null,
    bio = vpBio,
    achievements = vpAchievements,
    photoPositionX = vpPhotoPositionX,
    photoPositionY = vpPhotoPositionY,
)
