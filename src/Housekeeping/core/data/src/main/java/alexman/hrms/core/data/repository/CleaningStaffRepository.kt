package alexman.hrms.core.data.repository

import alexman.hrms.core.model.data.CleaningStaff

data class AuthenticationQuery(
    val login: String,
    val password: String,
)

data class CleaningStaffQuery(
    val cleaningStaffId: Int,
)

interface CleaningStaffRepository {

    suspend fun authenticate(query: AuthenticationQuery): String?

    suspend fun getCleaningStaff(query: CleaningStaffQuery): CleaningStaff
}
