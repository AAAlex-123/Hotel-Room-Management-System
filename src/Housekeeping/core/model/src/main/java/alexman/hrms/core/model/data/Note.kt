package alexman.hrms.core.model.data

// TODO("figure out how IDs are going to work: emp vs staff id")

data class UpstreamNoteDetails(
    val roomId: Int,
    val cleaningStaffId: Int,
    val cleaningStaffType: CleaningStaffType,
    val noteData: String,
)

data class Note(
    val id: Int,
    val roomId: Int,
    val cleaningStaffId: Int,
    val cleaningStaffType: CleaningStaffType,
    val noteData: String,
)
