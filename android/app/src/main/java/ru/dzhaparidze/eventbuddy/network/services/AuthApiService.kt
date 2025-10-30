package ru.dzhaparidze.eventbuddy.network.services

import io.ktor.client.HttpClient
import io.ktor.client.call.body
import io.ktor.client.request.post
import io.ktor.client.request.setBody
import io.ktor.http.contentType
import io.ktor.http.ContentType
import ru.dzhaparidze.eventbuddy.network.dto.LoginRequest
import ru.dzhaparidze.eventbuddy.network.dto.LoginResponse
import ru.dzhaparidze.eventbuddy.network.dto.SignUpRequest
import ru.dzhaparidze.eventbuddy.network.dto.SignUpResponse
import ru.dzhaparidze.eventbuddy.network.dto.VerifyRequest
import timber.log.Timber

class AuthApiService(private val client: HttpClient) {
    suspend fun register(request: SignUpRequest): SignUpResponse {
        return try {
            client.post("auth/signup") {
                contentType(ContentType.Application.Json)
                setBody(request)
            }.body<SignUpResponse>()
        } catch (e: Exception) {
            Timber.e("Error: ${e.message}")
            throw e
        }
    }

    suspend fun login(request: LoginRequest): LoginResponse {
        return try {
            client.post("/auth/login") {
                setBody(request)
            }.body<LoginResponse>()
        } catch (e: Exception) {
            Timber.e("Error: ${e.message}")
            throw e
        }
    }

    suspend fun verify(request: VerifyRequest) {
        try {
            client.post("/auth/verify") {
                setBody(request)
            }.body<LoginResponse>()
        } catch (e: Exception) {
            Timber.e("Error: ${e.message}")
            throw e
        }
    }
}