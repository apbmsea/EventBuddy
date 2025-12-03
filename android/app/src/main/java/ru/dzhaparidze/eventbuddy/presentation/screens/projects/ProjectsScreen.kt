package ru.dzhaparidze.eventbuddy.presentation.screens.projects

import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import org.koin.androidx.compose.koinViewModel

@Composable
fun ProjectsScreen() {
    val viewModel: ProjectsViewModel = koinViewModel()
    val uiState by viewModel.uiState.collectAsState()

    ProjectsScreenContent(uiState = uiState)
}

@Composable
fun ProjectsScreenContent(uiState: ProjectsUiState) {
    Box(
        modifier = Modifier.fillMaxSize(),
        contentAlignment = Alignment.Center
    ) {
        Text(text = "Projects")
    }
}
