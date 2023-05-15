package alexman.hrms.core.network.retrofit

import alexman.hrms.core.network.HrmsNetworkDataSource
import alexman.hrms.core.network.HrmsNetworkResponse
import alexman.hrms.core.network.model.NetworkCleaningStaff
import alexman.hrms.core.network.model.NetworkNote
import alexman.hrms.core.network.model.NetworkOrder
import alexman.hrms.core.network.model.NetworkRoom
import alexman.hrms.core.network.model.UpstreamNetworkCleaningStaffAuth
import alexman.hrms.core.network.model.UpstreamNetworkNoteDetails
import alexman.hrms.core.network.model.UpstreamNetworkOrderDetails
import alexman.hrms.core.network.model.UpstreamNetworkRoomUpdateDetails
import alexman.hrms.core.network.retrofit.model.asRetrofitCleaningStaffAuthBody
import alexman.hrms.core.network.retrofit.model.asRetrofitOrderBody
import retrofit2.Response

fun <T> Response<T>.asHrmsNetworkResponse() =
    HrmsNetworkResponse(
        code = this.code(),
        body = this.body(),
        errorBody = this.errorBody()?.string()
    )

fun <T, U> Response<T>.asHrmsNetworkResponse(map: (T?) -> U?) =
    HrmsNetworkResponse(
        code = this.code(),
        body = map(this.body()),
        errorBody = this.errorBody()?.string()
    )

class HrmsRetrofitNetworkDataSource: HrmsNetworkDataSource {

    // TODO("store sessionId somewhere and use it inside header of other requests")
    override suspend fun authenticate(upstreamNetworkCleaningStaffAuth: UpstreamNetworkCleaningStaffAuth):
            HrmsNetworkResponse<String> =
        HrmsRetrofitInstance.api.authenticate(
            upstreamNetworkCleaningStaffAuth.asRetrofitCleaningStaffAuthBody()
        ).asHrmsNetworkResponse {
            it?.sessionId
        }

    override suspend fun getCleaningStaff(cleaningStaffId: Int):
            HrmsNetworkResponse<NetworkCleaningStaff> =
        HrmsRetrofitInstance.api.getCleaningStaff(cleaningStaffId).asHrmsNetworkResponse {
            it?.asNetworkCleaningStaff()
        }

    override suspend fun getOrders(cleaningLadyId: Int):
            HrmsNetworkResponse<List<NetworkOrder>> =
        HrmsRetrofitInstance.api.getOrders(cleaningLadyId).asHrmsNetworkResponse {
            it?.map {
                it.asNetworkOrder()
            }
        }

    override suspend fun placeOrder(upstreamNetworkOrderDetails: UpstreamNetworkOrderDetails):
            HrmsNetworkResponse<NetworkOrder> =
        HrmsRetrofitInstance.api.postOrder(upstreamNetworkOrderDetails.asRetrofitOrderBody())
            .asHrmsNetworkResponse {
                it?.asNetworkOrder()
            }

    override suspend fun deleteOrder(orderId: Int):
            HrmsNetworkResponse<Any> =
        HrmsRetrofitInstance.api.deleteOrder(orderId).asHrmsNetworkResponse()

    override suspend fun getSingleRoom(roomId: Int): HrmsNetworkResponse<NetworkRoom> {
        TODO("Not yet implemented")
    }

    override suspend fun getRooms(cleaningLadyId: Int):
            HrmsNetworkResponse<List<NetworkRoom>> {
        TODO("Not yet implemented")
    }

    override suspend fun updateRoomState(upstreamNetworkRoomUpdateDetails: UpstreamNetworkRoomUpdateDetails): HrmsNetworkResponse<Any> {
        TODO("Not yet implemented")
    }

    override suspend fun getNotes(roomId: Int): HrmsNetworkResponse<List<NetworkNote>> {
        TODO("Not yet implemented")
    }

    override suspend fun addNote(upstreamNetworkNoteDetails: UpstreamNetworkNoteDetails):
        HrmsNetworkResponse<NetworkNote> {
        TODO("Not yet implemented")
    }

    override suspend fun deleteNote(noteId: Int): HrmsNetworkResponse<Any> {
        TODO("Not yet implemented")
    }
}