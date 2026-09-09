package com.example.msavoting.dto

/**
 * Flat, blob-free view of a team for list and results endpoints.
 *
 * Loading full [com.example.msavoting.domain.Team] entities drags the
 * `president_photo` / `vp_photo` bytea columns (up to 2MB each) out of the
 * database on every call, even though responses only ever expose a photo URL.
 * This projection selects the scalar columns only; `*HasPhoto` is computed
 * with an `IS NOT NULL` check so the bytes never leave Postgres.
 */
data class TeamCardProjection(
    val id: Long,
    val slug: String,
    val name: String,
    val slogan: String,
    val accent: String,
    val presidentName: String,
    val presidentDept: String,
    val presidentInitials: String,
    val presidentBio: String?,
    val presidentAchievements: String?,
    val presidentPhotoPositionX: Int,
    val presidentPhotoPositionY: Int,
    val presidentHasPhoto: Boolean,
    val vpName: String,
    val vpDept: String,
    val vpInitials: String,
    val vpBio: String?,
    val vpAchievements: String?,
    val vpPhotoPositionX: Int,
    val vpPhotoPositionY: Int,
    val vpHasPhoto: Boolean,
)
