package alexman.hrms.core.data.repository

import alexman.hrms.core.model.data.Order
import alexman.hrms.core.model.data.UpstreamOrderDetails
import kotlinx.coroutines.flow.Flow

data class OrderQuery(
    val cleaningLadyId: Int,
) {
    fun matches(order: Order): Boolean = order.cleaningLadyId == cleaningLadyId
}

interface OrderRepository {

    suspend fun getOrders(query: OrderQuery): Flow<List<Order>>

    suspend fun placeOrder(upstreamOrderDetails: UpstreamOrderDetails)

    suspend fun deleteOrder(orderId: Int)
}