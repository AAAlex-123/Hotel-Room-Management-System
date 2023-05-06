package alexman.hrms.core.network.fake

import alexman.hrms.core.network.HrmsNetworkDataSource
import alexman.hrms.core.network.model.NetworkCleaningStaff
import alexman.hrms.core.network.model.NetworkNote
import alexman.hrms.core.network.model.NetworkOrder
import alexman.hrms.core.network.model.NetworkRoom
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
        1 to NetworkCleaningStaff(1, 10, "Alice", 1),
        2 to NetworkCleaningStaff(2, 11, "Bob", 1),
        3 to NetworkCleaningStaff(3, 12, "Charlie", 1),
    )

    private val orderMap: MutableMap<Int, NetworkOrder> = mutableMapOf(
        1 to NetworkOrder(1, false, 1, "Alice's order 1"),
        2 to NetworkOrder(2, false, 1, "Alice's order 2"),
        3 to NetworkOrder(3, true, 2, "Bob's order 1"),
        4 to NetworkOrder(4, false, 2, "Bob's order 2"),
        5 to NetworkOrder(5, true, 1, "Alice's order 3"),
    )

    override suspend fun authenticate(login: String, password: String): String? {
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

        return sessionId
    }

    override suspend fun getCleaningStaff(cleaningStaffId: Int): NetworkCleaningStaff {
        return cleaningStaffMap[cleaningStaffId]!!
    }

    override suspend fun getOrders(cleaningLadyId: Int?): List<NetworkOrder> {
        return orderMap.values
            .filter { cleaningLadyId == null || it.cleaningLadyId == cleaningLadyId }
            .toList()
    }

    // TODO("return the Network Order which resulted from this POST")
    override suspend fun placeOrder(upstreamNetworkOrderDetails: UpstreamNetworkOrderDetails) {
        with (upstreamNetworkOrderDetails) {
            val newOrderId = orderMap.values.map { it.id }.reduce(Integer::max) + 1
            val newOrder = NetworkOrder(
                id = newOrderId,
                completed = false,
                cleaningLadyId = this.cleaningLadyId,
                orderData = this.orderData.trim(),
            )

            orderMap[newOrderId] = newOrder

            /* return newOrder */
        }
    }

    // TODO("return true/false to indicate successful/failed DELETE")
    override suspend fun deleteOrder(orderId: Int) {
        /* return */ orderMap.remove(orderId) /* != null */
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
