package ru.dzhaparidze.eventbuddy.presentation.screens.auth.verifyEmail

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import kotlinx.coroutines.*
import kotlinx.coroutines.flow.*
import ru.dzhaparidze.eventbuddy.data.repositories.AuthRepository
import timber.log.Timber

class VerifyViewModel(
    private val authRepository: AuthRepository
) : ViewModel() {
    val verifyState = MutableStateFlow(VerifyUiState())

    fun onCodeChange(code: String) {
        verifyState.value = verifyState.value.copy(code = code)
    }

    fun verify() {
        if (verifyState.value.code.isEmpty()) {
            Timber.e("Invalid verification code")
            return
        }

        viewModelScope.launch {
            with(verifyState.value) {
                authRepository.verify(code)
            }
        }
    }
}