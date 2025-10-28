package ru.dzhaparidze.eventbuddy.presentation.screens.auth.register

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
import ru.dzhaparidze.eventbuddy.network.dto.Role

@Composable
fun RegisterScreen() {
    val registerViewModel: RegisterViewModel = koinViewModel()
    val registerUiState = registerViewModel.registerState.collectAsState()

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
                        value = registerUiState.value.email,
                        onValueChange = { registerViewModel.onEmailChange(it) },
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
                        value = registerUiState.value.password,
                        onValueChange = { registerViewModel.onPassChange(it) },
                        shape = RoundedCornerShape(8.dp),
                        colors = OutlinedTextFieldDefaults.colors(
                            unfocusedBorderColor = Color.Gray,
                            focusedBorderColor = Color.Blue
                        ),
                        visualTransformation = PasswordVisualTransformation()
                    )
                }

                Spacer(Modifier.height(16.dp))

                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.spacedBy(16.dp)
                ) {
                    Button(
                        onClick = { registerViewModel.changeRole(Role.INDIVIDUAL) },
                        modifier = Modifier.weight(1f),
                        shape = RoundedCornerShape(6.dp),
                        colors = ButtonDefaults.buttonColors(
                            containerColor = if (registerUiState.value.role == Role.INDIVIDUAL) {
                                Color(0xFF2196F3)
                            } else {
                                Color.LightGray
                            },
                            contentColor = if (registerUiState.value.role == Role.INDIVIDUAL) {
                                Color.White
                            } else {
                                Color.Black
                            }
                        )
                    ) {
                        Text("Для себя")
                    }

                    Button(
                        onClick = { registerViewModel.changeRole(Role.COMPANY) },
                        modifier = Modifier.weight(1f),
                        shape = RoundedCornerShape(6.dp),
                        colors = ButtonDefaults.buttonColors(
                            containerColor = if (registerUiState.value.role == Role.COMPANY) {
                                Color(0xFF2196F3)
                            } else {
                                Color.LightGray
                            },
                            contentColor = if (registerUiState.value.role == Role.COMPANY) {
                                Color.White
                            } else {
                                Color.Black
                            }
                        )
                    ) {
                        Text("Для компании")
                    }
                }

                Button(
                    onClick = { registerViewModel.register() },
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
                    text = "Уже зарегистрированы? Войти", textAlign = TextAlign.Center
                )
            }
        }
    }
}

@Preview(showBackground = true)
@Composable
fun RegisterScreenPreview() {
    RegisterScreen()
}