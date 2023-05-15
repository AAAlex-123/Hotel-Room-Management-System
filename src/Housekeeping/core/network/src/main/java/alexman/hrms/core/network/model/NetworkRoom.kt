package alexman.hrms.core.network.model

data class UpstreamNetworkRoomUpdateDetails(
    val id: Int,
    val cleanState: Int,
)

data class NetworkRoom(
    val id: Int,
    val cleanState: Int,
    val occupied: Boolean,
    val cleanType: Int,
)
