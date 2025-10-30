package ru.dzhaparidze.eventbuddy.di

import android.content.Context
import androidx.datastore.core.DataStore
import androidx.datastore.preferences.core.Preferences
import androidx.datastore.preferences.preferencesDataStore
import org.koin.core.module.dsl.viewModel
import org.koin.dsl.module
import ru.dzhaparidze.eventbuddy.data.datastore.TokenDataStore
import ru.dzhaparidze.eventbuddy.data.repositories.AuthRepository
import ru.dzhaparidze.eventbuddy.network.client.HttpClientFactory
import ru.dzhaparidze.eventbuddy.network.services.AuthApiService
import ru.dzhaparidze.eventbuddy.presentation.screens.auth.login.LoginViewModel
import ru.dzhaparidze.eventbuddy.presentation.screens.auth.register.RegisterViewModel
import ru.dzhaparidze.eventbuddy.presentation.screens.auth.verifyEmail.VerifyViewModel

private val Context.dataStore: DataStore<Preferences> by preferencesDataStore(name = "event_buddy_prefs")

val appModule = module {
    single { get<Context>().dataStore }
    single { HttpClientFactory.create() }
    single { AuthApiService(client = get()) }
    single { TokenDataStore(dataStore = get()) }
    single { AuthRepository(authApiService = get(), tokenDataStore = get()) }
    viewModel { RegisterViewModel(authRepository = get()) }
    viewModel { LoginViewModel(authRepository = get()) }
    viewModel { VerifyViewModel(authRepository = get()) }
}