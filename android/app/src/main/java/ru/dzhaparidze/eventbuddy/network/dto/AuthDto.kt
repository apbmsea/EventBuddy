package ru.dzhaparidze.eventbuddy.network.dto

import kotlinx.serialization.Serializable

@Serializable
data class LoginRequest(
    val email: String,
    val password: String,
)

@Serializable
data class LoginResponse(
    val accessToken: String,
    val refreshToken: String,
    val tokenType: String = "Bearer",
    val expiresIn: Long
)

@Serializable
data class SignUpRequest(
    val email: String,
    val password: String,
    val username: String,
    val role: String
)

@Serializable
data class SignUpResponse(
    val id: String,
//    val id: Long,
//    val uuid: String,
    val email: String,
    val username: String,
    val role: String,
//    val enabled: Boolean
)
