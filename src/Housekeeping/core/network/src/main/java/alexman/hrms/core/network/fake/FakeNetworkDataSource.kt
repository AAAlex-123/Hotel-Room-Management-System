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
import alexman.hrms.core.network.model.UpstreamNetworkRoomUpdateDetails
import java.util.UUID

class FakeNetworkDataSource : HrmsNetworkDataSource {

    private val registeredStaffMap: Map<Int, Pair<String, String>> = mapOf(
        1 to ("login1" to "password1"),
        2 to ("login2" to "password2"),
        3 to ("login3" to "password3"),
    )

    private val sessionIdMap: MutableMap<String, String> = mutableMapOf()

    private val cleaningStaffMap: Map<Int, NetworkCleaningStaff> = mapOf(
        1 to NetworkCleaningStaff(1, "Alice", "CHAMBERMAID"),
        2 to NetworkCleaningStaff(2, "Bob", "CHAMBERMAID"),
        3 to NetworkCleaningStaff(3, "Charlie", "CHAMBERMAID"),
    )

    private val orderMap: MutableMap<Int, NetworkOrder> = mutableMapOf(
        1 to NetworkOrder(1, false, 1, "Alice's order 1"),
        2 to NetworkOrder(2, false, 1, "Alice's order 2"),
        3 to NetworkOrder(3, true, 2, "Bob's order 1"),
        4 to NetworkOrder(4, false, 2, "Bob's order 2"),
        5 to NetworkOrder(5, true, 1, "Alice's order 3"),
    )

    private val roomMap: MutableMap<Int, NetworkRoom> = mutableMapOf(
        101 to NetworkRoom(101, 0, true, 0),
        102 to NetworkRoom(102, 1, true, 1),
        103 to NetworkRoom(103, 2, false, 0),
        104 to NetworkRoom(104, 3, false, 0),
        105 to NetworkRoom(105, 4, false, 1),
    )

    private val noteMap: MutableMap<Int, NetworkNote> = mutableMapOf(
        1 to NetworkNote(1, 101, 1, "room 123, note 1, cl 1"),
        2 to NetworkNote(2, 101, 2, "room 123, note 2, cl 2"),
        3 to NetworkNote(3, 101, 1, "room 123, note 3, cl 1"),
    )

    private val cleaningStaffRoomMap: Map<Int, List<Int>> = mapOf(
        1 to listOf(101, 102, 103, 104, 105),
    )

    override suspend fun authenticate(upstreamNetworkCleaningStaffAuth: UpstreamNetworkCleaningStaffAuth):
            HrmsNetworkResponse<Int> {
        with(upstreamNetworkCleaningStaffAuth) {
            val sessionId = if (sessionIdMap.contains(login))
                sessionIdMap[login]
            else if (registeredStaffMap.values.contains(login to password))
                UUID.randomUUID().toString().also {
                    sessionIdMap[login] = it
                }
            else
                null

            val success = sessionId != null

            if (sessionId != null)
                sessionIdMap[login] = sessionId

            return HrmsNetworkResponse(
                code = if (success) 200 else 400,
                body = if (success)
                    registeredStaffMap.keys.first {
                        registeredStaffMap[it] == login to password
                    }
                else
                    null,
                errorBody = null,
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
        with(upstreamNetworkOrderDetails) {
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

    override suspend fun deleteOrder(orderId: Int): HrmsNetworkResponse<Any> {
        orderMap.remove(orderId)

        return HrmsNetworkResponse(
            200,
            null,
            null,
        )
    }

    override suspend fun getRooms(cleaningLadyId: Int): HrmsNetworkResponse<List<NetworkRoom>> {
        val rooms = cleaningStaffRoomMap[cleaningLadyId]!!.map { roomMap[it]!! }

        return HrmsNetworkResponse(
            200,
            rooms,
            null,
        )
    }

    override suspend fun getSingleRoom(roomId: Int): HrmsNetworkResponse<NetworkRoom> {
        return HrmsNetworkResponse(
            200,
            roomMap[roomId]!!,
            null,
        )
    }

    override suspend fun updateRoomState(upstreamNetworkRoomUpdateDetails: UpstreamNetworkRoomUpdateDetails):
            HrmsNetworkResponse<NetworkRoom> {
        return upstreamNetworkRoomUpdateDetails.let {
            roomMap[it.id] = roomMap[it.id]!!.copy(cleanState = it.cleanState)

            HrmsNetworkResponse(
                200,
                roomMap[it.id],
                null,
            )
        }
    }

    override suspend fun getNotes(roomId: Int): HrmsNetworkResponse<List<NetworkNote>> {
        val notes = noteMap.values
            .filter { it.roomId == roomId }

        return HrmsNetworkResponse(
            200,
            notes,
            null,
        )
    }

    override suspend fun addNote(upstreamNetworkNoteDetails: UpstreamNetworkNoteDetails): HrmsNetworkResponse<NetworkNote> {
        val newNote = with(upstreamNetworkNoteDetails) {
            val newNoteId = noteMap.values.map { it.id }.reduce(Integer::max) + 1
            NetworkNote(
                id = newNoteId,
                roomId = roomId,
                cleaningStaffId = cleaningStaffId,
                noteData = noteData,
            ).also {
                noteMap[newNoteId] = it
            }
        }

        return HrmsNetworkResponse(
            200,
            newNote,
            null,
        )
    }

    override suspend fun deleteNote(noteId: Int): HrmsNetworkResponse<Any> {
        noteMap.remove(noteId)

        return HrmsNetworkResponse(
            200,
            null,
            null,
        )
    }
}
