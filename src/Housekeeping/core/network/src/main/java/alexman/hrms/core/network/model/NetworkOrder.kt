package alexman.hrms.core.network.model

data class OrderDetails(
    val cleaningLadyId: Int,
    val housekeeperId: Int,
    val orderData: String,
)

data class NetworkOrder (
    val id: Int,
    val orderDetails: OrderDetails,
)
