package alexman.hrms.feature.room

import alexman.hrms.core.data.repository.CleaningStaffQuery
import alexman.hrms.core.data.repository.CleaningStaffRepository
import alexman.hrms.core.data.repository.NoteQuery
import alexman.hrms.core.data.repository.RoomRepository
import alexman.hrms.core.data.repository.SingleRoomQuery
import alexman.hrms.core.model.data.CleanState
import alexman.hrms.core.model.data.CleaningStaff
import alexman.hrms.core.model.data.Note
import alexman.hrms.core.model.data.Room
import alexman.hrms.core.model.data.UpstreamNoteDetails
import alexman.hrms.core.model.data.UpstreamRoomUpdateDetails
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.launch

internal class SingleRoomViewModel(
    val roomId: Int,
    cleaningStaffId: Int,
    private val roomRepository: RoomRepository,
    cleaningStaffRepository: CleaningStaffRepository,
) : ViewModel() {

    lateinit var cleaningStaff: CleaningStaff
    lateinit var room: Flow<Room>
        private set
    lateinit var notes: Flow<List<Note>>
        private set

    init {
        viewModelScope.launch {
            // TODO("figure out how to handle failure")
            cleaningStaff = cleaningStaffRepository.getCleaningStaff(
                CleaningStaffQuery(cleaningStaffId = cleaningStaffId)
            )
            room = roomRepository.getSingleRoom(
                SingleRoomQuery(roomId = roomId)
            )
            notes = roomRepository.getNotes(
                NoteQuery(roomId = roomId)
            )
        }
    }

    // This code is (should be) duplicate of
    // RoomViewModel#updateRoomState(Int, CleanState)
    internal fun updateRoomState(roomId: Int, cleanState: CleanState) {
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
                    cleaningStaffId = cleaningStaff.employeeId,
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
