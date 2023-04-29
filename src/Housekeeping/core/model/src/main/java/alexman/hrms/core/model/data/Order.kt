package alexman.hrms.core.model.data

data class UpstreamOrderDetails(
    val cleaningLadyId: Int,
    val housekeeperId: Int,
    val orderData: String,
)

enum class OrderStatus {
    PENDING, COMPLETED
}

data class Order(
    val id: Int,
    val completed: OrderStatus,
    val orderData: String,
)
