package alexman.hrms.core.data.repository

import alexman.hrms.core.data.model.asExternalCleaningStaffModel
import alexman.hrms.core.model.data.CleaningStaff
import alexman.hrms.core.network.HrmsNetworkDataSource
import kotlinx.coroutines.CoroutineDispatcher

class CleaningStaffRepositoryImplementation (
    private val datasource: HrmsNetworkDataSource,
) : CleaningStaffRepository {

    override suspend fun authenticate(query: AuthenticationQuery): String? =
        datasource.authenticate(query.login, query.password)

    override suspend fun getCleaningStaff(query: CleaningStaffQuery): CleaningStaff =
        datasource.getCleaningStaff(query.cleaningStaffId).asExternalCleaningStaffModel()
}
