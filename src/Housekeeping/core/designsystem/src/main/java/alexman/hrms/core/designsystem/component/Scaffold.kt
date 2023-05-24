package alexman.hrms.core.designsystem.component

import alexman.hrms.core.designsystem.PreviewLight
import alexman.hrms.core.designsystem.R
import alexman.hrms.core.designsystem.theme.HrmsTheme
import androidx.annotation.DrawableRes
import androidx.compose.foundation.BorderStroke
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.RowScope
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.wrapContentHeight
import androidx.compose.foundation.layout.wrapContentSize
import androidx.compose.material3.CenterAlignedTopAppBar
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Surface
import androidx.compose.material3.TopAppBarDefaults
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp

enum class BottomBarItem {
    NONE, ROOMS, ORDERS;
}

@Composable
fun HrmsScaffold(
    topBarText: String,
    topBarBackgroundColor: Color = MaterialTheme.colorScheme.primary,
    onNavigationIconClick: (() -> Unit)? = null,
    actions: @Composable (RowScope.() -> Unit) = {},
    onNavigateToRooms: (() -> Unit)? = null,
    onNavigateToOrders: (() -> Unit)? = null,
    selectedBottomBarItem: BottomBarItem = BottomBarItem.NONE,
    content: @Composable () -> Unit
) {
    Scaffold(
        topBar = {
            HrmsTopAppBar(
                text = topBarText,
                navigationIcon = {
                    if (onNavigationIconClick != null) {
                        DefaultNavigationIcon(onClick = onNavigationIconClick)
                    }
                },
                actions = actions,
                backgroundColor = topBarBackgroundColor,
            )
        },
        bottomBar = {
            // hide bottom bar if there's nothing to show
            if (!(onNavigateToRooms == null && onNavigateToOrders == null)) {
                HrmsBottomBar {
                    // if (BottomBarItem.ROOMS in bottomBarItems) {
                    if (onNavigateToRooms != null) {
                        RoomsBottomBarItem(
                            onClick = onNavigateToRooms,
                            selected = selectedBottomBarItem == BottomBarItem.ROOMS,
                        )
                    }
                    if (onNavigateToOrders != null) {
                        OrdersBottomBarItem(
                            onClick = onNavigateToOrders,
                            selected = selectedBottomBarItem == BottomBarItem.ORDERS,
                        )
                    }
                }
            }
        }
    ) { paddingValues ->
        Box(
            modifier = Modifier
                .fillMaxSize()
                .background(color = MaterialTheme.colorScheme.background)
                .padding(paddingValues),
        ) {
            content()
        }
    }
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
private fun HrmsTopAppBar(
    text: String,
    navigationIcon: @Composable () -> Unit = {},
    actions: @Composable (RowScope.() -> Unit) = {},
    backgroundColor: Color = MaterialTheme.colorScheme.primary,
    contentColor: Color = MaterialTheme.colorScheme.onPrimary,
) {
    CenterAlignedTopAppBar(
        title = { LargeDisplayText(text) },
        modifier = Modifier
            .fillMaxWidth()
            .wrapContentHeight(),
        navigationIcon = navigationIcon,
        actions = actions,
        colors = TopAppBarDefaults.centerAlignedTopAppBarColors(
            containerColor = backgroundColor,
            // scrolledContainerColor = Color,
            navigationIconContentColor = contentColor,
            titleContentColor = contentColor,
            actionIconContentColor = contentColor,
        ),
        scrollBehavior = TopAppBarDefaults.pinnedScrollBehavior { false },
    )
}

@PreviewLight
@Composable
private fun HrmsBottomBarPreview() {
    HrmsTheme {
        HrmsBottomBar {
            RoomsBottomBarItem(
                onClick = { },
                selected = true,
            )
            OrdersBottomBarItem(
                onClick = { },
                selected = false,
            )
        }
    }
}

@Composable
private fun HrmsBottomBar(
    content: @Composable RowScope.() -> Unit,
) {
    Row(
        horizontalArrangement = Arrangement.SpaceEvenly,
        verticalAlignment = Alignment.CenterVertically,
        modifier = Modifier
            .fillMaxWidth()
            .wrapContentHeight()
            .background(MaterialTheme.colorScheme.primary)
            .padding(vertical = 8.dp),
        content = content
    )
}

@Composable
private fun RowScope.RoomsBottomBarItem(
    onClick: () -> Unit,
    selected: Boolean,
) {
    BottomBarItem(
        label = "Rooms",
        id = R.drawable.ic_tab_rooms,
        alt = "rooms",
        onClick = onClick,
        selected = selected,
    )
}

@Composable
private fun RowScope.OrdersBottomBarItem(
    onClick: () -> Unit,
    selected: Boolean,
) {
    BottomBarItem(
        label = "Orders",
        id = R.drawable.ic_tab_orders,
        alt = "orders",
        onClick = onClick,
        selected = selected,
    )
}

@Composable
private fun RowScope.BottomBarItem(
    label: String,
    @DrawableRes id: Int,
    alt: String,
    onClick: () -> Unit,
    selected: Boolean,
) {
    // make sure each of the k elements is centered inside
    // the 1/k-th of the width of the row allocated to it
    Box(
        modifier = Modifier.weight(1f, fill = true),
        contentAlignment = Alignment.Center,
    ) {
        Surface(
            modifier = Modifier
                .clickable(onClick = onClick),
            shape = MaterialTheme.shapes.small,
            border = if (selected) BorderStroke(4.dp, Color.Black) else null
        ) {
            Column(
                verticalArrangement = Arrangement.spacedBy(8.dp),
                horizontalAlignment = Alignment.CenterHorizontally,
                modifier = Modifier
                    .wrapContentSize()
                    .padding(
                        horizontal = 16.dp,
                        vertical = 8.dp,
                    )
            ) {
                MediumDisplayText(text = label)
                Icon(
                    id = id,
                    alt = alt,
                )
            }
        }
    }
}
