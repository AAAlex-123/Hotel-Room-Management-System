package alexman.hrms.feature.room

import alexman.hrms.core.designsystem.component.ButtonWithText
import alexman.hrms.core.designsystem.component.DefaultNavigationIcon
import alexman.hrms.core.designsystem.component.DeletableListItem
import alexman.hrms.core.designsystem.component.HousekeepingTopAppBar
import alexman.hrms.core.designsystem.component.InputField
import alexman.hrms.core.designsystem.component.LargeBodyText
import alexman.hrms.core.designsystem.component.MediumDisplayText
import alexman.hrms.core.designsystem.component.SmallDisplayText
import alexman.hrms.core.designsystem.component.Popup
import alexman.hrms.core.model.data.CleanState
import alexman.hrms.core.model.data.CleanType
import alexman.hrms.core.model.data.CleaningStaffType
import alexman.hrms.core.model.data.Note
import alexman.hrms.core.model.data.Occupied
import alexman.hrms.core.model.data.Room
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material3.Divider
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.runtime.Composable
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp

@Composable
fun SingleRoomScreen(
    singleRoomViewModel: SingleRoomViewModel,
    // TODO("navigation?"),
) {
    val roomId = singleRoomViewModel.roomId
    val room = singleRoomViewModel.room.collectAsState(
        initial = Room(
            -1, CleanState.DIRTY, CleanType.NORMAL, Occupied.OCCUPIED,
        )
    )
    val notes = singleRoomViewModel.notes.collectAsState(
        initial = listOf(),
    )

    // Popup {
        SingleRoomScreenContent(
            cleaningStaffId = singleRoomViewModel.cleaningStaff.employeeId,
            cleaningStaffType = singleRoomViewModel.cleaningStaff.cleaningStaffType,
            room.value,
            notes.value,
            onUpdateRoomState = {
                singleRoomViewModel.updateRoomState(roomId, it)
            },
            onAddNote = {
                singleRoomViewModel.addNote(it)
            },
            onDeleteNote = {
                singleRoomViewModel.deleteNote(it)
            },
        )
    // }
}

@Composable
private fun MyDivider() {
    Divider(
        thickness = 2.dp,
        color = Color.DarkGray,
    )
}

@Composable
private fun SingleRoomScreenContent(
    cleaningStaffId: Int,
    cleaningStaffType: CleaningStaffType,
    room: Room,
    notes: List<Note>,
    onUpdateRoomState: (CleanState) -> Unit,
    onAddNote: (String) -> Unit,
    onDeleteNote: (Int) -> Unit,
) {

    val (noteData, setNoteData) = remember { mutableStateOf("") }

    Column(
        verticalArrangement = Arrangement.spacedBy(8.dp),
        horizontalAlignment = Alignment.CenterHorizontally,
        modifier = Modifier
            .fillMaxSize()
            .padding(8.dp),
    ) {
        HousekeepingTopAppBar(
            text = "Room ${room.id}",
            navigationIcon = { DefaultNavigationIcon(onClick = { /* TODO("navigation?") */ }) },
            backgroundColor = when (room.cleanState) {
                CleanState.DIRTY -> Color.Red
                CleanState.PENDING_UPLOAD, CleanState.PENDING_CHECK -> Color.Yellow
                CleanState.CLEAN -> Color.Green
                CleanState.INSPECTED -> Color.Cyan
            },
        )
        /*
        Box(
            contentAlignment = Alignment.Center,
            modifier = Modifier
                .fillMaxWidth()
                .background(
                    when (room.cleanState) {
                        CleanState.DIRTY -> Color.Red
                        CleanState.PENDING_UPLOAD, CleanState.PENDING_CHECK -> Color.Yellow
                        CleanState.CLEAN -> Color.Green
                        CleanState.INSPECTED -> Color.Cyan
                    }
                )
                .padding(8.dp)
        ) {
            DefaultNavigationIcon(
                onClick = { /* TODO("navigation?") */ },
                modifier = Modifier.align(Alignment.TopStart),
            )
            MediumDisplayText(
                text = "Room ${room.id}",
                modifier = Modifier.align(Alignment.Center),
            )
        }
        */
        MyDivider()
        Row(
            horizontalArrangement = Arrangement.SpaceEvenly,
            verticalAlignment = Alignment.CenterVertically,
            modifier = Modifier
                .fillMaxWidth()
                .padding(8.dp)
        ) {
            Surface(
                shape = MaterialTheme.shapes.medium,
            ) {
                Column(
                    verticalArrangement = Arrangement.spacedBy(8.dp),
                    modifier = Modifier
                        .padding(8.dp),
                ) {
                    LargeBodyText(
                        text = "Occupied: ${room.occupied.toSentenceCase()}"
                    )
                    LargeBodyText(
                        text = "Clean Type: ${room.cleanType.toSentenceCase()}"
                    )
                }
            }
            // don't show button when clean/inspected
            if (room.cleanState != CleanState.CLEAN && room.cleanState != CleanState.INSPECTED) {
                ButtonWithText(
                    text = "Mark ${ when(room.cleanState) {
                        CleanState.DIRTY -> "Clean"
                        CleanState.PENDING_UPLOAD, CleanState.PENDING_CHECK -> "Dirty"
                        else -> ""  // can't happen
                    }}",
                    onClick = { when(room.cleanState) {
                        CleanState.DIRTY -> {
                            onUpdateRoomState(
                                when(room.cleanType) {
                                    CleanType.NORMAL -> CleanState.PENDING_UPLOAD
                                    CleanType.DEEP -> CleanState.PENDING_CHECK
                                }
                            )
                        }
                        CleanState.PENDING_UPLOAD, CleanState.PENDING_CHECK -> {
                            onUpdateRoomState(CleanState.DIRTY)
                        }
                        else -> {}  // can't happen
                    } },
                    enabled = true,
                )
            }
        }
        MyDivider()
        SmallDisplayText(text = "Notes")
        LazyColumn(
            contentPadding = PaddingValues(8.dp),
            verticalArrangement = Arrangement.spacedBy(8.dp)
        ) {
            items(notes) {
                DeletableListItem(
                    id = it.id,
                    text = it.noteData,
                    deletable = cleaningStaffType == CleaningStaffType.HOUSEKEEPER
                            || it.cleaningStaffId == cleaningStaffId,
                    onDelete = onDeleteNote,
                )
            }
        }
        MyDivider()
        InputField(
            value = noteData,
            onValueChange = setNoteData,
            placeholderText = "Please type your Note",
            modifier = Modifier
                .fillMaxWidth()
        )
        ButtonWithText(
            text = "Add Note",
            onClick = { onAddNote(noteData) }
        )
    }
}
