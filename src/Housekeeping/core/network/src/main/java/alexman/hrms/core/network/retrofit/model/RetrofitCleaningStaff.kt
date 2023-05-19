package alexman.hrms.core.network.retrofit.model

import alexman.hrms.core.network.model.NetworkCleaningStaff
import com.squareup.moshi.Json

data class RetrofitCleaningStaff(
    @Json(name = "employee_id") val employeeId: Int,
    @Json(name = "name") val name: String,
    @Json(name = "type") val cleaningStaffType: String,
) {
    internal fun asNetworkCleaningStaff() = NetworkCleaningStaff(
        employeeId = employeeId,
        name = name,
        cleaningStaffType = cleaningStaffType,
    )
}
