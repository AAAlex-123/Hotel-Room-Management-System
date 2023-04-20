package alexman.hrms.core.network

import alexman.hrms.core.network.model.NetworkOrder
import alexman.hrms.core.network.model.NetworkRoom
import alexman.hrms.core.network.model.OrderDetails

interface HrmsNetworkDataSource {

    suspend fun getRooms(cleaningLadyId: Int? = null): List<NetworkRoom>

    suspend fun updateRoom(room: NetworkRoom)

    suspend fun getOrders(cleaningLadyId: Int? = null, housekeeperId: Int? = null):
            List<NetworkOrder>

    suspend fun placeOrder(order: OrderDetails)
}
