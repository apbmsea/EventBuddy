package ru.dzhaparidze.eventbuddy.presentation.screens.auth.register

import androidx.lifecycle.ViewModel
import kotlinx.coroutines.flow.*
import ru.dzhaparidze.eventbuddy.network.services.AuthApiService

class RegisterViewModel(
    private val authApiService: AuthApiService
) : ViewModel() {
    val registerState = MutableStateFlow(RegisterUiState())

    fun onEmailChange(email: String) {
        registerState.value = registerState.value.copy(email = email)
    }

    fun onPassChange(pass: String) {
        registerState.value = registerState.value.copy(password = pass)
    }

    fun register() {

    }

    fun changeRole(role: String) {

    }
}