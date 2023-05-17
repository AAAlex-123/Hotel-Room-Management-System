package alexman.hrms.core.data.repository

import alexman.hrms.core.data.model.asExternalCleaningStaffModel
import alexman.hrms.core.data.model.asUpstreamCleaningStaffAuth
import alexman.hrms.core.model.data.CleaningStaff
import alexman.hrms.core.network.HrmsNetworkDataSource

class CleaningStaffRepositoryImplementation (
    private val datasource: HrmsNetworkDataSource,
) : CleaningStaffRepository {

    override suspend fun authenticate(query: AuthenticationQuery): Int {
        val response = /* withContext(ioDispatcher) { */
            datasource.authenticate(
                query.asUpstreamCleaningStaffAuth()
            )
        /* } */

        return if (response.ok) {
            response.body!!
        } else {
            -1
        }
    }

    override suspend fun getCleaningStaff(query: CleaningStaffQuery): CleaningStaff {

        val response = /* withContext(ioDispatcher) { */
            datasource.getCleaningStaff(query.cleaningStaffId)
        /* } */

        if (response.ok) {
            return response.body!!.asExternalCleaningStaffModel()
        } else {
            TODO("figure out what to do on GET error")
        }
    }
}
