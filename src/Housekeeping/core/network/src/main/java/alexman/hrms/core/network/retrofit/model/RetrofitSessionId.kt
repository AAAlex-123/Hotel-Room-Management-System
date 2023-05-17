package alexman.hrms.core.network.retrofit.model

import com.squareup.moshi.Json

data class RetrofitAuthResult(
    @Json(name = "employee_id") val staffId: Int,
    @Json(name = "access_token") val sessionId: String,
) {
    fun asCleaningStaffId(): Int = staffId
}
