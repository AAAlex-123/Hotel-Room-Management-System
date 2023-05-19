package alexman.hrms.feature.room

import alexman.hrms.core.data.repository.RoomQuery
import alexman.hrms.core.data.repository.RoomRepository
import alexman.hrms.core.model.data.CleanState
import alexman.hrms.core.model.data.Room
import alexman.hrms.core.model.data.UpstreamRoomUpdateDetails
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.launch

class RoomViewModel(
    val cleaningStaffId: Int,
    private val roomRepository: RoomRepository,
) : ViewModel() {

    lateinit var rooms: Flow<List<Room>>
        private set

    init {
        viewModelScope.launch {
            // TODO("figure out how to handle failure")
            rooms = roomRepository.getRooms(
                RoomQuery(cleaningStaffId = cleaningStaffId)
            )
        }
    }

    // This code is (should be) duplicate of
    // SingleRoomViewModel#updateRoomState(Int, CleanState)
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
}
