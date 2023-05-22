package alexman.hrms.core.network.model

data class UpstreamNetworkNoteDetails(
    val roomId: String,
    val cleaningStaffId: Int,
    val noteData: String,
)

data class NetworkNote(
    val id: Int,
    val roomId: String,
    val cleaningStaffId: Int,
    val noteData: String,
)
