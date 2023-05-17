package alexman.hrms.housekeeping

import alexman.hrms.core.designsystem.theme.HousekeepingTheme
import alexman.hrms.feature.login.navigation.loginScreen
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
                // A surface container using the 'background' color from the theme
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
            onNavigateToHome = { cleaningStaffId: Int -> navController.navigate(
                // TODO("navigate to home with cleaningStaffId")
                "TODO"
            )}
        )

        /* TODO("Not yet implemented")
        homeScreen(...) */

        /* TODO("Not yet implemented")
        roomScreen(...) */

        /* TODO("Not yet implemented")
        singleRoomScreen(...) */

        /* TODO("Not yet implemented")
        orderScreen(...) */
    }
}
