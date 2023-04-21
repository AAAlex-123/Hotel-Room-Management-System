package alexman.hrms.core.network.model

enum class CleanState {
    DIRTY, PENDING_CHECK, CLEAN,
}

enum class CleanType {
    NORMAL, AFTER_CHECKOUT
}

data class NetworkRoom(
    val number: Int,
    val notes: List<String>,
    val cleanState: CleanState,
    val occupied: Boolean,
    val cleanType: CleanType
)
