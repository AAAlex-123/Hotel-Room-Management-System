package alexman.hrms.feature.order.navigation

import alexman.hrms.core.data.repository.OrderRepositoryImplementation
import alexman.hrms.core.network.fake.FakeNetworkDataSource
import alexman.hrms.feature.order.OrderScreen
import alexman.hrms.feature.order.OrderViewModel
import androidx.navigation.NavGraphBuilder
import androidx.navigation.NavType
import androidx.navigation.compose.composable
import androidx.navigation.navArgument

fun NavGraphBuilder.orderScreen(
    route: String,
    onNavigateToHome: (Int) -> Unit,
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
                orderRepository = OrderRepositoryImplementation(
                    FakeNetworkDataSource(),
                ),
            ),
            onNavigateToHome = onNavigateToHome,
            onNavigateToRooms = onNavigateToRooms,
        )
    }
}
