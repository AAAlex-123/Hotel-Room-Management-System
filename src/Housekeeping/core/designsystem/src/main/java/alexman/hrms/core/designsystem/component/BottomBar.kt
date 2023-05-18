package alexman.hrms.core.designsystem.component

import alexman.hrms.core.designsystem.PreviewLight
import alexman.hrms.core.designsystem.R
import alexman.hrms.core.designsystem.theme.HousekeepingTheme
import androidx.annotation.DrawableRes
import androidx.compose.foundation.BorderStroke
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.RowScope
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.wrapContentHeight
import androidx.compose.foundation.layout.wrapContentSize
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp

@PreviewLight
@Composable
private fun HousekeepingBottomBarPreview() {
    HousekeepingTheme {
        HousekeepingBottomBar {
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
fun HousekeepingBottomBar(
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
fun RowScope.RoomsBottomBarItem(
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
fun RowScope.OrdersBottomBarItem(
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
