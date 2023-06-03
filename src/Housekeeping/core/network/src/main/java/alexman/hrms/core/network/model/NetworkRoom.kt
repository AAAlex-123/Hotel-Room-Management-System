package alexman.hrms.core.network.model

data class UpstreamNetworkRoomUpdateDetails(
    val id: String,
    val cleanState: String,
)

data class NetworkRoom(
    val id: String,
    val cleanState: String,
    val cleanable: Boolean,
    val cleanType: String,
)
