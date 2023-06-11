package alexman.hrms.feature.localization.navigation

import alexman.hrms.feature.localization.LocalizationScreen
import androidx.navigation.NavGraphBuilder
import androidx.navigation.compose.composable

fun NavGraphBuilder.localizationScreen(
    route: String,
    onNavigateBack: () -> Unit,
) {
    composable(
        route = route,
    ) {
        LocalizationScreen(
            onNavigateBack = onNavigateBack,
        )
    }
}
