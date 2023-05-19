package alexman.hrms.feature.login.navigation

import alexman.hrms.core.data.repository.CleaningStaffRepositoryImplementation
import alexman.hrms.core.network.fake.FakeNetworkDataSource
import alexman.hrms.feature.login.LoginScreen
import alexman.hrms.feature.login.LoginViewModel
import androidx.navigation.NavGraphBuilder
import androidx.navigation.compose.composable

fun NavGraphBuilder.loginScreen(
    route: String,
    onNavigateToHome: (Int) -> Unit
) {
    composable(
        route = route,
    ) {
        LoginScreen(
            loginViewModel = LoginViewModel(
                CleaningStaffRepositoryImplementation(
                    FakeNetworkDataSource(),
                ),
            ),
            onNavigateToHome = onNavigateToHome,
        )
    }
}
