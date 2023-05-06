package alexman.hrms.feature.home

import alexman.hrms.core.data.repository.fake.FakeCleaningStaffRepository
import alexman.hrms.core.designsystem.PreviewLight
import alexman.hrms.core.designsystem.component.ButtonWithIcon
import alexman.hrms.core.designsystem.component.HousekeepingTopAppBar
import alexman.hrms.core.designsystem.component.LargeDisplayText
import alexman.hrms.core.designsystem.theme.HousekeepingTheme
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.material3.Surface
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp

@PreviewLight
@Composable
fun HomeScreenPreview() {
    HousekeepingTheme {
        HomeScreen(
            HomeViewModel(2, FakeCleaningStaffRepository()),
            onNavigateToLogIn = { },
        )
    }
}

@Composable
fun HomeScreen(
    homeViewModel: HomeViewModel,
    onNavigateToLogIn: () -> Unit
) {
    val uiState = homeViewModel.uiState

    HomeScreenContent(uiState, onNavigateToLogIn)
}

@Composable
private fun HomeScreenContent(
    uiState: HomeUiState,
    onNavigateToLogIn: () -> Unit,
) {
    Surface {
        Column(
            modifier = Modifier
                .fillMaxSize()
        ) {
            HousekeepingTopAppBar(
                text = uiState.staffId.toString(),
                actions = { LogoutButton (onClick = onNavigateToLogIn) }
            )
            Column(
                horizontalAlignment = Alignment.CenterHorizontally,
                verticalArrangement = Arrangement.spacedBy(8.dp, Alignment.CenterVertically),
                modifier = Modifier
                    .fillMaxSize()
            ) {
                LargeDisplayText("Staff ID: ${uiState.staffId}")
                LargeDisplayText("Name: ${uiState.staffName}")
            }
        }
    }
}

@Composable
private fun LogoutButton(onClick: () -> Unit) {
    ButtonWithIcon(
        id = R.drawable.ic_menu_logout,
        alt = "logout",
        onClick = onClick,
    )
}
