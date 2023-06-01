package alexman.hrms.feature.room

import alexman.hrms.core.data.repository.CleaningStaffQuery
import alexman.hrms.core.data.repository.CleaningStaffRepository
import alexman.hrms.core.data.repository.RoomQuery
import alexman.hrms.core.data.repository.RoomRepository
import alexman.hrms.core.model.data.CleaningStaffType
import alexman.hrms.core.model.data.Room
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.SharingStarted
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.stateIn
import kotlinx.coroutines.runBlocking

internal data class RoomStaffUiState(
    val staffId: Int,
    val staffType: CleaningStaffType,
)

internal class RoomViewModel(
    cleaningStaffId: Int,
    cleaningStaffRepository: CleaningStaffRepository,
    roomRepository: RoomRepository,
) : ViewModel() {

    private val _staffUiState = MutableStateFlow(
        RoomStaffUiState(-1, CleaningStaffType.CLEANING_LADY)
    )

    val staffUiState: StateFlow<RoomStaffUiState> = _staffUiState.asStateFlow()

    var rooms: StateFlow<List<Room>>
        private set

    init {
        runBlocking {
            // TODO("figure out how to handle failure")
            with(
                cleaningStaffRepository.getCleaningStaff(
                    CleaningStaffQuery(cleaningStaffId = cleaningStaffId)
                )
            ) {
                _staffUiState.value = RoomStaffUiState(
                    staffId = this.employeeId,
                    staffType = this.cleaningStaffType,
                )
            }

            // TODO("figure out how to handle failure")
            rooms = roomRepository.getRooms(
                RoomQuery(cleaningStaffId = cleaningStaffId)
            ).stateIn(
                viewModelScope,
                SharingStarted.WhileSubscribed(5000L),
                listOf(),
            )
        }
    }
}
