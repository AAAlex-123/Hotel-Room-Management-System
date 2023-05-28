package alexman.hrms.feature.home

import alexman.hrms.core.data.repository.CleaningStaffQuery
import alexman.hrms.core.data.repository.CleaningStaffRepository
import alexman.hrms.core.model.data.CleaningStaffType
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import kotlinx.coroutines.launch

internal data class HomeStaffUiState(
    val staffId: Int,
    val staffName: String,
    val staffType: CleaningStaffType,
)

internal class HomeViewModel(
    cleaningStaffId: Int,
    cleaningStaffRepository: CleaningStaffRepository,
) : ViewModel() {

    internal var staffUiState: HomeStaffUiState by mutableStateOf(
        HomeStaffUiState(-1, "", CleaningStaffType.CLEANING_LADY)
    )
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
                    staffName = this.name,
                    staffType = this.cleaningStaffType
                )
            }
        }
    }
}
