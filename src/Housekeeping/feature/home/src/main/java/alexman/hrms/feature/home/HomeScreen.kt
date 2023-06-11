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
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.unit.dp
import androidx.lifecycle.compose.collectAsStateWithLifecycle

@PreviewLight
@Composable
private fun HomeScreenContentPreview() {
    HrmsTheme {
        HomeScreenContent(
            staff = HomeStaffUiState(-1, "Jane Doe", CleaningStaffType.CLEANING_LADY),
            onNavigateToLocalization = { },
            onNavigateToLogin = { },
            scaffoldNavigation = ScaffoldNavigation(),
        )
    }
}

@Composable
internal fun HomeScreen(
    homeViewModel: HomeViewModel,
    onNavigateToLocalization: () -> Unit,
    onNavigateToLogin: () -> Unit,
    onNavigateToRooms: (Int) -> Unit,
    onNavigateToCleaningLadies: (Int) -> Unit,
    onNavigateToOrders: (Int) -> Unit,
) {
    val staffUiState by homeViewModel.staffUiState.collectAsStateWithLifecycle()

    val (id, _, type) = staffUiState

    HomeScreenContent(
        staff = staffUiState,
        onNavigateToLocalization = onNavigateToLocalization,
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
    onNavigateToLocalization: () -> Unit,
    onNavigateToLogin: () -> Unit,
    scaffoldNavigation: ScaffoldNavigation,
) {
    HrmsScaffold(
        topBarText = when (staff.staffType) {
            CleaningStaffType.CLEANING_LADY -> stringResource(R.string.topbar_cleaning_lady)
            CleaningStaffType.HOUSEKEEPER -> stringResource(R.string.topbar_housekeeper)
        },
        customNavigationIcon = { ChangeLanguageButton(onClick = onNavigateToLocalization) },
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
            LargeDisplayText(stringResource(R.string.main_staffId, staff.staffId))
            LargeDisplayText(stringResource(R.string.main_staffName, staff.staffName))
        }
    }
}

@Composable
private fun LogoutButton(onClick: () -> Unit) {
    IconClickable(
        id = R.drawable.ic_menu_logout,
        alt = stringResource(R.string.ic_menu_logout_alt),
        onClick = onClick,
    )
}

@Composable
private fun ChangeLanguageButton(
    onClick: () -> Unit,
) {
    IconClickable(
        id = R.drawable.ic_menu_localization,
        alt = stringResource(R.string.ic_menu_localization_alt),
        onClick = onClick,
    )
}
