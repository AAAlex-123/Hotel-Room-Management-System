package alexman.hrms.feature.maids

import alexman.hrms.core.data.repository.CleaningLadiesQuery
import alexman.hrms.core.data.repository.CleaningStaffRepository
import alexman.hrms.core.model.data.CleaningStaff
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch

internal data class MaidStaffUiState(
    val staffId: Int,
)

internal class MaidViewModel(
    housekeeperId: Int,
    cleaningStaffRepository: CleaningStaffRepository,
) : ViewModel() {

    private val _staffUiState = MutableStateFlow(
        MaidStaffUiState(staffId = housekeeperId)
    )

    val staffUiState: StateFlow<MaidStaffUiState> = _staffUiState.asStateFlow()

    private val _cleaningStaff: MutableStateFlow<List<CleaningStaff>> = MutableStateFlow(listOf())

    var cleaningLadies: StateFlow<List<CleaningStaff>> = _cleaningStaff.asStateFlow()

    init {
        viewModelScope.launch {
            // TODO("figure out how to handle failure")
            _cleaningStaff.value = cleaningStaffRepository.getCleaningLadies(
                CleaningLadiesQuery(housekeeperId = housekeeperId)
            )
        }
    }
}
