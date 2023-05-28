package alexman.hrms.core.network.model

data class UpstreamNetworkOrderDetails(
    val cleaningLadyId: Int,
    val orderData: String,
)

data class UpstreamNetworkOrderUpdateDetails(
    val id: Int,
    val completed: Boolean,
)

data class NetworkOrder(
    val id: Int,
    val completed: Boolean,
    val cleaningLadyId: Int,
    val orderData: String,
)
