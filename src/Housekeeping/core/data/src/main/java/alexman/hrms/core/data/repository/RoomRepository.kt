package alexman.hrms.core.data.repository

import alexman.hrms.core.model.data.Note
import alexman.hrms.core.model.data.Room
import alexman.hrms.core.model.data.UpstreamNoteDetails
import alexman.hrms.core.model.data.UpstreamRoomUpdateDetails
import kotlinx.coroutines.flow.Flow

data class SingleRoomQuery(
    val roomId: String,
) {
    fun matches(room: Room): Boolean = room.id == roomId
}

data class RoomQuery(
    val cleaningStaffId: Int,
) {
    /*
     * TODO: find a way to do it this doesn't seem possible
     * since the matching depends on info outside of the Room entity
     */

    // fun matches(room: Room): Boolean = ???
}

data class NoteQuery(
    val roomId: String,
) {
    fun matches(note: Note): Boolean = note.roomId == roomId
}

interface RoomRepository {

    suspend fun getRooms(query: RoomQuery): Flow<List<Room>>

    suspend fun getSingleRoom(query: SingleRoomQuery): Flow<Room>

    suspend fun updateRoomState(upstreamRoomUpdateDetails: UpstreamRoomUpdateDetails)

    suspend fun getNotes(query: NoteQuery): Flow<List<Note>>

    suspend fun addNote(upstreamNoteDetails: UpstreamNoteDetails)

    suspend fun deleteNote(noteId: Int)
}
