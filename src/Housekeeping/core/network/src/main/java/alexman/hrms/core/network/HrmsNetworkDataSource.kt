package alexman.hrms.core.network

import alexman.hrms.core.network.model.*

interface HrmsNetworkDataSource {

    suspend fun authenticate(upstreamNetworkCleaningStaffAuth: UpstreamNetworkCleaningStaffAuth):
            HrmsNetworkResponse<Int>

    suspend fun getCleaningStaff(cleaningStaffId: Int):
            HrmsNetworkResponse<NetworkCleaningStaff>

    suspend fun getOrders(cleaningLadyId: Int):
            HrmsNetworkResponse<List<NetworkOrder>>

    suspend fun placeOrder(upstreamNetworkOrderDetails: UpstreamNetworkOrderDetails):
            HrmsNetworkResponse<NetworkOrder>

    suspend fun deleteOrder(orderId: Int):
            HrmsNetworkResponse<Any> // only status code needed

    suspend fun getRooms(cleaningLadyId: Int):
            HrmsNetworkResponse<List<NetworkRoom>>

    suspend fun getSingleRoom(roomId: Int):
            HrmsNetworkResponse<NetworkRoom>

    suspend fun updateRoomState(upstreamNetworkRoomUpdateDetails: UpstreamNetworkRoomUpdateDetails):
            HrmsNetworkResponse<NetworkRoom>

    suspend fun getNotes(roomId: Int):
            HrmsNetworkResponse<List<NetworkNote>>

    suspend fun addNote(upstreamNetworkNoteDetails: UpstreamNetworkNoteDetails):
            HrmsNetworkResponse<NetworkNote>

    suspend fun deleteNote(noteId: Int):
            HrmsNetworkResponse<Any>
}
