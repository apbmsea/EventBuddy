package ru.dzhaparidze.eventbuddy.di

import org.koin.core.module.dsl.viewModel
import org.koin.dsl.module
import ru.dzhaparidze.eventbuddy.network.client.HttpClientFactory
import ru.dzhaparidze.eventbuddy.network.services.AuthApiService
import ru.dzhaparidze.eventbuddy.presentation.screens.auth.register.RegisterViewModel

val appModule = module {
    single { HttpClientFactory.create() }
    single { AuthApiService(client = get()) }
    viewModel { RegisterViewModel(authApiService = get()) }
}