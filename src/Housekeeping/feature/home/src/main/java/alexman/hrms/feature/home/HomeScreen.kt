package alexman.hrms.feature.home

import alexman.hrms.core.designsystem.PreviewLight
import alexman.hrms.core.designsystem.component.HrmsScaffold
import alexman.hrms.core.designsystem.component.IconClickable
import alexman.hrms.core.designsystem.component.LargeDisplayText
import alexman.hrms.core.designsystem.component.ScaffoldNavigation
import alexman.hrms.core.designsystem.theme.HrmsTheme
import alexman.hrms.core.model.data.CleaningStaffType
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import androidx.lifecycle.compose.collectAsStateWithLifecycle

@PreviewLight
@Composable
private fun HomeScreenContentPreview() {
    HrmsTheme {
        HomeScreenContent(
            staff = HomeStaffUiState(-1, "Jane Doe", CleaningStaffType.CLEANING_LADY),
            onNavigateToLogin = { },
            scaffoldNavigation = ScaffoldNavigation(),
        )
    }
}

@Composable
internal fun HomeScreen(
    homeViewModel: HomeViewModel,
    onNavigateToLogin: () -> Unit,
    onNavigateToRooms: (Int) -> Unit,
    onNavigateToCleaningLadies: (Int) -> Unit,
    onNavigateToOrders: (Int) -> Unit,
) {
    val staffUiState by homeViewModel.staffUiState.collectAsStateWithLifecycle()

    val (id, _, type) = staffUiState

    HomeScreenContent(
        staff = staffUiState,
        onNavigateToLogin = onNavigateToLogin,
        scaffoldNavigation = ScaffoldNavigation(
            toRooms = { onNavigateToRooms(id) },
            toCleaningLadies = if (type == CleaningStaffType.HOUSEKEEPER) {
                { onNavigateToCleaningLadies(id) }
            } else {
                null
            },
            toOrders = { onNavigateToOrders(id) },
        )
    )
}

@Composable
private fun HomeScreenContent(
    staff: HomeStaffUiState,
    onNavigateToLogin: () -> Unit,
    scaffoldNavigation: ScaffoldNavigation,
) {
    HrmsScaffold(
        topBarText = when (staff.staffType) {
            CleaningStaffType.CLEANING_LADY -> "Cleaning Lady"
            CleaningStaffType.HOUSEKEEPER -> "Housekeeper"
        },
        actions = { LogoutButton(onClick = onNavigateToLogin) },
        scaffoldNavigation = scaffoldNavigation,
    ) {
        // don't show anything while loading
        if (staff.staffId == -1 && staff.staffName == "") {
            return@HrmsScaffold
        }
        Column(
            horizontalAlignment = Alignment.CenterHorizontally,
            verticalArrangement = Arrangement.spacedBy(8.dp, Alignment.CenterVertically),
            modifier = Modifier
                .fillMaxSize()
        ) {
            LargeDisplayText("Staff ID: ${staff.staffId}")
            LargeDisplayText("Name: ${staff.staffName}")
        }
    }
}

@Composable
private fun LogoutButton(onClick: () -> Unit) {
    IconClickable(
        id = R.drawable.ic_menu_logout,
        alt = "logout",
        onClick = onClick,
    )
}
