package alexman.hrms.core.model.data

enum class CleaningStaffType {
    CLEANING_LADY, HOUSEKEEPER,
}

class CleaningStaff(
    val employeeId: Int,
    val name: String,
    val cleaningStaffType: CleaningStaffType,
)
