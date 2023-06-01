package alexman.hrms.feature.maids.navigation

import alexman.hrms.core.data.Repository
import alexman.hrms.feature.maids.MaidScreen
import alexman.hrms.feature.maids.MaidViewModel
import androidx.navigation.NavGraphBuilder
import androidx.navigation.NavType
import androidx.navigation.compose.composable
import androidx.navigation.navArgument

fun NavGraphBuilder.maidScreen(
    route: String,
    onNavigateToHome: (Int) -> Unit,
    onNavigateToRooms: (Int) -> Unit,
    onNavigateToOrders: (Int) -> Unit,
) {
    composable(
        route = route,
        arguments = listOf(
            navArgument("housekeeperId") { type = NavType.IntType },
        ),
    ) { navBackStackEntry ->
        MaidScreen(
            maidViewModel = MaidViewModel(
                housekeeperId = navBackStackEntry.arguments?.getInt("housekeeperId")!!,
                cleaningStaffRepository = Repository.cleaningStaff,
            ),
            onNavigateToHome = onNavigateToHome,
            onNavigateToRooms = onNavigateToRooms,
            onNavigateToOrders = onNavigateToOrders,
        )
    }
}
