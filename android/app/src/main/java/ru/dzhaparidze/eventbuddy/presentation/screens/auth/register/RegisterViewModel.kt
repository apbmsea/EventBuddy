package ru.dzhaparidze.eventbuddy.presentation.screens.auth.register

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import kotlinx.coroutines.flow.*
import kotlinx.coroutines.launch
import ru.dzhaparidze.eventbuddy.data.repositories.AuthRepository
import ru.dzhaparidze.eventbuddy.network.dto.Role

class RegisterViewModel(
    private val authRepository: AuthRepository
) : ViewModel() {
    val registerState = MutableStateFlow(RegisterUiState())

    fun onEmailChange(email: String) {
        registerState.value = registerState.value.copy(email = email)
    }

    fun onPassChange(pass: String) {
        registerState.value = registerState.value.copy(password = pass)
    }

    fun register() {
        viewModelScope.launch {
            with(registerState.value) {
                authRepository.signup(email, password, username, role)
            }
        }
    }

    fun changeRole(role: Role) {
        registerState.value = registerState.value.copy(role = role)
    }
}