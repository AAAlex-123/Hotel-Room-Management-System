package alexman.hrms.core.network

import alexman.hrms.core.network.model.NetworkOrder
import alexman.hrms.core.network.model.OrderDetails

interface HrmsNetworkDataSource {

    suspend fun getOrders(cleaningLadyId: Int? = null, housekeeperId: Int? = null):
            List<NetworkOrder>

    suspend fun placeOrder(order: OrderDetails)
}
