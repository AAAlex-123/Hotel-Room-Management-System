package alexman.hrms.core.data.repository

import alexman.hrms.core.model.data.CleaningStaff

data class AuthenticationQuery(
    val login: String,
    val password: String,
)

data class CleaningStaffQuery(
    val cleaningStaffId: Int,
)

data class CleaningLadiesQuery(
    val housekeeperId: Int,
)

interface CleaningStaffRepository {

    suspend fun authenticate(query: AuthenticationQuery): Int

    suspend fun getCleaningStaff(query: CleaningStaffQuery): CleaningStaff

    suspend fun getCleaningLadies(query: CleaningLadiesQuery): List<CleaningStaff>
}
