package alexman.hrms.core.network.model

data class UpstreamNetworkNoteDetails(
    val roomId: Int,
    val cleaningStaffId: Int,
    val noteData: String,
)

data class NetworkNote(
    val id: Int,
    val roomId: Int,
    val cleaningStaffId: Int,
    val noteData: String,
)
