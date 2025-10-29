package ru.dzhaparidze.eventbuddy.presentation.screens.auth.login

import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.*
import androidx.compose.ui.graphics.*
import androidx.compose.ui.text.font.*
import androidx.compose.ui.text.input.*
import androidx.compose.ui.text.style.*
import androidx.compose.ui.tooling.preview.*
import androidx.compose.ui.unit.*
import org.koin.androidx.compose.koinViewModel

@Composable
fun LoginScreen() {
    val loginViewModel: LoginViewModel = koinViewModel()
    val loginUiState = loginViewModel.loginState.collectAsState()

    LoginScreenContent(
        email = loginUiState.value.email,
        password = loginUiState.value.password,
        onEmailChange = { loginViewModel.onEmailChange(it) },
        onPassChange = { loginViewModel.onPassChange(it) },
        onLogin = { loginViewModel.login() }
    )
}

@Composable
fun LoginScreenContent(
    email: String,
    password: String,
    onEmailChange: (String) -> Unit,
    onPassChange: (String) -> Unit,
    onLogin: () -> Unit
) {
    Column(
        modifier = Modifier.fillMaxSize(),
        verticalArrangement = Arrangement.Center,
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        Column {
            Column(
                modifier = Modifier.padding(40.dp),
                horizontalAlignment = Alignment.CenterHorizontally
            ) {
                Text(
                    text = "Здесь начинается ваша\n" + "продуктивность",
                    style = MaterialTheme.typography.titleLarge,
                    fontWeight = FontWeight.Bold,
                    textAlign = TextAlign.Center
                )

                Spacer(Modifier.height(16.dp))

                Column {
                    Text(
                        text = "Почта",
                        color = Color.Gray,
                        modifier = Modifier.padding(bottom = 12.dp)
                    )

                    OutlinedTextField(
                        modifier = Modifier
                            .padding(0.dp)
                            .fillMaxWidth(),
                        value = email,
                        onValueChange = onEmailChange,
                        shape = RoundedCornerShape(8.dp),
                        colors = OutlinedTextFieldDefaults.colors(
                            unfocusedBorderColor = Color.Gray,
                            focusedBorderColor = Color.Blue
                        ),
                    )

                    Spacer(Modifier.height(16.dp))

                    Text(
                        text = "Пароль",
                        color = Color.Gray,
                        modifier = Modifier.padding(bottom = 12.dp)
                    )

                    OutlinedTextField(
                        modifier = Modifier
                            .padding(0.dp)
                            .fillMaxWidth(),
                        value = password,
                        onValueChange = onPassChange,
                        shape = RoundedCornerShape(8.dp),
                        colors = OutlinedTextFieldDefaults.colors(
                            unfocusedBorderColor = Color.Gray,
                            focusedBorderColor = Color.Blue
                        ),
                        visualTransformation = PasswordVisualTransformation()
                    )
                }

                Spacer(Modifier.height(16.dp))

                Button(
                    onClick = onLogin,
                    modifier = Modifier.fillMaxWidth(),
                    shape = RoundedCornerShape(6.dp),
                    colors = ButtonDefaults.buttonColors(
                        containerColor = Color.LightGray,
                        contentColor = Color.Black
                    )
                ) {
                    Text("Продолжить")
                }

                Spacer(Modifier.height(48.dp))

                Text(
                    text = "Продолжая, вы даете согласие на\n" + "сбор, обработку и хранение персональных данных",
                    textAlign = TextAlign.Center
                )

                Spacer(Modifier.height(16.dp))

                Text(
                    text = "Нет аккаунта? Зарегестрироваться", textAlign = TextAlign.Center
                )
            }
        }
    }
}

@Preview(showBackground = true)
@Composable
fun LoginScreenPreview() {
    MaterialTheme {
        LoginScreenContent(
            email = "test@example.com",
            password = "password123",
            onEmailChange = {},
            onPassChange = {},
            onLogin = {}
        )
    }
}