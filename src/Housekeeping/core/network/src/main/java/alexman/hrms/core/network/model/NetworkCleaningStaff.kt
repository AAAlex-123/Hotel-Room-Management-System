package alexman.hrms.core.network.model

data class UpstreamNetworkCleaningStaffAuth(
    val login: String,
    val password: String,
)

data class NetworkCleaningStaff(
    val employeeId: Int,
    val name: String,
    val cleaningStaffType: String,
)
