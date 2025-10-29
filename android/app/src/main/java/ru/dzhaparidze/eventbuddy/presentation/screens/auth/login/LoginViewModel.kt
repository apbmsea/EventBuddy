package ru.dzhaparidze.eventbuddy.presentation.screens.auth.login

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import kotlinx.coroutines.*
import kotlinx.coroutines.flow.*
import ru.dzhaparidze.eventbuddy.data.repositories.AuthRepository
import timber.log.Timber

class LoginViewModel(
    private val authRepository: AuthRepository
) : ViewModel() {
    val loginState = MutableStateFlow(LoginUiState())

    fun onEmailChange(email: String) {
        loginState.value = loginState.value.copy(email = email)
    }

    fun onPassChange(pass: String) {
        loginState.value = loginState.value.copy(password = pass)
    }

    fun login() {
        if (!loginState.value.email.contains("@")) {
            Timber.e("Email validation failed")
            return
        }

        if (loginState.value.password.length < 6) {
            Timber.e("Password validation failed")
            return
        }

        viewModelScope.launch {
            with(loginState.value) {
                authRepository.login(email, password)
            }
        }
    }
}