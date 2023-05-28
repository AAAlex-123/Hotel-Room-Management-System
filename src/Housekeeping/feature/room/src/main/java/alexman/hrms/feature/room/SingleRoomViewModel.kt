package alexman.hrms.feature.room

import alexman.hrms.core.data.repository.CleaningStaffQuery
import alexman.hrms.core.data.repository.CleaningStaffRepository
import alexman.hrms.core.data.repository.NoteQuery
import alexman.hrms.core.data.repository.RoomRepository
import alexman.hrms.core.data.repository.SingleRoomQuery
import alexman.hrms.core.model.data.CleanState
import alexman.hrms.core.model.data.CleaningStaffType
import alexman.hrms.core.model.data.Note
import alexman.hrms.core.model.data.Room
import alexman.hrms.core.model.data.UpstreamNoteDetails
import alexman.hrms.core.model.data.UpstreamRoomUpdateDetails
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.launch

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

    internal var staffUiState: SingleRoomStaffUiState by mutableStateOf(
        SingleRoomStaffUiState(-1, CleaningStaffType.CLEANING_LADY)
    )
        private set

    lateinit var room: Flow<Room>
        private set
    lateinit var notes: Flow<List<Note>>
        private set

    init {
        viewModelScope.launch {
            // TODO("figure out how to handle failure")
            with(
                cleaningStaffRepository.getCleaningStaff(
                    CleaningStaffQuery(cleaningStaffId = cleaningStaffId)
                )
            ) {
                staffUiState = staffUiState.copy(
                    staffId = this.employeeId,
                    staffType = this.cleaningStaffType,
                )
            }
        }

        viewModelScope.launch {
            // TODO("figure out how to handle failure")
            room = roomRepository.getSingleRoom(
                SingleRoomQuery(roomId = roomId)
            )
        }

        viewModelScope.launch {
            // TODO("figure out how to handle failure")
            notes = roomRepository.getNotes(
                NoteQuery(roomId = roomId)
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
                    cleaningStaffId = staffUiState.staffId,
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
