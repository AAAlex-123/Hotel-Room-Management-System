package alexman.hrms.core.data.repository

import alexman.hrms.core.model.data.Order
import alexman.hrms.core.model.data.UpstreamOrderDetails
import alexman.hrms.core.model.data.UpstreamOrderUpdateDetails
import kotlinx.coroutines.flow.Flow

data class OrderQuery(
    val cleaningLadyIds: List<Int>,
) {
    constructor(cleaningLadyId: Int) : this(listOf(cleaningLadyId))

    fun matches(order: Order): Boolean = cleaningLadyIds.contains(order.cleaningLadyId)
}

interface OrderRepository {

    suspend fun getOrders(query: OrderQuery): Flow<List<Order>>

    suspend fun placeOrder(upstreamOrderDetails: UpstreamOrderDetails)

    suspend fun deleteOrder(orderId: Int)

    suspend fun updateOrderState(upstreamOrderUpdateDetails: UpstreamOrderUpdateDetails)
}
