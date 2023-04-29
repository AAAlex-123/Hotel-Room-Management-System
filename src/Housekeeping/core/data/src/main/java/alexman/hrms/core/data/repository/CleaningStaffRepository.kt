package alexman.hrms.core.data.repository

data class AuthenticationQuery(
    val login: String,
    val password: String,
)

interface CleaningStaffRepository {
    suspend fun authenticate(query: AuthenticationQuery): String?
}
