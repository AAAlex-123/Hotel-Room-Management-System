package alexman.hrms.core.data.model

import alexman.hrms.core.data.repository.AuthenticationQuery
import alexman.hrms.core.model.data.CleaningStaff
import alexman.hrms.core.model.data.CleaningStaffType
import alexman.hrms.core.network.model.NetworkCleaningStaff
import alexman.hrms.core.network.model.UpstreamNetworkCleaningStaffAuth

fun NetworkCleaningStaff.asExternalCleaningStaffModel() = CleaningStaff(
    employeeId = employeeId,
    name = name,
    cleaningStaffType = when (cleaningStaffType) {
        "HOUSEKEEPER" -> CleaningStaffType.HOUSEKEEPER
        "CHAMBERMAID" -> CleaningStaffType.CLEANING_LADY
        else -> error("Invalid cleaning staff type: $cleaningStaffType")
    }
)

fun AuthenticationQuery.asUpstreamCleaningStaffAuth() = UpstreamNetworkCleaningStaffAuth(
    login = login,
    password = password,
)
