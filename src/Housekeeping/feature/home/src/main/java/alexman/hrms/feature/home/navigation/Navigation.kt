package alexman.hrms.feature.home.navigation

import alexman.hrms.core.data.repository.CleaningStaffRepositoryImplementation
import alexman.hrms.core.network.fake.FakeNetworkDataSource
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
                cleaningStaffRepository = CleaningStaffRepositoryImplementation(
                    FakeNetworkDataSource(),
                ),
            ),
            onNavigateToLogin = onNavigateToLogin,
            onNavigateToRooms = onNavigateToRooms,
            onNavigateToOrders = onNavigateToOrders,
        )
    }
}
