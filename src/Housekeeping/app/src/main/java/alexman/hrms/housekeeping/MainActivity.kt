package alexman.hrms.housekeeping

import alexman.hrms.core.designsystem.theme.HrmsTheme
import alexman.hrms.feature.home.navigation.homeScreen
import alexman.hrms.feature.login.navigation.loginScreen
import alexman.hrms.feature.maids.navigation.maidScreen
import alexman.hrms.feature.order.navigation.orderScreen
import alexman.hrms.feature.room.navigation.roomScreen
import alexman.hrms.feature.room.navigation.singleRoomScreen
import alexman.hrms.housekeeping.navigation.Destination
import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.navigation.NavHostController
import androidx.navigation.NavOptions
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.rememberNavController

class MainActivity : ComponentActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            HrmsTheme {
                Surface(
                    modifier = Modifier.fillMaxSize(),
                    color = MaterialTheme.colorScheme.background
                ) {
                    HrmsNav()
                }
            }
        }
    }
}

@Composable
private fun HrmsNav(
    modifier: Modifier = Modifier,
    navController: NavHostController = rememberNavController(),
    startDestination: String = Destination.Login.route,
) {

    val back: () -> Unit = { navController.popBackStack() }

    val toLogin = {
        navController.navigate(
            route = Destination.Login.route,
            navOptions = NavOptions.Builder()
                .setPopUpTo(route = Destination.Home.route, inclusive = true)
                .build(),
        )
    }

    val toHome = { cleaningStaffId: Int ->
        navController.navigate(
            route = Destination.Home.format(cleaningStaffId = cleaningStaffId),
            navOptions = NavOptions.Builder()
                .setPopUpTo(route = Destination.Login.route, inclusive = true)
                .build()
        )
    }

    val toRooms = { cleaningStaffId: Int ->
        navController.navigate(
            route = Destination.Room.format(cleaningStaffId = cleaningStaffId),
            navOptions = NavOptions.Builder()
                .setPopUpTo(route = Destination.Home.route, inclusive = false)
                .build(),
        )
    }

    val toCleaningLadies = { cleaningStaffId: Int ->
        navController.navigate(
            route = Destination.Maid.format(housekeeperId = cleaningStaffId),
            navOptions = NavOptions.Builder()
                .setPopUpTo(route = Destination.Home.route, inclusive = false)
                .build(),
        )
    }

    val toOrders = { cleaningStaffId: Int ->
        navController.navigate(
            route = Destination.Order.format(cleaningStaffId = cleaningStaffId),
            navOptions = NavOptions.Builder()
                .setPopUpTo(route = Destination.Home.route, inclusive = false)
                .build(),
        )
    }

    val toSingleRoom = { roomId: String, cleaningStaffId: Int ->
        navController.navigate(
            route = Destination.SingleRoom.format(
                roomId = roomId,
                cleaningStaffId = cleaningStaffId,
            ),
        )
    }

    NavHost(
        modifier = modifier,
        navController = navController,
        startDestination = startDestination,
    ) {
        loginScreen(
            route = Destination.Login.route,
            onNavigateToHome = toHome,
        )

        homeScreen(
            route = Destination.Home.route,
            onNavigateToLogin = toLogin,
            onNavigateToRooms = toRooms,
            onNavigateToCleaningLadies = toCleaningLadies,
            onNavigateToOrders = toOrders,
        )

        roomScreen(
            route = Destination.Room.route,
            onNavigateBack = back,
            onNavigateToCleaningLadies = toCleaningLadies,
            onNavigateToOrders = toOrders,
            onNavigateToSingleRoom = toSingleRoom,
        )

        singleRoomScreen(
            route = Destination.SingleRoom.route,
            onNavigateBack = back,
        )

        orderScreen(
            route = Destination.Order.route,
            onNavigateBack = back,
            onNavigateToCleaningLadies = toCleaningLadies,
            onNavigateToRooms = toRooms,
        )

        maidScreen(
            route = Destination.Maid.route,
            onNavigateBack = back,
            onNavigateToRooms = toRooms,
            onNavigateToOrders = toOrders,
        )
    }
}
