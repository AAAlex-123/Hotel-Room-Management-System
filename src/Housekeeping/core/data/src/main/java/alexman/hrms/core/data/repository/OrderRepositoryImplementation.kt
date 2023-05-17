package alexman.hrms.core.data.repository

import alexman.hrms.core.data.model.asExternalModel
import alexman.hrms.core.data.model.asUpstreamNetworkOrderDetails
import alexman.hrms.core.model.data.Order
import alexman.hrms.core.model.data.UpstreamOrderDetails
import alexman.hrms.core.network.HrmsNetworkDataSource
import alexman.hrms.core.network.model.NetworkOrder
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.MutableStateFlow

class OrderRepositoryImplementation (
    private val datasource: HrmsNetworkDataSource,
) : OrderRepository {

    /* TODO("figure out automatic updates")
     * - add automatic polling for data (see `refresh()`)
     * - maybe add some diffing when getting data to update only the necessary flows?
     */

    private val orderCache = OrderCache(datasource)

    private val flowMap: MutableMap<OrderQuery, MutableStateFlow<List<Order>>> = mutableMapOf()

    override suspend fun getOrders(query: OrderQuery): Flow<List<Order>> {
        if (!flowMap.containsKey(query)) {
            val orders = getFilteredOrdersFromCacheForNewQuery(query)
            flowMap[query] = MutableStateFlow(orders)
        }

        return flowMap[query]!! // safe because of if statement above
    }

    override suspend fun placeOrder(upstreamOrderDetails: UpstreamOrderDetails) {

        val response = /* withContext(ioDispatcher) { */
            datasource.placeOrder(
                upstreamOrderDetails.asUpstreamNetworkOrderDetails()
            )
        /* } */

        if (response.ok) {
            val newOrder = response.body!!.asExternalModel()
            orderCache.placeOrder(newOrder)
            updateFlowsAffectedByOrder(newOrder)
        } else {
            TODO("figure out what to do on POST error")
        }
    }

    override suspend fun deleteOrder(orderId: Int) {
        val response = /* withContext(ioDispatcher) { */
                datasource.deleteOrder(orderId)
        /* } */

        if (response.ok) {
            val deletedOrder = orderCache.deleteOrder(orderId)
            updateFlowsAffectedByOrder(deletedOrder)
        } else {
            TODO("figure out what to do on DELETE error")
        }
    }

    private suspend fun getFilteredOrdersFromCacheForNewQuery(query: OrderQuery): List<Order> {
        return orderCache.getFilteredOrdersForNewQuery(query)
    }

    private fun getFilteredOrdersFromCacheForExistingQuery(query: OrderQuery): List<Order> {
        return orderCache.getFilteredOrdersForExistingQuery(query)
    }

    private fun updateFlowsAffectedByOrder(order: Order) {
        flowMap.forEach { (orderQuery, mutableStateFlow) ->
            if (orderQuery.matches(order))
                mutableStateFlow.value = getFilteredOrdersFromCacheForExistingQuery(orderQuery)
        }
    }

    private suspend fun refresh() {
        /* TODO("figure out algorithm")
            - val orderDiffList = orderCache.refreshAndGetDiff()
            - orderDiffList.forEach { updateFlowsAffectedByOrder(it) }
         */
    }

    private class OrderCache(
        private val datasource: HrmsNetworkDataSource,
    ) {

        private val querySet: MutableSet<OrderQuery> = mutableSetOf()

        private val orderMap: MutableMap<Int, Order> = mutableMapOf()

        // TODO("figure out where to call this and how it will work")
        suspend fun refresh/*AndGetDiff*/() /*: List<Order> */ {
            // TODO("figure out to diff or not to diff")
            querySet.forEach {
                updateMapWithOrdersFromQuery(it)
            }
        }

        suspend fun getFilteredOrdersForNewQuery(query: OrderQuery): List<Order> {
            if (querySet.contains(query)) {
                error("Query $query already exists in cache")
            }

            querySet.add(query)
            updateMapWithOrdersFromQuery(query)
            return getFilteredOrdersForExistingQuery(query)
        }

        fun placeOrder(order: Order) {
            orderMap[order.id] = order
        }

        fun deleteOrder(orderId: Int): Order {
            return orderMap.remove(orderId)!!
        }

        fun getFilteredOrdersForExistingQuery(query: OrderQuery): List<Order> {
            if (!querySet.contains(query)) {
                error("Query $query does not exist in cache")
            }

            return orderMap.values
                .filter { query.matches(it) }
        }

        private suspend fun updateMapWithOrdersFromQuery(query: OrderQuery) {
            val response = datasource.getOrders(query.cleaningLadyId)

            if (response.ok) {
                response.body!!
                    .map(NetworkOrder::asExternalModel)
                    .forEach { orderMap[it.id] = it }
            } else {
                // TODO("figure out what to do on GET error. Maybe just return false?")
            }
        }
    }
}
