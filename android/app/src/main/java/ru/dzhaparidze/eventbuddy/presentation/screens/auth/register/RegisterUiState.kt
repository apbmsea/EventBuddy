package ru.dzhaparidze.eventbuddy.presentation.screens.auth.register

import ru.dzhaparidze.eventbuddy.network.dto.Role

data class RegisterUiState(
    val email: String = "",
    val password: String = "",
    val username: String = email,
    val role: Role = Role.INDIVIDUAL,
    val isLoading: Boolean = false,
    val errorMessage: String? = null,
    val isRegisterSuccessful: Boolean = false
)
