package alexman.hrms.core.data.repository.fake

import alexman.hrms.core.data.repository.AuthenticationQuery
import alexman.hrms.core.data.repository.CleaningStaffQuery
import alexman.hrms.core.data.repository.CleaningStaffRepository
import alexman.hrms.core.model.data.CleaningStaff
import alexman.hrms.core.model.data.CleaningStaffType
import java.util.UUID

class FakeCleaningStaffRepository : CleaningStaffRepository {

    private val registeredStaff = listOf(
        "login1" to "password1",
        "login2" to "password2",
        "login3" to "password3",
    )

    private val cleaningStaffMap = mapOf(
        1 to CleaningStaff(1, 10, "Alice", CleaningStaffType.CLEANING_LADY),
        2 to CleaningStaff(2, 11, "Bob", CleaningStaffType.CLEANING_LADY),
        3 to CleaningStaff(3, 12, "Charlie", CleaningStaffType.CLEANING_LADY),
    )

    override suspend fun authenticate(query: AuthenticationQuery): String? =
        if (registeredStaff.contains(query.login to query.password))
            UUID.randomUUID().toString()
        else
            null

    override suspend fun getCleaningStaff(query: CleaningStaffQuery): CleaningStaff =
        cleaningStaffMap[query.cleaningStaffId]!!
}
