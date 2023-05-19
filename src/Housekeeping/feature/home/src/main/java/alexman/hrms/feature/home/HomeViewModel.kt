package alexman.hrms.feature.home

import alexman.hrms.core.data.repository.CleaningStaffQuery
import alexman.hrms.core.data.repository.CleaningStaffRepository
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import kotlinx.coroutines.launch

internal data class HomeUiState(
    val staffId: Int,
    val staffName: String,
)

internal class HomeViewModel(
    cleaningStaffId: Int,
    cleaningStaffRepository: CleaningStaffRepository,
) : ViewModel() {

    internal var uiState: HomeUiState by mutableStateOf(HomeUiState(-1, ""))
        private set

    init {
        viewModelScope.launch {
            // TODO("figure out how to handle failure")
            with(
                cleaningStaffRepository.getCleaningStaff(
                    CleaningStaffQuery(cleaningStaffId = cleaningStaffId)
                )
            ) {
                uiState = uiState.copy(
                    staffId = this.employeeId,
                    staffName = this.name,
                )
            }
        }
    }
}
