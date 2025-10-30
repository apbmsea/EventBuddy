package ru.dzhaparidze.eventbuddy.data.repositories

import android.util.Log
import ru.dzhaparidze.eventbuddy.data.datastore.TokenDataStore
import ru.dzhaparidze.eventbuddy.network.dto.LoginRequest
import ru.dzhaparidze.eventbuddy.network.dto.Role
import ru.dzhaparidze.eventbuddy.network.dto.SignUpRequest
import ru.dzhaparidze.eventbuddy.network.dto.VerifyRequest
import ru.dzhaparidze.eventbuddy.network.services.AuthApiService
import timber.log.Timber

class AuthRepository(
    private val authApiService: AuthApiService,
    private val tokenDataStore: TokenDataStore
) {
    suspend fun login(email: String, password: String): Boolean {
        return try {
            val request = LoginRequest(email, password)
            val response = authApiService.login(request)

            tokenDataStore.saveTokens(response.accessToken, response.refreshToken)

            true
        } catch (e: Exception) {
            Timber.e(e, "Login failed: ${e.message}")
            false
        }
    }

    suspend fun signup(email: String, password: String, username: String, role: Role): String? {
        return try {
            val request = SignUpRequest(email, password, username, role.name)
            val response = authApiService.register(request)
            response.email
        } catch (e: Exception) {
            Timber.e(e, "Signup failed: ${e.message}")
            null
        }
    }

    suspend fun verify(code: String) {
        try {
            val request = VerifyRequest(code)
            val response = authApiService.verify(request)
        } catch (e: Exception) {
            Timber.e(e, "Signup failed: ${e.message}")
            null
        }
    }

    suspend fun refreshToken(): Boolean {
        return try {
            false
        } catch (e: Exception) {
            Timber.e(e, "Token refresh failed: ${e.message}")
            false
        }
    }

    suspend fun logout(): Boolean {
        return try {
            false
        } catch (e: Exception) {
            Timber.e(e, "Logout failed: ${e.message}")
            false
        }
    }
}