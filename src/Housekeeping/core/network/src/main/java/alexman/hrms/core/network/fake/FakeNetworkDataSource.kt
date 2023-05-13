package alexman.hrms.core.network.fake

import alexman.hrms.core.network.HrmsNetworkDataSource
import alexman.hrms.core.network.HrmsNetworkResponse
import alexman.hrms.core.network.model.NetworkCleaningStaff
import alexman.hrms.core.network.model.NetworkNote
import alexman.hrms.core.network.model.NetworkOrder
import alexman.hrms.core.network.model.NetworkRoom
import alexman.hrms.core.network.model.UpstreamNetworkCleaningStaffAuth
import alexman.hrms.core.network.model.UpstreamNetworkNoteDetails
import alexman.hrms.core.network.model.UpstreamNetworkOrderDetails
import java.util.UUID

class FakeNetworkDataSource : HrmsNetworkDataSource {

    private val registeredStaffMap: Map<Int, Pair<String, String>> = mapOf(
        1 to ("login1" to "password1"),
        2 to ("login2" to "password2"),
        3 to ("login3" to "password3"),
    )

    private val sessionIdMap: MutableMap<String, String> = mutableMapOf()

    private val cleaningStaffMap: Map<Int, NetworkCleaningStaff> = mapOf(
        1 to NetworkCleaningStaff(1, "Alice", "HOUSEKEEPER"),
        2 to NetworkCleaningStaff(2, "Bob", "HOUSEKEEPER"),
        3 to NetworkCleaningStaff(3, "Charlie", "HOUSEKEEPER"),
    )

    private val orderMap: MutableMap<Int, NetworkOrder> = mutableMapOf(
        1 to NetworkOrder(1, false, 1, "Alice's order 1"),
        2 to NetworkOrder(2, false, 1, "Alice's order 2"),
        3 to NetworkOrder(3, true, 2, "Bob's order 1"),
        4 to NetworkOrder(4, false, 2, "Bob's order 2"),
        5 to NetworkOrder(5, true, 1, "Alice's order 3"),
    )

    override suspend fun authenticate(upstreamNetworkCleaningStaffAuth: UpstreamNetworkCleaningStaffAuth):
            HrmsNetworkResponse<String> {
        with(upstreamNetworkCleaningStaffAuth) {
            val sessionId = if (sessionIdMap.contains(login))
                sessionIdMap[login]
            else if (registeredStaffMap.values.contains(login to password))
                UUID.randomUUID().toString().also {
                    sessionIdMap[login] = it
                }
            else
                null

            if (sessionId != null)
                sessionIdMap[login] = sessionId

            return HrmsNetworkResponse(
                200,
                sessionId,
                null,
            )
        }
    }

    override suspend fun getCleaningStaff(cleaningStaffId: Int):
            HrmsNetworkResponse<NetworkCleaningStaff> {
        val cleaningStaff = cleaningStaffMap[cleaningStaffId]!!
        return HrmsNetworkResponse(
            200,
            cleaningStaff,
            null,
        )
    }

    override suspend fun getOrders(cleaningLadyId: Int):
            HrmsNetworkResponse<List<NetworkOrder>> {
        val orders = orderMap.values
            .filter { it.cleaningLadyId == cleaningLadyId }
            .toList()
        return HrmsNetworkResponse(
            200,
            orders,
            null,
        )
    }

    override suspend fun placeOrder(upstreamNetworkOrderDetails: UpstreamNetworkOrderDetails):
            HrmsNetworkResponse<NetworkOrder> {
        with (upstreamNetworkOrderDetails) {
            val newOrderId = orderMap.values.map { it.id }.reduce(Integer::max) + 1
            val newOrder = NetworkOrder(
                id = newOrderId,
                completed = false,
                cleaningLadyId = this.cleaningLadyId,
                orderData = this.orderData.trim(),
            )

            orderMap[newOrderId] = newOrder

            return HrmsNetworkResponse(
                200,
                newOrder,
                null,
            )
        }
    }

    // TODO("return true/false to indicate successful/failed DELETE")
    override suspend fun deleteOrder(orderId: Int): HrmsNetworkResponse<Any> {
        /* return */ orderMap.remove(orderId) /* != null */
        return HrmsNetworkResponse(
            200,
            null,
            null,
        )
    }

    override suspend fun getRooms(cleaningLadyId: Int?): List<NetworkRoom> {
        TODO("Not yet implemented")
    }

    override suspend fun updateRoom(room: NetworkRoom) {
        TODO("Not yet implemented")
    }

    override suspend fun getNotes(roomId: Int): List<NetworkNote> {
        TODO("Not yet implemented")
    }

    override suspend fun addNote(upstreamNetworkNoteDetails: UpstreamNetworkNoteDetails) {
        TODO("Not yet implemented")
    }
}
