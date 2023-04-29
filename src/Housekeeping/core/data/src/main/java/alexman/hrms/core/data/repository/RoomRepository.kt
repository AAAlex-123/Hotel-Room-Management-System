package alexman.hrms.core.data.repository

import alexman.hrms.core.model.data.Room
import kotlinx.coroutines.flow.Flow

data class RoomQuery (
    val housekeeperId: Int? = null,
)

interface RoomRepository {

    fun getRooms(query: RoomQuery): Flow<List<Room>>

    /*
    TODO("figure out how to do that")

    suspend fun updateRoom(room: Room)
    */
}
