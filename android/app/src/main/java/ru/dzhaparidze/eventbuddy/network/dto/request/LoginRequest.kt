package ru.dzhaparidze.eventbuddy.network.dto.request

import ru.dzhaparidze.eventbuddy.network.dto.AccountType

data class LoginRequest(
    val email: String,
    val password: String,
    val accountType: AccountType
)