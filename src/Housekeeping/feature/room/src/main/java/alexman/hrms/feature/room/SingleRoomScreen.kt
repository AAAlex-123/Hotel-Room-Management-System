package alexman.hrms.feature.room

import alexman.hrms.core.designsystem.PreviewLight
import alexman.hrms.core.designsystem.SizeVariation
import alexman.hrms.core.designsystem.component.ButtonWithText
import alexman.hrms.core.designsystem.component.HrmsScaffold
import alexman.hrms.core.designsystem.component.LargeBodyText
import alexman.hrms.core.designsystem.component.ListItem
import alexman.hrms.core.designsystem.component.SmallDisplayText
import alexman.hrms.core.designsystem.component.TextInputField
import alexman.hrms.core.designsystem.theme.HrmsTheme
import alexman.hrms.core.model.data.CleanState
import alexman.hrms.core.model.data.CleanType
import alexman.hrms.core.model.data.CleaningStaffType
import alexman.hrms.core.model.data.Note
import alexman.hrms.core.model.data.Occupied
import alexman.hrms.core.model.data.Room
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material3.Divider
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp
import androidx.lifecycle.compose.collectAsStateWithLifecycle

@PreviewLight
@Composable
private fun SingleRoomScreenContentPreview() {
    HrmsTheme {
        SingleRoomScreenContent(
            staff = SingleRoomStaffUiState(1, CleaningStaffType.CLEANING_LADY),
            room = Room("101", CleanState.DIRTY, CleanType.NORMAL, Occupied.OCCUPIED),
            notes = listOf(
                Note(1, "101", 1, "NOTE 1"),
                Note(2, "101", 1, "NOTE 2"),
                Note(3, "101", 2, "NOTE 3"),
                Note(4, "101", 2, "NOTE 4"),
                Note(5, "101", 1, "NOTE 5"),
            ),
            onUpdateRoomState = { },
            onAddNote = { },
            onDeleteNote = { },
            onNavigateBack = { },
        )
    }
}

@Composable
internal fun SingleRoomScreen(
    singleRoomViewModel: SingleRoomViewModel,
    onNavigateBack: () -> Unit,
) {
    val staffUiState by singleRoomViewModel.staffUiState.collectAsStateWithLifecycle()
    val room by singleRoomViewModel.room.collectAsStateWithLifecycle()
    val notes by singleRoomViewModel.notes.collectAsStateWithLifecycle()

    val roomId = singleRoomViewModel.roomId

    SingleRoomScreenContent(
        staff = staffUiState,
        room = room,
        notes = notes,
        onUpdateRoomState = { singleRoomViewModel.updateRoomState(roomId, it) },
        onAddNote = { singleRoomViewModel.addNote(it) },
        onDeleteNote = { singleRoomViewModel.deleteNote(it) },
        onNavigateBack = onNavigateBack,
    )
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
    staff: SingleRoomStaffUiState,
    room: Room,
    notes: List<Note>,
    onUpdateRoomState: (CleanState) -> Unit,
    onAddNote: (String) -> Unit,
    onDeleteNote: (Int) -> Unit,
    onNavigateBack: () -> Unit,
) {
    val (noteData, setNoteData) = remember { mutableStateOf("") }

    HrmsScaffold(
        topBarText = "Room ${room.id}${
            when (room.cleanType) {
                CleanType.NORMAL -> ""
                CleanType.DEEP -> "*"
            }
        }",
        onNavigationIconClick = { onNavigateBack() },
        topBarBackgroundColor = room.color(),
    ) {
        Column(
            verticalArrangement = Arrangement.spacedBy(8.dp),
            horizontalAlignment = Alignment.CenterHorizontally,
            modifier = Modifier
                .padding(8.dp),
        ) {
            /* alternative to scaffold: remove it and uncomment the following
            HousekeepingTopAppBar(
                text = "Room ${room.id}",
                navigationIcon = {
                    DefaultNavigationIcon(onClick = { onNavigateToRooms(cleaningStaffId) })
                },
                backgroundColor = when (room.cleanState) {
                    CleanState.DIRTY -> Color.Red
                    CleanState.PENDING_UPLOAD, CleanState.PENDING_CHECK -> Color.Yellow
                    CleanState.CLEAN -> Color.Green
                    CleanState.INSPECTED -> Color.Cyan
                },
            )
            MyDivider()
            */
            Row(
                horizontalArrangement = Arrangement.SpaceEvenly,
                verticalAlignment = Alignment.CenterVertically,
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(
                        horizontal = 0.dp,
                        vertical = 8.dp,
                    ),
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
                // show dirty <-> pending button regardless of staff type
                // but don't show button when clean
                if (room.cleanState != CleanState.CLEAN) {
                    ButtonWithText(
                        text = when (room.cleanState) {
                            CleanState.DIRTY -> "Mark\nPending"
                            CleanState.PENDING -> "Mark\nDirty"
                            else -> error("CleanState was ${room.cleanState} in ButtonWithText1#text")
                        },
                        onClick = {
                            when (room.cleanState) {
                                CleanState.DIRTY -> onUpdateRoomState(CleanState.PENDING)
                                CleanState.PENDING -> onUpdateRoomState(CleanState.DIRTY)
                                else -> error("CleanState was ${room.cleanState} in ButtonWithText1#onClick")
                            }
                        },
                        sizeVariation = SizeVariation.SECONDARY,
                    )
                }
                // show pending <-> clean button only for housekeepers
                // but don't show button when dirty
                if (staff.staffType == CleaningStaffType.HOUSEKEEPER
                    && room.cleanState != CleanState.DIRTY) {
                    ButtonWithText(
                        text = when (room.cleanState) {
                            CleanState.PENDING -> when (room.cleanType) {
                                CleanType.NORMAL -> "Mark\nClean"
                                CleanType.DEEP -> "Mark\nInspected"
                            }
                            CleanState.CLEAN -> "Mark\nPending"
                            else -> error("CleanState was ${room.cleanState} in ButtonWithText2#text")
                        },
                        onClick = {
                            when (room.cleanState) {
                                CleanState.PENDING -> onUpdateRoomState(CleanState.CLEAN)
                                CleanState.CLEAN -> onUpdateRoomState(CleanState.PENDING)
                                else -> error("CleanState was ${room.cleanState} in ButtonWithText2#onClick")
                            }
                        },
                        sizeVariation = SizeVariation.SECONDARY,
                    )
                }
            }
            MyDivider()
            SmallDisplayText(text = "Notes")
            LazyColumn(
                contentPadding = PaddingValues(8.dp),
                verticalArrangement = Arrangement.spacedBy(8.dp),
                modifier = Modifier.weight(1f) // full height
            ) {
                items(notes) {
                    ListItem(
                        id = it.id,
                        text = it.noteData,
                        deletable = staff.staffType == CleaningStaffType.HOUSEKEEPER
                                || it.cleaningStaffId == staff.staffId,
                        onDelete = onDeleteNote,
                        completed = false,
                        markable = false,
                        onMarkCompleted = { _: Int, _: Boolean -> },
                        sizeVariation = SizeVariation.SECONDARY,
                    )
                }
            }
            MyDivider()
            TextInputField(
                value = noteData,
                onValueChange = setNoteData,
                placeholderText = "Please type your Note",
                modifier = Modifier
                    .fillMaxWidth(),
                singleLine = false,
            )
            ButtonWithText(
                text = "Add Note",
                onClick = { onAddNote(noteData) },
                sizeVariation = SizeVariation.SECONDARY,
            )
        }
    }
}
