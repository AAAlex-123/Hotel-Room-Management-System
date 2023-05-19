package alexman.hrms.feature.room

import alexman.hrms.core.designsystem.PreviewLight
import alexman.hrms.core.designsystem.component.DefaultNavigationIcon
import alexman.hrms.core.designsystem.component.HousekeepingBottomBar
import alexman.hrms.core.designsystem.component.HousekeepingTopAppBar
import alexman.hrms.core.designsystem.component.MediumDisplayText
import alexman.hrms.core.designsystem.component.OrdersBottomBarItem
import alexman.hrms.core.designsystem.component.RoomsBottomBarItem
import alexman.hrms.core.designsystem.component.SmallDisplayText
import alexman.hrms.core.designsystem.theme.HousekeepingTheme
import alexman.hrms.core.model.data.CleanState
import alexman.hrms.core.model.data.CleanType
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
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.layout.wrapContentHeight
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.itemsIndexed
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Scaffold
import androidx.compose.runtime.Composable
import androidx.compose.runtime.collectAsState
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp

@PreviewLight
@Composable
private fun RoomScreenContentPreview() {
    HousekeepingTheme {
        RoomScreenContent(
            cleaningStaffId = 1,
            rooms = listOf(
                Room(101, CleanState.DIRTY, CleanType.NORMAL, Occupied.VACANT),
                Room(102, CleanState.PENDING_UPLOAD, CleanType.NORMAL, Occupied.OCCUPIED),
                Room(103, CleanState.CLEAN, CleanType.NORMAL, Occupied.VACANT),
                Room(104, CleanState.PENDING_CHECK, CleanType.DEEP, Occupied.OCCUPIED),
                Room(105, CleanState.INSPECTED, CleanType.DEEP, Occupied.VACANT),
            ),
            onNavigateToHome = { },
            onNavigateToOrders = { },
            onNavigateToSingleRoom = { },
        )
    }
}

@Composable
internal fun RoomScreen(
    roomViewModel: RoomViewModel,
    onNavigateToHome: (Int) -> Unit,
    onNavigateToOrders: (Int) -> Unit,
    onNavigateToSingleRoom: (Int, Int) -> Unit,
) {
    val rooms = roomViewModel.rooms.collectAsState(listOf())

    RoomScreenContent(
        cleaningStaffId = roomViewModel.cleaningStaffId,
        rooms = rooms.value,
        onNavigateToHome = onNavigateToHome,
        onNavigateToOrders = onNavigateToOrders,
        onNavigateToSingleRoom = { roomId: Int ->
            onNavigateToSingleRoom(roomId, roomViewModel.cleaningStaffId)
        },
    )
}

@Composable
private fun RoomScreenContent(
    cleaningStaffId: Int,
    rooms: List<Room>,
    onNavigateToHome: (Int) -> Unit,
    onNavigateToOrders: (Int) -> Unit,
    onNavigateToSingleRoom: (Int) -> Unit,
) {
    Scaffold(
        topBar = {
            HousekeepingTopAppBar(
                text = "Rooms",
                navigationIcon = {
                    DefaultNavigationIcon(
                        onClick = { onNavigateToHome(cleaningStaffId) },
                    )
                },
            )
        },
        bottomBar = {
            HousekeepingBottomBar {
                RoomsBottomBarItem(
                    onClick = { },
                    selected = true,
                )
                OrdersBottomBarItem(
                    onClick = { onNavigateToOrders(cleaningStaffId) },
                    selected = false,
                )
            }
        }
    ) { paddingValues ->
        Box(
            modifier = Modifier
                .fillMaxSize()
                .background(color = MaterialTheme.colorScheme.background)
                .padding(paddingValues),
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
}

@Composable
private fun RoomRow(
    room1: Room?,
    room2: Room?,
    room3: Room?,
    onNavigateToSingleRoom: (Int) -> Unit,
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
    onNavigateToSingleRoom: (Int) -> Unit,
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
            .background(
                when (room?.cleanState) {
                    CleanState.DIRTY -> Color.Red
                    CleanState.PENDING_UPLOAD, CleanState.PENDING_CHECK -> Color.Yellow
                    CleanState.CLEAN -> Color.Green
                    CleanState.INSPECTED -> Color.Cyan
                    else -> Color.Transparent
                }
            )
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
