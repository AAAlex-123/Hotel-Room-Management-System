package alexman.hrms.core.network

import alexman.hrms.core.network.model.*

interface HrmsNetworkDataSource {

    suspend fun authenticate(login: String, password: String): String?

    suspend fun getCleaningStaff(cleaningStaffId: Int): NetworkCleaningStaff

    suspend fun getOrders(cleaningLadyId: Int? = null): List<NetworkOrder>

    suspend fun placeOrder(upstreamNetworkOrderDetails: UpstreamNetworkOrderDetails)

    suspend fun deleteOrder(orderId: Int)

    suspend fun getRooms(cleaningLadyId: Int? = null): List<NetworkRoom>

    suspend fun updateRoom(room: NetworkRoom)

    suspend fun getNotes(roomId: Int): List<NetworkNote>

    suspend fun addNote(upstreamNetworkNoteDetails: UpstreamNetworkNoteDetails)

}
