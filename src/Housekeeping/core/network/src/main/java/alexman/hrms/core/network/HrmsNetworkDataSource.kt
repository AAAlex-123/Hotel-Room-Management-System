package alexman.hrms.core.network

import alexman.hrms.core.network.model.NetworkCleaningStaff
import alexman.hrms.core.network.model.NetworkNote
import alexman.hrms.core.network.model.NetworkOrder
import alexman.hrms.core.network.model.NetworkRoom
import alexman.hrms.core.network.model.UpstreamNetworkCleaningStaffAuth
import alexman.hrms.core.network.model.UpstreamNetworkNoteDetails
import alexman.hrms.core.network.model.UpstreamNetworkOrderDetails
import alexman.hrms.core.network.model.UpstreamNetworkOrderUpdateDetails
import alexman.hrms.core.network.model.UpstreamNetworkRoomUpdateDetails

data class HrmsNetworkResponse<T>(
    val code: Int,
    val body: T?,
) {
    val ok: Boolean = (200 <= code) && (code < 300)
}

interface HrmsNetworkDataSource {

    suspend fun authenticate(upstreamNetworkCleaningStaffAuth: UpstreamNetworkCleaningStaffAuth):
            HrmsNetworkResponse<Int>

    suspend fun getCleaningStaff(cleaningStaffId: Int):
            HrmsNetworkResponse<NetworkCleaningStaff>

    suspend fun getCleaningLadies(housekeeperId: Int):
            HrmsNetworkResponse<List<NetworkCleaningStaff>>

    suspend fun getOrders(cleaningLadyId: Int):
            HrmsNetworkResponse<List<NetworkOrder>>

    suspend fun placeOrder(upstreamNetworkOrderDetails: UpstreamNetworkOrderDetails):
            HrmsNetworkResponse<NetworkOrder>

    suspend fun updateOrderState(upstreamNetworkOrderUpdateDetails: UpstreamNetworkOrderUpdateDetails):
            HrmsNetworkResponse<NetworkOrder>

    suspend fun deleteOrder(orderId: Int):
            HrmsNetworkResponse<Any> // only status code needed

    suspend fun getRooms(cleaningStaffId: Int):
            HrmsNetworkResponse<List<NetworkRoom>>

    suspend fun getSingleRoom(roomId: String):
            HrmsNetworkResponse<NetworkRoom>

    suspend fun updateRoomState(upstreamNetworkRoomUpdateDetails: UpstreamNetworkRoomUpdateDetails):
            HrmsNetworkResponse<NetworkRoom>

    suspend fun getNotes(roomId: String):
            HrmsNetworkResponse<List<NetworkNote>>

    suspend fun addNote(upstreamNetworkNoteDetails: UpstreamNetworkNoteDetails):
            HrmsNetworkResponse<NetworkNote>

    suspend fun deleteNote(noteId: Int):
            HrmsNetworkResponse<Any> // only status code needed
}
