package alexman.hrms.core.network.retrofit.model

import alexman.hrms.core.network.model.UpstreamNetworkCleaningStaffAuth
import com.squareup.moshi.Json

data class RetrofitAuthResult(
    @Json(name = "employee_id") val staffId: Int,
    @Json(name = "access_token") val sessionId: String,
) {
    internal fun asCleaningStaffId(): Int = staffId
}

data class RetrofitAuthBody(
    val login: String,
    val password: String,
)

internal fun UpstreamNetworkCleaningStaffAuth.asRetrofitCleaningStaffAuthBody() =
    RetrofitAuthBody(
        login = login,
        password = password,
    )
