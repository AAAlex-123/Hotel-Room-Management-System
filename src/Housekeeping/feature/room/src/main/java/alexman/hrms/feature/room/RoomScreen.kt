package alexman.hrms.feature.room

import alexman.hrms.core.designsystem.PreviewLight
import alexman.hrms.core.designsystem.component.BottomBarItem
import alexman.hrms.core.designsystem.component.HrmsScaffold
import alexman.hrms.core.designsystem.component.MediumDisplayText
import alexman.hrms.core.designsystem.component.ScaffoldNavigation
import alexman.hrms.core.designsystem.component.SmallDisplayText
import alexman.hrms.core.designsystem.theme.HrmsTheme
import alexman.hrms.core.model.data.CleanState
import alexman.hrms.core.model.data.CleanType
import alexman.hrms.core.model.data.CleaningStaffType
import alexman.hrms.core.model.data.Occupied
import alexman.hrms.core.model.data.Room
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.layout.wrapContentHeight
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.itemsIndexed
import androidx.compose.material3.MaterialTheme
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.unit.dp
import androidx.lifecycle.compose.collectAsStateWithLifecycle

@PreviewLight
@Composable
private fun RoomScreenContentPreview() {
    HrmsTheme {
        RoomScreenContent(
            staff = RoomStaffUiState(1, CleaningStaffType.CLEANING_LADY),
            rooms = listOf(
                Room("101", CleanState.DIRTY, CleanType.NORMAL, Occupied.VACANT),
                Room("102", CleanState.PENDING, CleanType.NORMAL, Occupied.OCCUPIED),
                Room("103", CleanState.CLEAN, CleanType.NORMAL, Occupied.VACANT),
                Room("104", CleanState.PENDING, CleanType.DEEP, Occupied.OCCUPIED),
                Room("105", CleanState.CLEAN, CleanType.DEEP, Occupied.VACANT),
            ),
            onNavigateToHome = { },
            onNavigateToSingleRoom = { },
            scaffoldNavigation = ScaffoldNavigation(),
        )
    }
}

@Composable
internal fun RoomScreen(
    roomViewModel: RoomViewModel,
    onNavigateToHome: (Int) -> Unit,
    onNavigateToSingleRoom: (String, Int) -> Unit,
    onNavigateToCleaningLadies: (Int) -> Unit,
    onNavigateToOrders: (Int) -> Unit,
) {
    val staffUiState by roomViewModel.staffUiState.collectAsStateWithLifecycle()
    val rooms by roomViewModel.rooms.collectAsStateWithLifecycle()

    val (id, type) = staffUiState

    RoomScreenContent(
        staff = staffUiState,
        rooms = rooms,
        onNavigateToHome = onNavigateToHome,
        onNavigateToSingleRoom = { roomId: String ->
            onNavigateToSingleRoom(roomId, id)
        },
        scaffoldNavigation = ScaffoldNavigation(
            toRooms = { },
            toCleaningLadies = if (type == CleaningStaffType.HOUSEKEEPER) {
                { onNavigateToCleaningLadies(id) }
            } else {
               null
            },
            toOrders = { onNavigateToOrders(id) },
        ),
    )
}

@Composable
private fun RoomScreenContent(
    staff: RoomStaffUiState,
    rooms: List<Room>,
    onNavigateToHome: (Int) -> Unit,
    onNavigateToSingleRoom: (String) -> Unit,
    scaffoldNavigation: ScaffoldNavigation,
) {
    HrmsScaffold(
        topBarText = "Rooms",
        onNavigationIconClick = { onNavigateToHome(staff.staffId) },
        scaffoldNavigation = scaffoldNavigation,
        selectedBottomBarItem = BottomBarItem.ROOMS,
    ) {
        LazyColumn(
            verticalArrangement = Arrangement.spacedBy(16.dp),
            contentPadding = PaddingValues(16.dp),
            modifier = Modifier
                .fillMaxSize()
        ) {
            itemsIndexed(rooms) { i, _ ->
                if (i % 3 == 0) {
                    val room1 = rooms.getOrNull(i)
                    val room2 = rooms.getOrNull(i + 1)
                    val room3 = rooms.getOrNull(i + 2)

                    RoomRow(room1, room2, room3, onNavigateToSingleRoom)
                }
            }
        }
    }
}

@Composable
private fun RoomRow(
    room1: Room?,
    room2: Room?,
    room3: Room?,
    onNavigateToSingleRoom: (String) -> Unit,
) {
    Row(
        horizontalArrangement = Arrangement.SpaceBetween,
        modifier = Modifier
            .fillMaxWidth()
            .wrapContentHeight(),
    ) {
        RoomComposable(room1, onNavigateToSingleRoom)
        RoomComposable(room2, onNavigateToSingleRoom)
        RoomComposable(room3, onNavigateToSingleRoom)
    }
}

@Composable
private fun RoomComposable(
    room: Room?,
    onNavigateToSingleRoom: (String) -> Unit,
) {
    Box(
        modifier = Modifier
            .height(100.dp)
            .width(100.dp)
            .clip(MaterialTheme.shapes.medium)
            .clickable {
                room?.let {
                    onNavigateToSingleRoom(it.id)
                }
            }
            .background(room.color())
    ) {
        room?.let {
            MediumDisplayText(
                text = "${it.id}${
                    when (it.cleanType) {
                        CleanType.NORMAL -> ""
                        CleanType.DEEP -> "*"
                    }
                }",
                modifier = Modifier
                    .align(Alignment.Center)
            )
            SmallDisplayText(
                text = it.occupied.name,
                modifier = Modifier
                    .align(Alignment.BottomCenter)
            )
        }
    }
}
