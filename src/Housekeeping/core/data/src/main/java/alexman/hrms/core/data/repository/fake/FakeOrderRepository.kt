package alexman.hrms.core.data.repository.fake

import alexman.hrms.core.data.repository.OrderQuery
import alexman.hrms.core.data.repository.OrderRepository
import alexman.hrms.core.model.data.Order
import alexman.hrms.core.model.data.OrderStatus
import alexman.hrms.core.model.data.UpstreamOrderDetails
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.MutableStateFlow
import java.lang.Integer.max

class FakeOrderRepository : OrderRepository {

    private val orders = mutableMapOf(
        1 to Order(1, OrderStatus.PENDING, 1, "AAA"),
        2 to Order(2, OrderStatus.PENDING, 1, "BBB"),
        3 to Order(3, OrderStatus.COMPLETED, 2, "CCC"),
        4 to Order(4, OrderStatus.PENDING, 2, "DDD"),
        5 to Order(5, OrderStatus.COMPLETED, 1, "EEE"),
    )

    private val flows: MutableMap<OrderQuery, MutableStateFlow<List<Order>>> = mutableMapOf()

    private fun getFilteredOrders(query: OrderQuery): List<Order> {
        return orders.values
            .filter { query.matches(it) }
            .toList()
    }

    private fun updateFlowsAffectedByOrder(order: Order) {
        flows.forEach { (orderQuery, mutableStateFlow) ->
            if (orderQuery.matches(order))
                mutableStateFlow.value = getFilteredOrders(orderQuery)
        }
    }

    override fun getOrders(query: OrderQuery): Flow<List<Order>> {
        if (!flows.containsKey(query)) {
            val orders = getFilteredOrders(query)
            flows[query] = MutableStateFlow(orders)
        }

        return flows[query]!!
    }

    override suspend fun placeOrder(upstreamOrderDetails: UpstreamOrderDetails) {

        val newId = orders.values.map { it.id }.reduce(::max) + 1

        with (upstreamOrderDetails) {
            val order = Order(
                newId,
                completed = OrderStatus.PENDING,
                cleaningLadyId = this.cleaningLadyId,
                orderData = this.orderData.trim(),
            )

            orders[newId] = order
            updateFlowsAffectedByOrder(order)
        }
    }

    override suspend fun deleteOrder(orderId: Int) {
        val removedOrder = orders.remove(orderId)!!
        updateFlowsAffectedByOrder(removedOrder)
    }
}
