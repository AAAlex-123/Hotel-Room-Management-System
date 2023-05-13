package alexman.hrms.core.data.model

import alexman.hrms.core.data.repository.AuthenticationQuery
import alexman.hrms.core.model.data.CleaningStaff
import alexman.hrms.core.model.data.CleaningStaffType
import alexman.hrms.core.network.model.NetworkCleaningStaff
import alexman.hrms.core.network.model.UpstreamNetworkCleaningStaffAuth

fun NetworkCleaningStaff.asExternalCleaningStaffModel() = CleaningStaff(
    employeeId = employeeId,
    name = name,
    cleaningStaffType = when(cleaningStaffType) {
        "HOUSEKEEPER" -> CleaningStaffType.HOUSEKEEPER
        "CHAMBERMAID" -> CleaningStaffType.CLEANING_LADY
        else -> error("Invalid cleaning staff type: $cleaningStaffType")
    }
)

fun AuthenticationQuery.asUpstreamCleaningStaffAuth() = UpstreamNetworkCleaningStaffAuth(
    login = login,
    password = password,
)

// TODO("figure out the hierarchy, if any")

/*
fun NetworkCleaningStaff.asExternalHousekeeperModel() =
    if (cleaningStaffType == 1)
        error("Cannot convert CleaningLady from Network to Housekeeper")
    else
        Housekeeper(
            id = cleaningStaffId,
            employeeId = employeeId,
            name = name,
            cleaningStaffType = CleaningStaffType.HOUSEKEEPER,
        )

fun NetworkCleaningStaff.asExternalCleaningLadyModel() =
    if (cleaningStaffType == 0)
        error("Cannot convert Housekeeper from Network to CleaningLady")
    else
        CleaningLady(
            id = cleaningStaffId,
            employeeId = employeeId,
            name = name,
            cleaningStaffType = CleaningStaffType.CLEANING_LADY,
        )
*/
