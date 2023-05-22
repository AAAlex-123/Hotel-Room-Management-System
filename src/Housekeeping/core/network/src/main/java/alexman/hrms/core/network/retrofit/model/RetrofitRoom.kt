package alexman.hrms.core.network.retrofit.model

import alexman.hrms.core.network.model.NetworkRoom
import alexman.hrms.core.network.model.UpstreamNetworkRoomUpdateDetails
import com.squareup.moshi.Json

data class RetrofitRoom(
    @Json(name = "room_id") val id: String,
    @Json(name = "clean_state") val cleanState: Int,
    @Json(name = "occupied") val occupied: Boolean,
    @Json(name = "clean_type") val cleanType: Int,
) {
    internal fun asNetworkRoom() = NetworkRoom(
        id = id,
        cleanState = cleanState,
        occupied = occupied,
        cleanType = cleanType,
    )
}

data class RetrofitRoomBody(
    val room_id: String,
    val clean_state: Int,
)

internal fun UpstreamNetworkRoomUpdateDetails.asRetrofitRoomBody() =
    RetrofitRoomBody(
        room_id = id,
        clean_state = cleanState,
    )
