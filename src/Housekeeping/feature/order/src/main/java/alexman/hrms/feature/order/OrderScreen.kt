package alexman.hrms.feature.order

import alexman.hrms.core.designsystem.PreviewLight
import alexman.hrms.core.designsystem.SizeVariation
import alexman.hrms.core.designsystem.component.BottomBarItem
import alexman.hrms.core.designsystem.component.ButtonWithText
import alexman.hrms.core.designsystem.component.ListItem
import alexman.hrms.core.designsystem.component.HrmsScaffold
import alexman.hrms.core.designsystem.component.IconClickable
import alexman.hrms.core.designsystem.component.TextInputField
import alexman.hrms.core.designsystem.component.MediumDisplayText
import alexman.hrms.core.designsystem.component.HrmsPopup
import alexman.hrms.core.designsystem.theme.HrmsTheme
import alexman.hrms.core.model.data.Order
import alexman.hrms.core.model.data.OrderStatus
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.wrapContentSize
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material3.DropdownMenu
import androidx.compose.runtime.Composable
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.DpOffset
import androidx.compose.ui.unit.dp

@PreviewLight
@Composable
private fun OrderScreenContentPreview() {
    HrmsTheme {
        OrderScreenContent(
            cleaningStaffId = 1,
            orders = listOf(
                Order(1, OrderStatus.PENDING, 1, "ORDER 1"),
                Order(2, OrderStatus.COMPLETED, 1, "ORDER 2"),
                Order(3, OrderStatus.COMPLETED, 1, "ORDER 3"),
                Order(4, OrderStatus.PENDING, 2, "ORDER 4"),
                Order(5, OrderStatus.PENDING, 1, "ORDER 5"),
            ),
            onDelete = { },
            onSubmitNewOrder = { },
            onNavigateToHome = { },
            onNavigateToRooms = { },
        )
    }
}

@PreviewLight
@Composable
private fun NewOrderPopupContentPreview() {
    HrmsTheme {
        NewOrderPopupContent(
            onSubmit = { },
        )
    }
}

@Composable
internal fun OrderScreen(
    orderViewModel: OrderViewModel,
    onNavigateToHome: (Int) -> Unit,
    onNavigateToRooms: (Int) -> Unit,
) {
    val cleaningStaffId = orderViewModel.cleaningStaffId
    val orders = orderViewModel.orders.collectAsState(listOf())

    OrderScreenContent(
        cleaningStaffId = cleaningStaffId,
        orders = orders.value,
        onDelete = { orderViewModel.deleteOrder(it) },
        onSubmitNewOrder = { orderViewModel.placeOrder(it) },
        onNavigateToHome = onNavigateToHome,
        onNavigateToRooms = onNavigateToRooms,
    )
}

@Composable
private fun OrderScreenContent(
    cleaningStaffId: Int,
    orders: List<Order>,
    onDelete: (Int) -> Unit,
    onSubmitNewOrder: (String) -> Unit,
    onNavigateToHome: (Int) -> Unit,
    onNavigateToRooms: (Int) -> Unit,
) {
    HrmsScaffold(
        topBarText = "Orders",
        onNavigationIconClick = { onNavigateToHome(cleaningStaffId) },
        actions = { NewOrderButton(onSubmitNewOrder) },
        onNavigateToRooms = { onNavigateToRooms(cleaningStaffId) },
        onNavigateToOrders = { },
        selectedBottomBarItem = BottomBarItem.ORDERS,
    ) {
        LazyColumn(
            verticalArrangement = Arrangement.spacedBy(16.dp),
            modifier = Modifier
                .fillMaxSize()
                .padding(16.dp),
        ) {
            items(orders) {
                ListItem(
                    id = it.id,
                    text = it.orderData,
                    deletable = it.cleaningLadyId == cleaningStaffId,
                    onDelete = onDelete,
                    completed = it.completed == OrderStatus.COMPLETED,
                    markable = false, // TODO("make it so it depends on cleaningStaffType")
                    onMarkCompleted = { id: Int, completed: Boolean ->
                        // TODO("add actual method")
                    },
                    SizeVariation.PRIMARY,
                )
            }
        }
    }
}

@Composable
private fun NewOrderButton(
    onSubmitNewOrder: (String) -> Unit,
) {
    var expanded by remember { mutableStateOf(false) }

    IconClickable(
        id = R.drawable.ic_menu_add_order,
        alt = "Place Order",
        onClick = { expanded = true },
        sizeVariation = SizeVariation.PRIMARY,
        modifier = Modifier
            .padding(8.dp),
    )
    DropdownMenu(
        expanded = expanded,
        onDismissRequest = { expanded = false },
        modifier = Modifier,
        offset = DpOffset(0.dp, 0.dp),
        // properties = PopupProperties, // defaults are fine
    ) {
        NewOrderPopupContent(
            onSubmit = {
                expanded = false
                onSubmitNewOrder(it)
            }
        )
    }
}

@Composable
private fun NewOrderPopupContent(
    onSubmit: (String) -> Unit,
) {
    val (value, setValue) = remember { mutableStateOf("") }

    HrmsPopup {
        Column(
            horizontalAlignment = Alignment.CenterHorizontally,
            verticalArrangement = Arrangement.spacedBy(16.dp),
            modifier = Modifier
                .padding(16.dp),
        ) {
            MediumDisplayText(
                text = "New Order",
            )
            TextInputField(
                value = value,
                onValueChange = setValue,
                placeholderText = "Please type your Order",
                modifier = Modifier
                    .wrapContentSize(Alignment.Center),
                singleLine = false,
            )
            ButtonWithText(
                text = "Submit",
                onClick = { onSubmit(value) },
                sizeVariation = SizeVariation.SECONDARY,
            )
        }
    }
}
