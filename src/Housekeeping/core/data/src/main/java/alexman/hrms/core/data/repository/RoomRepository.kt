package alexman.hrms.core.data.repository

import alexman.hrms.core.model.data.Note
import alexman.hrms.core.model.data.Room
import alexman.hrms.core.model.data.UpstreamNoteDetails
import alexman.hrms.core.model.data.UpstreamRoomUpdateDetails
import kotlinx.coroutines.flow.Flow

data class SingleRoomQuery(
    val roomId: Int,
)

data class RoomQuery(
    val cleaningStaffId: Int,
)

data class NoteQuery(
    val roomId: Int,
)

interface RoomRepository {

    suspend fun getSingleRoom(singleRoomQuery: SingleRoomQuery): Flow<Room>

    suspend fun getRooms(query: RoomQuery): Flow<List<Room>>

    suspend fun updateRoomState(upstreamRoomUpdateDetails: UpstreamRoomUpdateDetails)

    suspend fun getNotes(query: NoteQuery): Flow<List<Note>>

    suspend fun addNote(upstreamNoteDetails: UpstreamNoteDetails)

    suspend fun deleteNote(noteId: Int)
}
