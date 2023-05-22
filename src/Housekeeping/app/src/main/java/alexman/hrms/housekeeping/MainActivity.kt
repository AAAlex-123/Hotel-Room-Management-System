package alexman.hrms.housekeeping

import alexman.hrms.core.designsystem.theme.HousekeepingTheme
import alexman.hrms.feature.home.navigation.homeScreen
import alexman.hrms.feature.login.navigation.loginScreen
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
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.rememberNavController

class MainActivity : ComponentActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            HousekeepingTheme {
                Surface(
                    modifier = Modifier.fillMaxSize(),
                    color = MaterialTheme.colorScheme.background
                ) {
                    HousekeepingNav()
                }
            }
        }
    }
}

@Composable
private fun HousekeepingNav(
    modifier: Modifier = Modifier,
    navController: NavHostController = rememberNavController(),
    startDestination: String = Destination.Login.route,
) {
    NavHost(
        modifier = modifier,
        navController = navController,
        startDestination = startDestination,
    ) {
        loginScreen(
            route = Destination.Login.route,
            onNavigateToHome = { cleaningStaffId: Int ->
                navController.navigate(
                    Destination.Home.format(cleaningStaffId = cleaningStaffId)
                )
            }
        )

        homeScreen(
            route = Destination.Home.route,
            onNavigateToLogin = { navController.navigate(Destination.Login.route) },
            onNavigateToRooms = { cleaningStaffId: Int ->
                navController.navigate(
                    Destination.Room.format(cleaningStaffId = cleaningStaffId)
                )
            },
            onNavigateToOrders = { cleaningStaffId: Int ->
                navController.navigate(
                    Destination.Order.format(cleaningStaffId = cleaningStaffId)
                )
            },
        )

        roomScreen(
            route = Destination.Room.route,
            onNavigateToHome = { cleaningStaffId: Int ->
                navController.navigate(
                    Destination.Home.format(cleaningStaffId = cleaningStaffId)
                )
            },
            onNavigateToOrders = { cleaningStaffId: Int ->
                navController.navigate(
                    Destination.Order.format(cleaningStaffId = cleaningStaffId)
                )
            },
            onNavigateToSingleRoom = { roomId: String, cleaningStaffId: Int ->
                navController.navigate(
                    Destination.SingleRoom.format(
                        roomId = roomId,
                        cleaningStaffId = cleaningStaffId
                    )
                )
            },
        )

        singleRoomScreen(
            route = Destination.SingleRoom.route,
            onNavigateToRooms = { cleaningStaffId: Int ->
                navController.navigate(
                    Destination.Room.format(cleaningStaffId = cleaningStaffId)
                )
            },
        )

        orderScreen(
            route = Destination.Order.route,
            onNavigateToHome = { cleaningStaffId: Int ->
                navController.navigate(
                    Destination.Home.format(cleaningStaffId = cleaningStaffId)
                )
            },
            onNavigateToRooms = { cleaningStaffId: Int ->
                navController.navigate(
                    Destination.Room.format(cleaningStaffId = cleaningStaffId)
                )
            },
        )
    }
}
