package alexman.hrms.feature.maids

import alexman.hrms.core.data.repository.CleaningLadiesQuery
import alexman.hrms.core.data.repository.CleaningStaffRepository
import alexman.hrms.core.model.data.CleaningStaff
import alexman.hrms.core.model.data.CleaningStaffType
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import kotlinx.coroutines.launch

internal data class MaidStaffUiState(
    val staffId: Int,
)

internal class MaidViewModel(
    cleaningStaffId: Int,
    cleaningStaffRepository: CleaningStaffRepository,
) : ViewModel() {

    internal var staffUiState: MaidStaffUiState by mutableStateOf(
        MaidStaffUiState(staffId = cleaningStaffId)
    )
        private set

    private lateinit var _cleaningStaff: List<CleaningStaff>

    val cleaningLadies get() = listOf(*_cleaningStaff.toTypedArray())

    init {
        viewModelScope.launch {
            // TODO("figure out how to handle failure")
            _cleaningStaff = cleaningStaffRepository.getCleaningLadies(
                CleaningLadiesQuery(housekeeperId = cleaningStaffId)
            )
        }
    }
}
