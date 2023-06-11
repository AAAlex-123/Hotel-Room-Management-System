package alexman.hrms.core.model.data

enum class CleanState {
    DIRTY, PENDING, CLEAN,
}

enum class CleanType {
    NORMAL, DEEP
}

enum class Cleanable {
    COME_CLEAN, DO_NOT_COME_CLEAN,
}

data class UpstreamRoomUpdateDetails(
    val id: String,
    val cleanState: CleanState,
)

data class Room(
    val id: String,
    val cleanState: CleanState,
    val cleanType: CleanType,
    val cleanable: Cleanable,
)
