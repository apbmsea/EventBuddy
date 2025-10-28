package ru.dzhaparidze.eventbuddy

import android.app.Application
import org.koin.android.ext.koin.androidContext
import org.koin.core.context.GlobalContext.startKoin
import ru.dzhaparidze.eventbuddy.di.appModule

class EventBuddyApplication : Application() {

    override fun onCreate() {
        super.onCreate()

        startKoin {
            androidContext(this@EventBuddyApplication)
            modules(appModule)
        }
    }
}