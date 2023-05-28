package alexman.hrms.feature.room

import alexman.hrms.core.data.repository.CleaningStaffQuery
import alexman.hrms.core.data.repository.CleaningStaffRepository
import alexman.hrms.core.data.repository.RoomQuery
import alexman.hrms.core.data.repository.RoomRepository
import alexman.hrms.core.model.data.CleaningStaffType
import alexman.hrms.core.model.data.Room
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.launch

internal data class RoomStaffUiState(
    val staffId: Int,
    val staffType: CleaningStaffType,
)

internal class RoomViewModel(
    cleaningStaffId: Int,
    cleaningStaffRepository: CleaningStaffRepository,
    roomRepository: RoomRepository,
) : ViewModel() {

    internal var staffUiState: RoomStaffUiState by mutableStateOf(
        RoomStaffUiState(-1, CleaningStaffType.CLEANING_LADY)
    )
        private set

    lateinit var rooms: Flow<List<Room>>
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
            rooms = roomRepository.getRooms(
                RoomQuery(cleaningStaffId = cleaningStaffId)
            )
        }
    }
}
