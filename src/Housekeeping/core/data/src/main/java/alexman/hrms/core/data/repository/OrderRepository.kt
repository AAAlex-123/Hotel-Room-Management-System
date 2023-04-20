package alexman.hrms.core.data.repository

import alexman.hrms.core.model.data.Order
import alexman.hrms.core.network.model.OrderDetails
import kotlinx.coroutines.flow.Flow

data class OrderQuery(
    val cleaningLadyId: Int? = null,
    val housekeeperId: Int? = null,
)

interface OrderRepository {

    fun getOrders(query: OrderQuery): Flow<List<Order>>

    suspend fun placeOrder(orderDetails: OrderDetails)
}
