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

    private val registeredStaffMap = mapOf(
        1 to ("login1" to "password1"),
        2 to ("login2" to "password2"),
        3 to ("login3" to "password3"),
    )

    private val sessionIdMap = mutableMapOf<String, String>()

    private val cleaningStaffMap = mapOf(
        1 to NetworkCleaningStaff(1, 10, "Alice", 1),
        2 to NetworkCleaningStaff(2, 11, "Bob", 1),
        3 to NetworkCleaningStaff(3, 12, "Charlie", 1),
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

        // TODO("store sessionId")

        return sessionId
    }

    override suspend fun getCleaningStaff(cleaningStaffId: Int): NetworkCleaningStaff {
        return cleaningStaffMap[cleaningStaffId]!!
    }

    override suspend fun placeOrder(upstreamNetworkOrderDetails: UpstreamNetworkOrderDetails) {
        TODO("Not yet implemented")
    }

    override suspend fun deleteOrder(orderId: Int) {
        TODO("Not yet implemented")
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

    override suspend fun getOrders(cleaningLadyId: Int?, housekeeperId: Int?): List<NetworkOrder> {
        TODO("Not yet implemented")
    }
}
