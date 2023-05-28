package alexman.hrms.feature.order.navigation

import alexman.hrms.core.data.Repository
import alexman.hrms.feature.order.OrderScreen
import alexman.hrms.feature.order.OrderViewModel
import androidx.navigation.NavGraphBuilder
import androidx.navigation.NavType
import androidx.navigation.compose.composable
import androidx.navigation.navArgument

fun NavGraphBuilder.orderScreen(
    route: String,
    onNavigateToHome: (Int) -> Unit,
    onNavigateToCleaningLadies: (Int) -> Unit,
    onNavigateToRooms: (Int) -> Unit,
) {
    composable(
        route = route,
        arguments = listOf(
            navArgument("cleaningStaffId") { type = NavType.IntType },
        ),
    ) { navBackStackEntry ->
        OrderScreen(
            orderViewModel = OrderViewModel(
                cleaningStaffId = navBackStackEntry.arguments?.getInt("cleaningStaffId")!!,
                orderRepository = Repository.order,
                cleaningStaffRepository = Repository.cleaningStaff
            ),
            onNavigateToHome = onNavigateToHome,
            onNavigateToCleaningLadies = onNavigateToCleaningLadies,
            onNavigateToRooms = onNavigateToRooms,
        )
    }
}
