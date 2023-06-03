package alexman.hrms.core.network.retrofit

import alexman.hrms.core.network.HrmsNetworkResponse
import alexman.hrms.core.network.model.UpstreamNetworkCleaningStaffAuth
import alexman.hrms.core.network.model.UpstreamNetworkNoteDetails
import alexman.hrms.core.network.model.UpstreamNetworkOrderDetails
import alexman.hrms.core.network.model.UpstreamNetworkOrderUpdateDetails
import alexman.hrms.core.network.model.UpstreamNetworkRoomUpdateDetails
import kotlinx.coroutines.runBlocking

// TODO("remove when done")
private fun main() {
    with (HrmsRetrofitNetworkDataSource()) {
        val roomId = "1"
        val cleaningStaffIdWithProvisions = 6

        var housekeeperId = req(http = "POST /auth") { authenticate(
            UpstreamNetworkCleaningStaffAuth(
                login = "username1",
                password = "login",
            )
        ) }.body!!
        req(http = "GET /employee/{id}") { getCleaningStaff(cleaningStaffId = housekeeperId) }
        req(http = "GET /chambermaid") { getCleaningLadies(housekeeperId = housekeeperId) }
        req(http = "GET /provision") { getOrders(cleaningLadyId = cleaningStaffIdWithProvisions) }
        var newOrderId = req(http = "POST /provision") { placeOrder(
            UpstreamNetworkOrderDetails(
                cleaningLadyId = cleaningStaffIdWithProvisions,
                orderData = "ORDER DATA",
            )
        ) }.body!!.id
        req(http = "PUT /provision/{id}") { updateOrderState(
            UpstreamNetworkOrderUpdateDetails(
                id = newOrderId,
                completed = true,
            )
        ) }
        var orderIdToDelete = req(http = "POST /provision") { placeOrder(
            UpstreamNetworkOrderDetails(
                cleaningLadyId = cleaningStaffIdWithProvisions,
                orderData = "ORDER DATA TO DELETE",
            )
        ) }.body!!.id
        req(http = "DELETE /provision/{id}") { deleteOrder(orderId = orderIdToDelete) }
        req(http = "GET /room") { getRooms(cleaningStaffId = housekeeperId) }
        req(http = "GET /room/{id}") { getSingleRoom(roomId = roomId) }
        req(http = "PUT /room/{id}") { updateRoomState(
            UpstreamNetworkRoomUpdateDetails(
                id = roomId,
                cleanState = "DIRTY",
            )
        ) }
        req(http = "GET /note") { getNotes(roomId = roomId) }
        req(http = "POST /note") { addNote(
            UpstreamNetworkNoteDetails(
                roomId = roomId,
                cleaningStaffId = housekeeperId,
                noteData = "NOTE DATA",
            )
        ) }.body!!.id
        var newNoteIdToDelete = req(http = "POST /note") { addNote(
            UpstreamNetworkNoteDetails(
                roomId = roomId,
                cleaningStaffId = housekeeperId,
                noteData = "NOTE DATA TO DELETE",
            )
        ) }.body!!.id
        req(http = "DELETE /note/{id}") { deleteNote(noteId = newNoteIdToDelete) }
    }
}

private fun <T> req(http: String, request: suspend () -> HrmsNetworkResponse<T>): HrmsNetworkResponse<T> {
    return runBlocking {
        request()
    }.also {
        print("\n\n---\nHTTP ${http}\nCode: ${it.code} (OK: ${it.ok})\nBody: ${it.body}\nErrorBody: ${it.errorBody}")
    }
}
