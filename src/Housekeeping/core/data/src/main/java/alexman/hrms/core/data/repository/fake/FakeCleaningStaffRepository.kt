package alexman.hrms.core.data.repository.fake

import alexman.hrms.core.data.repository.AuthenticationQuery
import alexman.hrms.core.data.repository.CleaningStaffRepository
import java.util.UUID

class FakeCleaningStaffRepository : CleaningStaffRepository {

    private val registeredStaff = listOf(
        "login1" to "password1",
        "login2" to "password2",
        "login3" to "password3",
    )

    override suspend fun authenticate(query: AuthenticationQuery): String? =
        if (registeredStaff.contains(query.login to query.password))
            UUID.randomUUID().toString()
        else
            null
}
