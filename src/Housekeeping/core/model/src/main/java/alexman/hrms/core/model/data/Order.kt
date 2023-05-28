package alexman.hrms.core.model.data

data class UpstreamOrderDetails(
    val cleaningLadyId: Int,
    val orderData: String,
)

enum class OrderStatus {
    PENDING, COMPLETED
}

data class UpstreamOrderUpdateDetails(
    val id: Int,
    val completed: OrderStatus,
)

data class Order(
    val id: Int,
    val completed: OrderStatus,
    val cleaningLadyId: Int,
    val orderData: String,
)
