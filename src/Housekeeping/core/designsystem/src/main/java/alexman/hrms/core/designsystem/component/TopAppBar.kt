package alexman.hrms.core.designsystem.component

import alexman.hrms.core.designsystem.theme.Blue20
import androidx.compose.foundation.layout.RowScope
import androidx.compose.material3.CenterAlignedTopAppBar
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.TopAppBarDefaults
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun HousekeepingTopAppBar(
    text: String,
    modifier: Modifier = Modifier,
    navigationIcon: @Composable () -> Unit = {},
    actions: @Composable() (RowScope.() -> Unit) = {},
) {
    CenterAlignedTopAppBar(
        title = { LargeDisplayText(text) },
        modifier = modifier,
        navigationIcon = navigationIcon,
        actions = actions,
        colors = TopAppBarDefaults.centerAlignedTopAppBarColors(
            containerColor = Blue20,
            // scrolledContainerColor = Color,
            navigationIconContentColor = Color.Black,
            titleContentColor = Color.Black,
            actionIconContentColor = Color.Black,
        ),
        scrollBehavior = TopAppBarDefaults.pinnedScrollBehavior { false },
    )
}
