package alexman.hrms.core.model.data

data class Order(
    val id: Int,
    val completed: Boolean,
    val orderData: String,
)
