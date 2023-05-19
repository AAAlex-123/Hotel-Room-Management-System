package alexman.hrms.feature.home

import alexman.hrms.core.designsystem.PreviewLight
import alexman.hrms.core.designsystem.component.ButtonWithIcon
import alexman.hrms.core.designsystem.component.HousekeepingBottomBar
import alexman.hrms.core.designsystem.component.HousekeepingTopAppBar
import alexman.hrms.core.designsystem.component.LargeDisplayText
import alexman.hrms.core.designsystem.component.OrdersBottomBarItem
import alexman.hrms.core.designsystem.component.RoomsBottomBarItem
import alexman.hrms.core.designsystem.theme.HousekeepingTheme
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.Scaffold
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp

@PreviewLight
@Composable
private fun HomeScreenContentPreview() {
    HousekeepingTheme {
        HomeScreenContent(
            uiState = HomeUiState(-1, "Jane Doe"),
            onNavigateToLogin = { },
            onNavigateToRooms = { },
            onNavigateToOrders = { },
        )
    }
}

@Composable
internal fun HomeScreen(
    homeViewModel: HomeViewModel,
    onNavigateToLogin: () -> Unit,
    onNavigateToRooms: (Int) -> Unit,
    onNavigateToOrders: (Int) -> Unit,
) {
    val uiState = homeViewModel.uiState

    HomeScreenContent(
        uiState = uiState,
        onNavigateToLogin = onNavigateToLogin,
        onNavigateToRooms = onNavigateToRooms,
        onNavigateToOrders = onNavigateToOrders,
    )
}

@Composable
private fun HomeScreenContent(
    uiState: HomeUiState,
    onNavigateToLogin: () -> Unit,
    onNavigateToRooms: (Int) -> Unit,
    onNavigateToOrders: (Int) -> Unit,
) {
    Scaffold(
        topBar = {
            HousekeepingTopAppBar(
                text = uiState.staffId.toString(),
                actions = { LogoutButton(onClick = onNavigateToLogin) },
            )
        },
        bottomBar = {
            HousekeepingBottomBar {
                RoomsBottomBarItem(
                    onClick = { onNavigateToRooms(uiState.staffId) },
                    selected = false,
                )
                OrdersBottomBarItem(
                    onClick = { onNavigateToOrders(uiState.staffId) },
                    selected = false,
                )
            }
        }
    ) { paddingValues ->
        Box(
            modifier = Modifier
                .fillMaxSize()
                .padding(paddingValues),
        ) {
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
