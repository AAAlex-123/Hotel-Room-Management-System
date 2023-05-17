package alexman.hrms.feature.room

import alexman.hrms.core.designsystem.component.DefaultNavigationIcon
import alexman.hrms.core.designsystem.component.HousekeepingTopAppBar
import alexman.hrms.core.designsystem.component.MediumDisplayText
import alexman.hrms.core.designsystem.component.SmallDisplayText
import alexman.hrms.core.model.data.CleanState
import alexman.hrms.core.model.data.CleanType
import alexman.hrms.core.model.data.Room
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
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
import androidx.compose.runtime.collectAsState
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp

@Composable
fun RoomScreen(
    roomViewModel: RoomViewModel,
    // TODO("navigation?"),
) {
    val rooms = roomViewModel.rooms.collectAsState(
        initial = listOf(),
    )

    RoomScreenContent(
        rooms = rooms.value,
    )
}

@Composable
private fun RoomScreenContent(
    rooms: List<Room>,
) {
    Box(
        contentAlignment = Alignment.Center,
        modifier = Modifier
            .fillMaxSize(),
    ) {
        Column(
            modifier = Modifier
                .fillMaxSize()
        ) {
            HousekeepingTopAppBar(
                text = "Rooms",
                navigationIcon = { DefaultNavigationIcon(onClick = { /* TODO("navigation?") */ }) }
            )
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

                        RoomRow(room1, room2, room3)
                    }
                }
                /*
                var i = 0;
                while (i < rooms.size) {
                    val room1 = rooms.getOrNull(i)
                    val room2 = rooms.getOrNull(i + 1)
                    val room3 = rooms.getOrNull(i + 2)

                    RoomRow(room1, room2, room3)

                    i += 3
                }

                 */
            }
        }
    }
}

@Composable
private fun RoomRow(
    room1: Room?,
    room2: Room?,
    room3: Room?,
) {
    Row(
        horizontalArrangement = Arrangement.SpaceBetween,
        modifier = Modifier
            .fillMaxWidth()
            .wrapContentHeight(),
    ) {
        RoomComposable(room1)
        RoomComposable(room2)
        RoomComposable(room3)
    }
}

@Composable
private fun RoomComposable(
    room: Room?,
) {
    Box(
        modifier = Modifier
            .height(120.dp)
            .width(120.dp)
            .clip(MaterialTheme.shapes.medium)
            .clickable {

            }
            .background(
                when(room?.cleanState) {
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
