package alexman.hrms.core.model.data

enum class CleanState {
    DIRTY, PENDING_UPLOAD, PENDING_CHECK, CLEAN, INSPECTED,
}

enum class CleanType {
    NORMAL, DEEP
}

enum class Occupied {
    OCCUPIED, VACANT,
}

data class UpstreamRoomUpdateDetails(
    val id: Int,
    val cleanState: CleanState,
)

data class Room(
    val id: Int,
    val cleanState: CleanState,
    val cleanType: CleanType,
    val occupied: Occupied,
)
