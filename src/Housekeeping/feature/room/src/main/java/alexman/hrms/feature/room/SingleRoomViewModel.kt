package alexman.hrms.feature.room

import alexman.hrms.core.data.repository.CleaningStaffQuery
import alexman.hrms.core.data.repository.CleaningStaffRepository
import alexman.hrms.core.data.repository.NoteQuery
import alexman.hrms.core.data.repository.RoomRepository
import alexman.hrms.core.data.repository.SingleRoomQuery
import alexman.hrms.core.model.data.CleanState
import alexman.hrms.core.model.data.CleanType
import alexman.hrms.core.model.data.CleaningStaffType
import alexman.hrms.core.model.data.Note
import alexman.hrms.core.model.data.Occupied
import alexman.hrms.core.model.data.Room
import alexman.hrms.core.model.data.UpstreamNoteDetails
import alexman.hrms.core.model.data.UpstreamRoomUpdateDetails
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.SharingStarted
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.stateIn
import kotlinx.coroutines.launch
import kotlinx.coroutines.runBlocking

internal data class SingleRoomStaffUiState(
    val staffId: Int,
    val staffType: CleaningStaffType,
)

internal class SingleRoomViewModel(
    val roomId: String,
    cleaningStaffId: Int,
    private val roomRepository: RoomRepository,
    cleaningStaffRepository: CleaningStaffRepository,
) : ViewModel() {

    private val _staffUiState = MutableStateFlow(
        SingleRoomStaffUiState(-1, CleaningStaffType.CLEANING_LADY)
    )

    val staffUiState: StateFlow<SingleRoomStaffUiState> = _staffUiState.asStateFlow()

    var room: StateFlow<Room>
        private set

    var notes: StateFlow<List<Note>>
        private set

    init {
        runBlocking {
            // TODO("figure out how to handle failure")
            with(
                cleaningStaffRepository.getCleaningStaff(
                    CleaningStaffQuery(cleaningStaffId = cleaningStaffId)
                )
            ) {
                _staffUiState.value = SingleRoomStaffUiState(
                    staffId = this.employeeId,
                    staffType = this.cleaningStaffType,
                )
            }

            // TODO("figure out how to handle failure")
            room = roomRepository.getSingleRoom(
                SingleRoomQuery(roomId = roomId)
            ).stateIn(
                viewModelScope,
                SharingStarted.WhileSubscribed(5000L),
                Room("-1", CleanState.DIRTY, CleanType.NORMAL, Occupied.OCCUPIED)
            )

            // TODO("figure out how to handle failure")
            notes = roomRepository.getNotes(
                NoteQuery(roomId = roomId)
            ).stateIn(
                viewModelScope,
                SharingStarted.WhileSubscribed(5000L),
                listOf(),
            )
        }
    }

    // This code is (should be) duplicate of
    // RoomViewModel#updateRoomState(Int, CleanState)
    internal fun updateRoomState(roomId: String, cleanState: CleanState) {
        viewModelScope.launch {
            // TODO("figure out how to handle failure")
            roomRepository.updateRoomState(
                UpstreamRoomUpdateDetails(
                    id = roomId,
                    cleanState = cleanState,
                )
            )
        }
    }

    internal fun addNote(noteData: String) {
        viewModelScope.launch {
            // TODO("figure out how to handle failure")
            roomRepository.addNote(
                UpstreamNoteDetails(
                    roomId = roomId,
                    cleaningStaffId = staffUiState.value.staffId,
                    noteData = noteData,
                )
            )
        }
    }

    internal fun deleteNote(noteId: Int) {
        viewModelScope.launch {
            // TODO("figure out how to handle failure")
            roomRepository.deleteNote(noteId)
        }
    }
}
