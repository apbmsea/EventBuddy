package ru.dzhaparidze.eventbuddy.network.dto

import kotlinx.serialization.Serializable

// Login DTOs
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

// SignUp DTOs
@Serializable
data class SignUpRequest(
    val email: String,
    val password: String,
    val accountType: AccountType
)

@Serializable
data class SignUpResponse(
    val accessToken: String,
    val refreshToken: String,
    val tokenType: String = "Bearer",
    val expiresIn: Long
)
