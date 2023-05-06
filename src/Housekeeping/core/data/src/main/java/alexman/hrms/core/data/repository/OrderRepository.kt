package alexman.hrms.core.data.repository

import alexman.hrms.core.model.data.Order
import alexman.hrms.core.model.data.UpstreamOrderDetails
import kotlinx.coroutines.flow.Flow

data class OrderQuery(
    val cleaningLadyId: Int? = null,
    val housekeeperId: Int? = null,
) {
    fun matches(order: Order): Boolean =
        (cleaningLadyId == null || order.cleaningLadyId == cleaningLadyId)
}

interface OrderRepository {

    fun getOrders(query: OrderQuery): Flow<List<Order>>

    suspend fun placeOrder(upstreamOrderDetails: UpstreamOrderDetails)

    suspend fun deleteOrder(orderId: Int)
}
