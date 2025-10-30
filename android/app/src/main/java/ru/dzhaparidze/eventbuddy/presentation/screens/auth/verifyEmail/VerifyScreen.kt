package ru.dzhaparidze.eventbuddy.presentation.screens.auth.verifyEmail

import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.*
import androidx.compose.ui.graphics.*
import androidx.compose.ui.text.font.*
import androidx.compose.ui.text.style.*
import androidx.compose.ui.tooling.preview.*
import androidx.compose.ui.unit.*
import kotlinx.coroutines.delay
import org.koin.androidx.compose.koinViewModel
import ru.dzhaparidze.eventbuddy.ui.OtpTextField

@Composable
fun VerifyScreen(email: String = "example@mail.com") {
    val verifyViewModel: VerifyViewModel = koinViewModel()
    val verifyUiState = verifyViewModel.verifyState.collectAsState()

    VerifyScreenContent(
        email = email,
        code = verifyUiState.value.code,
        isLoading = verifyUiState.value.isLoading,
        onCodeChange = { code, isComplete ->
            verifyViewModel.onCodeChange(code)
            if (isComplete) {
                verifyViewModel.verify()
            }
        },
        onVerify = { verifyViewModel.verify() }
    )
}

@Composable
fun VerifyScreenContent(
    email: String,
    code: String,
    isLoading: Boolean,
    onCodeChange: (String, Boolean) -> Unit,
    onVerify: () -> Unit,
) {
    var timeLeft by remember { mutableIntStateOf(5) }
    var isTimerRunning by remember { mutableStateOf(true) }

    LaunchedEffect(isTimerRunning) {
        if (isTimerRunning) {
            while (timeLeft > 0) {
                delay(1000)
                timeLeft--
            }
            isTimerRunning = false
        }
    }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(40.dp),
        verticalArrangement = Arrangement.Center,
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        Text(
            text = "Подтверждение почты",
            style = MaterialTheme.typography.headlineMedium,
            fontWeight = FontWeight.Bold,
            textAlign = TextAlign.Center
        )

        Spacer(Modifier.height(16.dp))

        Text(
            text = "Отправили код на адрес",
            style = MaterialTheme.typography.bodyLarge,
            color = Color.Gray,
            textAlign = TextAlign.Center
        )

        Spacer(Modifier.height(8.dp))

        Text(
            text = email,
            color = Color(0xFF2196F3),
            style = MaterialTheme.typography.bodyLarge,
            fontWeight = FontWeight.SemiBold,
            textAlign = TextAlign.Center
        )

        Spacer(Modifier.height(32.dp))

        OtpTextField(
            modifier = Modifier.fillMaxWidth(),
            otpText = code,
            otpCount = 6,
            onOtpTextChange = onCodeChange
        )

        Spacer(Modifier.height(24.dp))

        Button(
            onClick = onVerify,
            modifier = Modifier.fillMaxWidth(),
            shape = RoundedCornerShape(8.dp),
            enabled = code.length == 6 && !isLoading,
            colors = ButtonDefaults.buttonColors(
                containerColor = Color(0xFF2196F3),
                contentColor = Color.White,
                disabledContainerColor = Color.LightGray,
                disabledContentColor = Color.Gray
            )
        ) {
            Text(
                text = "Подтвердить",
                style = MaterialTheme.typography.bodyLarge
            )
        }

        Spacer(Modifier.height(16.dp))

        // todo: add resend code
        TextButton(
            onClick = {
                timeLeft = 60
                isTimerRunning = true
            },
            enabled = !isTimerRunning && timeLeft == 0
        ) {
            Text(
                text = if (isTimerRunning || timeLeft > 0) {
                    "Отправить код повторно через $timeLeft сек"
                } else {
                    "Отправить код повторно"
                },
                color = if (isTimerRunning || timeLeft > 0) {
                    Color.Gray
                } else {
                    Color(0xFF2196F3)
                }
            )
        }

        Spacer(Modifier.height(48.dp))

        Text(
            text = "Продолжая, вы даете согласие на\nсбор, обработку и хранение персональных данных",
            style = MaterialTheme.typography.bodySmall,
            color = Color.Gray,
            textAlign = TextAlign.Center
        )
    }
}

@Preview(showBackground = true)
@Composable
fun VerifyScreenPreview() {
    MaterialTheme {
        VerifyScreenContent(
            email = "temp@example.com",
            code = "1234",
            isLoading = false,
            onCodeChange = { _, _ -> },
            onVerify = {}
        )
    }
}