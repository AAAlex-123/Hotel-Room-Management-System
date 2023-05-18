package alexman.hrms.feature.home

import alexman.hrms.core.data.repository.CleaningStaffRepositoryImplementation
import alexman.hrms.core.designsystem.PreviewLight
import alexman.hrms.core.designsystem.component.ButtonWithIcon
import alexman.hrms.core.designsystem.component.HousekeepingBottomBar
import alexman.hrms.core.designsystem.component.HousekeepingTopAppBar
import alexman.hrms.core.designsystem.component.LargeDisplayText
import alexman.hrms.core.designsystem.component.OrdersBottomBarItem
import alexman.hrms.core.designsystem.component.RoomsBottomBarItem
import alexman.hrms.core.designsystem.theme.HousekeepingTheme
import alexman.hrms.core.network.fake.FakeNetworkDataSource
import androidx.compose.foundation.layout.Arrangement
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
private fun HomeScreenPreview() {
    HousekeepingTheme {
        HomeScreen(
            HomeViewModel(
                1,
                // do not replace with actual network data source
                // otherwise preview won't work as intended
                CleaningStaffRepositoryImplementation(FakeNetworkDataSource()),
            ),
            onNavigateToLogin = { },
            onNavigateToRooms = { },
            onNavigateToOrders = { },
        )
    }
}

@Composable
fun HomeScreen(
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
                actions = { LogoutButton (onClick = onNavigateToLogin) },
            ) },
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
    ) {
        paddingValues ->
            Column(
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
