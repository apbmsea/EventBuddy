package ru.dzhaparidze.eventbuddy

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.runtime.*
import androidx.compose.ui.tooling.preview.*
import ru.dzhaparidze.eventbuddy.presentation.screens.MainScreen
import ru.dzhaparidze.eventbuddy.presentation.screens.auth.verifyEmail.VerifyScreen

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContent {
            VerifyScreen()
        }
    }
}

@Preview(showBackground = true)
@Composable
fun MainPreview() {
    MainScreen()
}