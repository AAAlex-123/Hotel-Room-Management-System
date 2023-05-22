package alexman.hrms.core.network.model

data class UpstreamNetworkRoomUpdateDetails(
    val id: String,
    val cleanState: Int,
)

data class NetworkRoom(
    val id: String,
    val cleanState: Int,
    val occupied: Boolean,
    val cleanType: Int,
)
