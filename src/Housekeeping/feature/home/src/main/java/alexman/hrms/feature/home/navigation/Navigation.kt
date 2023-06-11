package alexman.hrms.feature.home.navigation

import alexman.hrms.core.data.Repository
import alexman.hrms.feature.home.HomeScreen
import alexman.hrms.feature.home.HomeViewModel
import androidx.navigation.NavGraphBuilder
import androidx.navigation.NavType
import androidx.navigation.compose.composable
import androidx.navigation.navArgument

fun NavGraphBuilder.homeScreen(
    route: String,
    onNavigateToLogin: () -> Unit,
    onNavigateToRooms: (Int) -> Unit,
    onNavigateToCleaningLadies: (Int) -> Unit,
    onNavigateToOrders: (Int) -> Unit,
) {
    composable(
        route = route,
        arguments = listOf(
            navArgument("cleaningStaffId") { type = NavType.IntType },
        ),
    ) { navBackStackEntry ->
        HomeScreen(
            homeViewModel = HomeViewModel(
                cleaningStaffId = navBackStackEntry.arguments?.getInt("cleaningStaffId")!!,
                cleaningStaffRepository = Repository.cleaningStaff,
            ),
            onNavigateToLogin = onNavigateToLogin,
            onNavigateToRooms = onNavigateToRooms,
            onNavigateToCleaningLadies = onNavigateToCleaningLadies,
            onNavigateToOrders = onNavigateToOrders,
        )
    }
}
