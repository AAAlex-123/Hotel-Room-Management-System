package alexman.hrms.feature.room

import alexman.hrms.core.data.repository.RoomQuery
import alexman.hrms.core.data.repository.RoomRepository
import alexman.hrms.core.model.data.Room
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.launch

internal class RoomViewModel(
    val cleaningStaffId: Int,
    roomRepository: RoomRepository,
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
}
