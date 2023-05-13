package alexman.hrms.core.network.retrofit.model

import com.squareup.moshi.Json

data class RetrofitSessionId(
    @Json(name = "access_token") val sessionId: String,
)
