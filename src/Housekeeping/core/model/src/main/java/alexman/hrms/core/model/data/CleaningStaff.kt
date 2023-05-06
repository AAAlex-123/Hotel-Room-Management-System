package alexman.hrms.core.model.data

enum class CleaningStaffType {
    CLEANING_LADY, HOUSEKEEPER,
}

class CleaningStaff(
    val employeeId: Int,
    val id: Int,
    val name: String,
    val cleaningStaffType: CleaningStaffType,
)

// TODO("figure out the hierarchy, if any")

/*
data class Housekeeper(
    override val id: Int,
    override val employeeId: Int,
    override val name: String,
    override val cleaningStaffType: CleaningStaffType,
    // TODO(add the rest)
) : CleaningStaff(id, employeeId, name, cleaningStaffType)

data class CleaningLady(
    override val id: Int,
    override val employeeId: Int,
    override val name: String,
    override val cleaningStaffType: CleaningStaffType,
    // TODO(add the rest)
    // val rooms: Map<Int, Room>,
) : CleaningStaff(id, employeeId, name, cleaningStaffType)
*/
