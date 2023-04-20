package alexman.hrms.core.data.repository

import alexman.hrms.core.data.model.asExternalModel
import alexman.hrms.core.model.data.Order
import alexman.hrms.core.network.HrmsNetworkDataSource
import alexman.hrms.core.network.model.NetworkOrder
import alexman.hrms.core.network.model.OrderDetails
import kotlinx.coroutines.CoroutineDispatcher
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.flow
import kotlinx.coroutines.flow.flowOn
import kotlinx.coroutines.withContext

class OrderRepositoryImplementation (
    private val ioDispatcher: CoroutineDispatcher,
    private val datasource: HrmsNetworkDataSource,
) : OrderRepository {

    override fun getOrders(query: OrderQuery): Flow<List<Order>> =
        flow {
            emit(
                datasource.getOrders(query.cleaningLadyId, query.housekeeperId)
                    .map(NetworkOrder::asExternalModel),
            )
        }.flowOn(ioDispatcher)

    override suspend fun placeOrder(orderDetails: OrderDetails) =
        withContext(ioDispatcher) {
            datasource.placeOrder(orderDetails)
        }
}
