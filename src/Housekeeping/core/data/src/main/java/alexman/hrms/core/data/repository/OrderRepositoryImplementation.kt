package alexman.hrms.core.data.repository

import alexman.hrms.core.data.model.asExternalModel
import alexman.hrms.core.data.model.asUpstreamNetworkOrderDetails
import alexman.hrms.core.data.model.asUpstreamNetworkOrderUpdateDetails
import alexman.hrms.core.model.data.Order
import alexman.hrms.core.model.data.UpstreamOrderDetails
import alexman.hrms.core.model.data.UpstreamOrderUpdateDetails
import alexman.hrms.core.network.HrmsNetworkDataSource
import kotlinx.coroutines.CoroutineDispatcher
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.async
import kotlinx.coroutines.delay
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.withContext
import kotlin.time.Duration

class OrderRepositoryImplementation(
    private val datasource: HrmsNetworkDataSource,
    private val ioDispatcher: CoroutineDispatcher,
    refreshPeriod: Duration,
) : OrderRepository {

    private fun startAutomaticUpdates(period: Duration) {

        val onAutomaticUpdate = suspend { doUpdate() }

        // https://stackoverflow.com/questions/54827455/how-to-implement-timer-with-kotlin-coroutines#answer-63939980
        val unused = CoroutineScope(ioDispatcher).async {
            while (true) {
                onAutomaticUpdate()
                delay(period)
            }
        }
    }

    private suspend fun doUpdate() {
        orderCache.refresh()

        flowMap.forEach { (orderQuery, mutableStateFlow) ->
            mutableStateFlow.value = getFilteredOrdersFromCacheForExistingQuery(orderQuery)
        }
    }

    private val orderCache = OrderCache(datasource, ioDispatcher)

    private val flowMap: MutableMap<OrderQuery, MutableStateFlow<List<Order>>> = mutableMapOf()

    init {
        startAutomaticUpdates(refreshPeriod)
    }

    override suspend fun getOrders(query: OrderQuery): Flow<List<Order>> {
        if (!flowMap.containsKey(query)) {
            val orders = getFilteredOrdersFromCacheForNewQuery(query)
            flowMap[query] = MutableStateFlow(orders)
        }

        return flowMap[query]!! // safe because of if statement above
    }

    override suspend fun placeOrder(upstreamOrderDetails: UpstreamOrderDetails) {

        val response = withContext(ioDispatcher) {
            datasource.placeOrder(
                upstreamOrderDetails.asUpstreamNetworkOrderDetails()
            )
        }

        if (response.ok) {
            val newOrder = response.body!!.asExternalModel()
            orderCache.placeOrder(newOrder)
            updateFlowsAffectedByOrder(newOrder)
        } else {
            TODO("figure out what to do on POST error")
        }
    }

    override suspend fun deleteOrder(orderId: Int) {

        val response = withContext(ioDispatcher) {
            datasource.deleteOrder(orderId)
        }

        if (response.ok) {
            val deletedOrder = orderCache.deleteOrder(orderId)
            updateFlowsAffectedByOrder(deletedOrder)
        } else {
            TODO("figure out what to do on DELETE error")
        }
    }

    override suspend fun updateOrderState(upstreamOrderUpdateDetails: UpstreamOrderUpdateDetails) {

        val response = withContext(ioDispatcher) {
            datasource.updateOrderState(
                upstreamOrderUpdateDetails.asUpstreamNetworkOrderUpdateDetails()
            )
        }

        if (response.ok) {
            val updatedOrder = response.body!!.asExternalModel()
            orderCache.updateOrder(updatedOrder)
            updateFlowsAffectedByOrder(updatedOrder)
        } else {
            TODO("figure out what to do on PUT error")
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

    private class OrderCache(
        private val datasource: HrmsNetworkDataSource,
        private val ioDispatcher: CoroutineDispatcher,
    ) {

        private val querySet: MutableSet<OrderQuery> = mutableSetOf()
        private val cleaningStaffIdToOrderIdsMap: MutableMap<Int, MutableList<Int>> = mutableMapOf()
        private val orderIdToOrderMap: MutableMap<Int, Order> = mutableMapOf()

        suspend fun refresh() {
            cleaningStaffIdToOrderIdsMap.clear()
            orderIdToOrderMap.clear()

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
            cleaningStaffIdToOrderIdsMap[order.cleaningLadyId]!!.add(order.id)
            orderIdToOrderMap[order.id] = order
        }

        fun deleteOrder(orderId: Int): Order {
            cleaningStaffIdToOrderIdsMap.values
                .forEach { orderIds -> orderIds.remove(orderId) }

            return orderIdToOrderMap.remove(orderId)!!
        }

        fun updateOrder(order: Order) {
            orderIdToOrderMap[order.id] = order
        }

        fun getFilteredOrdersForExistingQuery(query: OrderQuery): List<Order> {
            if (!querySet.contains(query)) {
                error("Query $query does not exist in cache")
            }

            return query.cleaningLadyIds
                .flatMap { cleaningStaffIdToOrderIdsMap[it]!! }
                .map(orderIdToOrderMap::getValue)
        }

        private suspend fun updateMapWithOrdersFromQuery(query: OrderQuery) {

            query.cleaningLadyIds.forEach { cleaningLadyId ->
                val response = withContext(ioDispatcher) {
                    datasource.getOrders(cleaningLadyId)
                }

                if (response.ok) {
                    cleaningStaffIdToOrderIdsMap[cleaningLadyId] = response.body!!
                        .map { networkOrder -> networkOrder.id }
                        .toMutableList()

                    response.body!!
                        .forEach { networkOrder ->
                            orderIdToOrderMap[networkOrder.id] = networkOrder.asExternalModel()
                        }
                } else {
                    // TODO("figure out what to do on GET error. Maybe just return false?")
                }
            }
        }
    }
}
