package ru.dzhaparidze.eventbuddy.data.model

data class User(
    val id: Long,
    val uuid: String,
    val email: String,
    val username: String,
    val role: String
)