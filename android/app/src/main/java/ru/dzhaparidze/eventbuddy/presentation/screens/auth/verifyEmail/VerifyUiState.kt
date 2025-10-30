package ru.dzhaparidze.eventbuddy.presentation.screens.auth.verifyEmail

data class VerifyUiState(
    val code: String = "",
    val isLoading: Boolean = false,
    val errorMessage: String? = null,
    val isVerifySuccessful: Boolean = false
)
