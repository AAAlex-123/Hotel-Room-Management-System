package alexman.hrms.feature.home

import alexman.hrms.core.data.repository.CleaningStaffQuery
import alexman.hrms.core.data.repository.CleaningStaffRepository
import alexman.hrms.core.model.data.CleaningStaffType
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
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

    private val _staffUiState = MutableStateFlow(
        HomeStaffUiState(-1, "", CleaningStaffType.CLEANING_LADY)
    )

    val staffUiState: StateFlow<HomeStaffUiState> = _staffUiState.asStateFlow()

    init {
        viewModelScope.launch {
            // TODO("figure out how to handle failure")
            with(
                cleaningStaffRepository.getCleaningStaff(
                    CleaningStaffQuery(cleaningStaffId = cleaningStaffId)
                )
            ) {
                _staffUiState.value = HomeStaffUiState(
                    staffId = this.employeeId,
                    staffName = this.name,
                    staffType = this.cleaningStaffType
                )
            }
        }
    }
}
