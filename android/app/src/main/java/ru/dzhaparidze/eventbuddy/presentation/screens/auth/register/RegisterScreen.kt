package ru.dzhaparidze.eventbuddy.presentation.screens.auth.register

import androidx.compose.foundation.*
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.text.input.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.*
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.tooling.preview.*
import androidx.compose.ui.unit.*

@Composable
fun RegisterScreen() {
    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(Color(0xFFFFFFFF)),
        verticalArrangement = Arrangement.Center,
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        Column(modifier = Modifier.background(Color(0xFFEE5151))) {
            Column(
                horizontalAlignment = Alignment.CenterHorizontally
            ) {
                Text(
                    text = "Здесь начинается ваша\n" + "продуктивность",
                    textAlign = TextAlign.Center
                )
                
                Spacer(modifier = Modifier.height(16.dp))

                TextField(
                    state = rememberTextFieldState(initialText = "Обязательное поле"),
                    label = {
                        Text(
                            text = "Почта",
                        )
                    }
                )

                Spacer(modifier = Modifier.height(16.dp))

                TextField(
                    state = rememberTextFieldState(initialText = "Обязательное поле"),
                    label = {
                        Text(
                            text = "Пароль",
                        )
                    }
                )

                Row(
                    verticalAlignment = Alignment.CenterVertically,
                    horizontalArrangement = Arrangement.End
                ) {
                    Button(onClick = {}) {
                        Text("Для себя")
                    }

                    Button(onClick = {}) {
                        Text("Для компании")
                    }
                }

                Button(onClick = {}) {
                    Text("Продолжить")
                }

                Spacer(modifier = Modifier.height(16.dp))

                Text(
                    text = "Продолжая, вы даете согласие на\n" + "сбор, обработку и хранение персональных данных",
                    textAlign = TextAlign.Center
                )

                Spacer(modifier = Modifier.height(16.dp))

                Text(
                    text = "Уже зарегистрированы? Войти",
                    textAlign = TextAlign.Center
                )
            }
        }

    }
}

@Preview
@Composable
fun RegisterScreenPreview() {
    RegisterScreen()
}