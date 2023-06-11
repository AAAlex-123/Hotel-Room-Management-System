package alexman.hrms.feature.maids

import alexman.hrms.core.designsystem.PreviewLight
import alexman.hrms.core.designsystem.SizeVariation
import alexman.hrms.core.designsystem.component.BottomBarItem
import alexman.hrms.core.designsystem.component.HrmsScaffold
import alexman.hrms.core.designsystem.component.ListItem
import alexman.hrms.core.designsystem.component.ScaffoldNavigation
import alexman.hrms.core.designsystem.theme.HrmsTheme
import alexman.hrms.core.model.data.CleaningStaff
import alexman.hrms.core.model.data.CleaningStaffType
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import androidx.lifecycle.compose.collectAsStateWithLifecycle

@PreviewLight
@Composable
private fun MaidScreenContentPreview() {
    HrmsTheme {
        MaidScreenContent(
            cleaningLadies = listOf(
                CleaningStaff(1, "Alice", CleaningStaffType.CLEANING_LADY),
                CleaningStaff(2, "Bob", CleaningStaffType.CLEANING_LADY),
                CleaningStaff(3, "Charlie", CleaningStaffType.CLEANING_LADY),
                CleaningStaff(4, "David", CleaningStaffType.CLEANING_LADY),
                CleaningStaff(5, "Erin", CleaningStaffType.CLEANING_LADY),
            ),
            onNavigateBack = { },
            scaffoldNavigation = ScaffoldNavigation(),
        )
    }
}

@Composable
internal fun MaidScreen(
    maidViewModel: MaidViewModel,
    onNavigateBack: () -> Unit,
    onNavigateToRooms: (Int) -> Unit,
    onNavigateToOrders: (Int) -> Unit,
) {
    val staffUiState by maidViewModel.staffUiState.collectAsStateWithLifecycle()
    val cleaningLadies by maidViewModel.cleaningLadies.collectAsStateWithLifecycle()

    val (id) = staffUiState

    MaidScreenContent(
        cleaningLadies = cleaningLadies,
        onNavigateBack = onNavigateBack,
        scaffoldNavigation = ScaffoldNavigation(
            toRooms = { onNavigateToRooms(id) },
            toCleaningLadies = { },
            toOrders = { onNavigateToOrders(id) },
        )
    )
}

@Composable
private fun MaidScreenContent(
    cleaningLadies: List<CleaningStaff>,
    onNavigateBack: () -> Unit,
    scaffoldNavigation: ScaffoldNavigation,
) {
    HrmsScaffold(
        topBarText = "Cleaning Ladies",
        onNavigationIconClick = { onNavigateBack() },
        scaffoldNavigation = scaffoldNavigation,
        selectedBottomBarItem = BottomBarItem.CLEANING_LADIES,
    ) {
        LazyColumn(
            verticalArrangement = Arrangement.spacedBy(16.dp),
            modifier = Modifier
                .fillMaxSize()
                .padding(16.dp),
        ) {
            items(cleaningLadies) {
                ListItem(
                    id = it.employeeId,
                    text = it.name,
                    deletable = false,
                    onDelete = { },
                    completed = false,
                    markable = false,
                    onMarkCompleted = { _: Int, _: Boolean -> },
                    SizeVariation.PRIMARY,
                )
            }
        }
    }
}
