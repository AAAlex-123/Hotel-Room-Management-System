package alexman.hrms.core.network.retrofit.model

import alexman.hrms.core.network.model.NetworkOrder
import alexman.hrms.core.network.model.UpstreamNetworkOrderDetails
import com.squareup.moshi.Json

data class RetrofitOrder(
    @Json(name = "provision_id") val id: Int,
    @Json(name = "complete") val completed: Boolean,
    @Json(name = "employee_id") val cleaningLadyId: Int,
    @Json(name = "description") val orderData: String,
) {
    fun asNetworkOrder() = NetworkOrder(
        id = id,
        completed = completed,
        cleaningLadyId = cleaningLadyId,
        orderData = orderData,
    )
}

data class RetrofitOrderBody(
    val employee_id: Int,
    val description: String,
)

fun UpstreamNetworkOrderDetails.asRetrofitOrderBody() =
    RetrofitOrderBody(
        employee_id = cleaningLadyId,
        description = orderData,
    )
