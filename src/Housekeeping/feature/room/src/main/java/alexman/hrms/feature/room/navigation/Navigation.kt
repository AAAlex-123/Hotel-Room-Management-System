package alexman.hrms.feature.room.navigation

import alexman.hrms.core.data.repository.RoomRepositoryImplementation
import alexman.hrms.core.network.fake.FakeNetworkDataSource
import alexman.hrms.feature.room.RoomScreen
import alexman.hrms.feature.room.RoomViewModel
import androidx.navigation.NavGraphBuilder
import androidx.navigation.NavType
import androidx.navigation.compose.composable
import androidx.navigation.navArgument
import kotlinx.coroutines.Dispatchers

fun NavGraphBuilder.roomScreen(
    route: String,
    onNavigateToHome: (Int) -> Unit,
    onNavigateToOrders: (Int) -> Unit,
    onNavigateToSingleRoom: (Int, Int) -> Unit,
) {
    composable(
        route = route,
        arguments = listOf(navArgument("cleaningStaffId") { type = NavType.IntType }),
    ) { navBackStackEntry ->
        RoomScreen(
            roomViewModel = RoomViewModel(
                cleaningStaffId = navBackStackEntry.arguments?.getInt("cleaningStaffId")!!,
                roomRepository = RoomRepositoryImplementation(
                    Dispatchers.IO,
                    FakeNetworkDataSource(),
                ),
            ),
            onNavigateToHome = onNavigateToHome,
            onNavigateToOrders = onNavigateToOrders,
            onNavigateToSingleRoom = onNavigateToSingleRoom,
        )
    }
}
