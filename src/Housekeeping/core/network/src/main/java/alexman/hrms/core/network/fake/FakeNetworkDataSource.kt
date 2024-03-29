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
import alexman.hrms.core.network.model.UpstreamNetworkOrderUpdateDetails
import alexman.hrms.core.network.model.UpstreamNetworkRoomUpdateDetails
import java.util.UUID

// TODO("remove when done")
class FakeNetworkDataSource : HrmsNetworkDataSource {

    private val registeredStaffMap: Map<Int, Pair<String, String>> = mapOf(
        1 to ("login1" to "password1"),
        2 to ("login2" to "password2"),
        3 to ("login3" to "password3"),
    )

    private val sessionIdMap: MutableMap<String, String> = mutableMapOf()

    private val cleaningStaffMap: Map<Int, NetworkCleaningStaff> = mapOf(
        1 to NetworkCleaningStaff(1, "Alice", "HOUSEKEEPER"),
        2 to NetworkCleaningStaff(2, "Bob", "CHAMBERMAID"),
        3 to NetworkCleaningStaff(3, "Charlie", "CHAMBERMAID"),
    )

    private val housekeeperMap: Map<Int, List<Int>> = mapOf(
        1 to listOf(2, 3),
    )

    private val orderMap: MutableMap<Int, NetworkOrder> = mutableMapOf(
        1 to NetworkOrder(1, false, 2, "Bob's order 1"),
        2 to NetworkOrder(2, false, 2, "Bob's order 2"),
        3 to NetworkOrder(3, true, 3, "Charlie's order 1"),
        4 to NetworkOrder(4, false, 3, "Charlie's order 2"),
        5 to NetworkOrder(5, true, 2, "Bob's order 3"),
    )

    private val roomMap: MutableMap<String, NetworkRoom> = mutableMapOf(
        "101" to NetworkRoom("101", "DIRTY", true, "DAILY"),
        "102" to NetworkRoom("102", "PENDING", true, "DAILY"),
        "103" to NetworkRoom("103", "PENDING", false, "DEEP"),
        "104" to NetworkRoom("104", "CLEAN", false, "DAILY"),
        "105" to NetworkRoom("105", "CLEAN", false, "DEEP"),
    )

    private val noteMap: MutableMap<Int, NetworkNote> = mutableMapOf(
        1 to NetworkNote(1, "101", 2, "Bob: room 101, note 1"),
        2 to NetworkNote(2, "101", 3, "Charlie: room 101, note 2"),
        3 to NetworkNote(3, "101", 2, "Bob: room 101, note 3"),
        4 to NetworkNote(4, "103", 2, "Bob: room 103, note 4"),
        5 to NetworkNote(5, "103", 2, "Bob: room 103, note 5"),
    )

    private val cleaningLadyRoomMap: Map<Int, List<String>> = mapOf(
        2 to listOf("101", "102", "103", "105"),
        3 to listOf("101", "103", "104")
    )

    override suspend fun authenticate(upstreamNetworkCleaningStaffAuth: UpstreamNetworkCleaningStaffAuth):
            HrmsNetworkResponse<Int> {
        with(upstreamNetworkCleaningStaffAuth) {
            val sessionId = if (registeredStaffMap.values.contains(login to password))
                if (sessionIdMap.contains(login))
                    sessionIdMap[login]
                else
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
            )
        }
    }

    override suspend fun getCleaningStaff(cleaningStaffId: Int):
            HrmsNetworkResponse<NetworkCleaningStaff> {
        val cleaningStaff = cleaningStaffMap[cleaningStaffId]!!

        return HrmsNetworkResponse(
            200,
            cleaningStaff,
        )
    }

    override suspend fun getCleaningLadies(housekeeperId: Int):
            HrmsNetworkResponse<List<NetworkCleaningStaff>> {
        val cleaningLadies = housekeeperMap[housekeeperId]!!.map { id -> cleaningStaffMap[id]!! }

        return HrmsNetworkResponse(
            200,
            cleaningLadies,
        )
    }

    override suspend fun getOrders(cleaningLadyId: Int):
            HrmsNetworkResponse<List<NetworkOrder>> {

        val cleaningStaffType = cleaningStaffMap[cleaningLadyId]!!.cleaningStaffType

        val orders = when (cleaningStaffType) {
            "CHAMBERMAID" -> orderMap.values
                .filter { it.cleaningLadyId == cleaningLadyId }

            "HOUSEKEEPER" -> housekeeperMap[cleaningLadyId]!!
                .flatMap { cleaningLadyId ->
                    orderMap.values
                        .filter { order -> cleaningLadyId == order.cleaningLadyId }
                }

            else -> error("CleaningStaffType was $cleaningStaffType in getRooms")
        }

        return HrmsNetworkResponse(
            200,
            orders,
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
            )
        }
    }

    override suspend fun updateOrderState(upstreamNetworkOrderUpdateDetails: UpstreamNetworkOrderUpdateDetails):
            HrmsNetworkResponse<NetworkOrder> {
        return upstreamNetworkOrderUpdateDetails.let {
            orderMap[it.id] = orderMap[it.id]!!.copy(completed = it.completed)

            HrmsNetworkResponse(
                200,
                orderMap[it.id],
            )
        }
    }

    override suspend fun deleteOrder(orderId: Int):
            HrmsNetworkResponse<Any> {
        orderMap.remove(orderId)

        return HrmsNetworkResponse(
            200,
            null,
        )
    }

    override suspend fun getRooms(cleaningStaffId: Int):
            HrmsNetworkResponse<List<NetworkRoom>> {
        val cleaningStaffType = cleaningStaffMap[cleaningStaffId]!!.cleaningStaffType

        val rooms = when (cleaningStaffType) {
            "CHAMBERMAID" -> cleaningLadyRoomMap[cleaningStaffId]!!
                .map { roomMap[it]!! }

            "HOUSEKEEPER" -> housekeeperMap[cleaningStaffId]!!
                .flatMap { cleaningLady -> cleaningLadyRoomMap[cleaningLady]!! }
                .map { roomMap[it]!! }
                .distinctBy { it.id }
                .sortedBy { it.id }

            else -> error("CleaningStaffType was $cleaningStaffType in getRooms")
        }

        return HrmsNetworkResponse(
            200,
            rooms,
        )
    }

    override suspend fun getSingleRoom(roomId: String):
            HrmsNetworkResponse<NetworkRoom> {
        return HrmsNetworkResponse(
            200,
            roomMap[roomId]!!,
        )
    }

    override suspend fun updateRoomState(upstreamNetworkRoomUpdateDetails: UpstreamNetworkRoomUpdateDetails):
            HrmsNetworkResponse<NetworkRoom> {
        return upstreamNetworkRoomUpdateDetails.let {
            roomMap[it.id] = roomMap[it.id]!!.copy(cleanState = it.cleanState)

            HrmsNetworkResponse(
                200,
                roomMap[it.id],
            )
        }
    }

    override suspend fun getNotes(roomId: String):
            HrmsNetworkResponse<List<NetworkNote>> {
        val notes = noteMap.values
            .filter { it.roomId == roomId }

        return HrmsNetworkResponse(
            200,
            notes,
        )
    }

    override suspend fun addNote(upstreamNetworkNoteDetails: UpstreamNetworkNoteDetails):
            HrmsNetworkResponse<NetworkNote> {
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
        )
    }

    override suspend fun deleteNote(noteId: Int):
            HrmsNetworkResponse<Any> {
        noteMap.remove(noteId)

        return HrmsNetworkResponse(
            200,
            null,
        )
    }
}
