package ru.dzhaparidze.eventbuddy.data.repositories

import android.util.Log
import ru.dzhaparidze.eventbuddy.data.datastore.TokenDataStore
import ru.dzhaparidze.eventbuddy.network.dto.LoginRequest
import ru.dzhaparidze.eventbuddy.network.dto.Role
import ru.dzhaparidze.eventbuddy.network.dto.SignUpRequest
import ru.dzhaparidze.eventbuddy.network.services.AuthApiService

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
            Log.e("AuthRepository", "Login failed: ${e.message}", e)
            false
        }
    }

    suspend fun signup(email: String, password: String, role: Role): String? {
        return try {
            val request = SignUpRequest(email, password, role.name)
            val response = authApiService.register(request)
            response.email
        } catch (e: Exception) {
            Log.e("AuthRepository", "Signup failed: ${e.message}", e)
            null
        }
    }

    suspend fun refreshToken(): Boolean {
        return try {
            false
        } catch (e: Exception) {
            Log.e("AuthRepository", "Token refresh failed: ${e.message}", e)
            false
        }
    }

    suspend fun logout(): Boolean {
        return try {
            false
        } catch (e: Exception) {
            Log.e("AuthRepository", "Logout failed: ${e.message}", e)
            false
        }
    }
}