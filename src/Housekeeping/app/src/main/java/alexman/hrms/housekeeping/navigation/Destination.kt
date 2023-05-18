package alexman.hrms.housekeeping.navigation

sealed class Destination(val route: String) {

    object Login : Destination("login")

    object Home : Destination("home/{cleaningStaffId}") {
        fun format(cleaningStaffId: Int) =
            route.replace("{cleaningStaffId}", cleaningStaffId.toString())
    }

    object Order : Destination("orders/{cleaningStaffId}") {
        fun format(cleaningStaffId: Int) =
            route.replace("{cleaningStaffId}", cleaningStaffId.toString())
    }
}
