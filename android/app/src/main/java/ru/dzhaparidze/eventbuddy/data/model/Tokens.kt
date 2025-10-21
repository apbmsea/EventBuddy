package ru.dzhaparidze.eventbuddy.data.model

data class Tokens(
    val accessToken: String,
    val refreshToken: String,
    val tokenType: String = "Bearer",
    val expiresIn: Long?
)