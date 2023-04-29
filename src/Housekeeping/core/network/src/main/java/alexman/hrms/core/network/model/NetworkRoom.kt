package alexman.hrms.core.network.model

data class NetworkRoom(
    val id: Int,
    val cleanState: Int,
    val occupied: Boolean,
    val cleanType: Int,
)
