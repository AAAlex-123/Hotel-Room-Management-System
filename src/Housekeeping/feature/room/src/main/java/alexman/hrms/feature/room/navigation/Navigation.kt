package alexman.hrms.feature.room.navigation

import alexman.hrms.core.data.Repository
import alexman.hrms.feature.room.RoomScreen
import alexman.hrms.feature.room.RoomViewModel
import alexman.hrms.feature.room.SingleRoomScreen
import alexman.hrms.feature.room.SingleRoomViewModel
import androidx.navigation.NavGraphBuilder
import androidx.navigation.NavType
import androidx.navigation.compose.composable
import androidx.navigation.navArgument

fun NavGraphBuilder.roomScreen(
    route: String,
    onNavigateToHome: (Int) -> Unit,
    onNavigateToCleaningLadies: (Int) -> Unit,
    onNavigateToOrders: (Int) -> Unit,
    onNavigateToSingleRoom: (String, Int) -> Unit,
) {
    composable(
        route = route,
        arguments = listOf(
            navArgument("cleaningStaffId") { type = NavType.IntType },
        ),
    ) { navBackStackEntry ->
        RoomScreen(
            roomViewModel = RoomViewModel(
                cleaningStaffId = navBackStackEntry.arguments?.getInt("cleaningStaffId")!!,
                cleaningStaffRepository = Repository.cleaningStaff,
                roomRepository = Repository.room,
            ),
            onNavigateToHome = onNavigateToHome,
            onNavigateToCleaningLadies = onNavigateToCleaningLadies,
            onNavigateToOrders = onNavigateToOrders,
            onNavigateToSingleRoom = onNavigateToSingleRoom,
        )
    }
}

fun NavGraphBuilder.singleRoomScreen(
    route: String,
    onNavigateToRooms: (Int) -> Unit,
) {
    composable(
        route = route,
        arguments = listOf(
            navArgument("roomId") { type = NavType.StringType },
            navArgument("cleaningStaffId") { type = NavType.IntType },
        ),
    ) { navBackStackEntry ->
        SingleRoomScreen(
            singleRoomViewModel = SingleRoomViewModel(
                roomId = navBackStackEntry.arguments?.getString("roomId")!!,
                cleaningStaffId = navBackStackEntry.arguments?.getInt("cleaningStaffId")!!,
                roomRepository = Repository.room,
                cleaningStaffRepository = Repository.cleaningStaff,
            ),
            onNavigateToRooms = onNavigateToRooms,
        )
    }
}
