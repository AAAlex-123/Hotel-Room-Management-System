package alexman.hrms.feature.home

import alexman.hrms.core.data.repository.CleaningStaffQuery
import alexman.hrms.core.data.repository.CleaningStaffRepository
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import kotlinx.coroutines.launch

data class HomeUiState(
    val staffName: String,
    val staffId: Int,
)

class HomeViewModel(
    cleaningStaffId: Int,
    cleaningStaffRepository: CleaningStaffRepository,
) : ViewModel() {

    var uiState: HomeUiState by mutableStateOf(HomeUiState("", 0))
        private set

    init {
        viewModelScope.launch {
            with (
                cleaningStaffRepository.getCleaningStaff(
                    CleaningStaffQuery(cleaningStaffId = cleaningStaffId)
                )
            ) {
                uiState = uiState.copy(
                    staffName = this.name,
                    staffId = this.employeeId,
                )
            }
        }
    }
}
