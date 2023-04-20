package alexman.hrms.core.model.data

data class Order(
    val id: Int,
    val cleaningLadyId: Int,
    val housekeeperId: Int,
    val orderData: String,
)
