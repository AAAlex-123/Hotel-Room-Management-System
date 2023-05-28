package alexman.hrms.core.network.retrofit.model

import alexman.hrms.core.network.model.NetworkRoom
import alexman.hrms.core.network.model.UpstreamNetworkRoomUpdateDetails
import com.squareup.moshi.Json

data class RetrofitRoom(
    @Json(name = "room_id") val id: String,
    @Json(name = "clean_state") val cleanState: String,
    @Json(name = "occupied") val occupied: Boolean,
    @Json(name = "clean_type") val cleanType: String,
) {
    internal fun asNetworkRoom() = NetworkRoom(
        id = id,
        cleanState = cleanState,
        occupied = occupied,
        cleanType = cleanType,
    )
}

data class RetrofitRoomBody(
    val clean_state: String,
)

internal fun UpstreamNetworkRoomUpdateDetails.asRetrofitRoomBody() =
    RetrofitRoomBody(
        clean_state = cleanState,
    )
