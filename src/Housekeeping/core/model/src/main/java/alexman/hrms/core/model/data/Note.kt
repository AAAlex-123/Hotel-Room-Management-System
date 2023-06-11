package alexman.hrms.core.model.data

data class UpstreamNoteDetails(
    val roomId: String,
    val cleaningStaffId: Int,
    val noteData: String,
)

data class Note(
    val id: Int,
    val roomId: String,
    val cleaningStaffId: Int,
    val noteData: String,
)
