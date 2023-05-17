package alexman.hrms.housekeeping.navigation

sealed class Destination(val route: String) {

    object Login : Destination("login")

}
