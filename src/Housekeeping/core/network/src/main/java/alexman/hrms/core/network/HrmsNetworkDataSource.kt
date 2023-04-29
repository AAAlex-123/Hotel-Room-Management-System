package alexman.hrms.core.network

import alexman.hrms.core.network.model.*

interface HrmsNetworkDataSource {

    suspend fun getRooms(cleaningLadyId: Int? = null): List<NetworkRoom>

    suspend fun updateRoom(room: NetworkRoom)

    suspend fun getNotes(roomId: Int): List<NetworkNote>

    suspend fun addNote(upstreamNetworkNoteDetails: UpstreamNetworkNoteDetails)

    suspend fun getOrders(cleaningLadyId: Int? = null, housekeeperId: Int? = null):
            List<NetworkOrder>

    suspend fun placeOrder(upstreamNetworkOrderDetails: UpstreamNetworkOrderDetails)
}
