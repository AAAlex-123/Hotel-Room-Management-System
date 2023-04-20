package alexman.hrms.core.network.model

enum class CleanState {
    DIRTY, PENDING_CHECK, CLEAN,
}

enum class CleanType {
    EVERYDAY, AFTER_CHECKOUT
}

data class NetworkRoom(
    val number: Int,
    val comments: List<String>,
    val cleanState: CleanState,
    val occupied: Boolean,
    val cleanType: CleanType
)
