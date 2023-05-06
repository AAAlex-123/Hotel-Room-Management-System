package alexman.hrms.feature.order

import alexman.hrms.core.data.repository.OrderRepositoryImplementation
import alexman.hrms.core.designsystem.PreviewLight
import alexman.hrms.core.designsystem.SizeVariation
import alexman.hrms.core.designsystem.component.ButtonWithText
import alexman.hrms.core.designsystem.component.DefaultNavigationIcon
import alexman.hrms.core.designsystem.component.DeletableListItem
import alexman.hrms.core.designsystem.component.InputField
import alexman.hrms.core.designsystem.component.HousekeepingTopAppBar
import alexman.hrms.core.designsystem.component.Icon
import alexman.hrms.core.designsystem.component.MediumDisplayText
import alexman.hrms.core.designsystem.component.Popup
import alexman.hrms.core.designsystem.theme.HousekeepingTheme
import alexman.hrms.core.model.data.Order
import alexman.hrms.core.network.fake.FakeNetworkDataSource
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.wrapContentSize
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material3.DropdownMenu
import androidx.compose.runtime.Composable
import androidx.compose.runtime.State
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import androidx.compose.runtime.remember
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.DpOffset
import androidx.compose.ui.unit.dp

@PreviewLight
@Composable
private fun NewOrderPopupContentPreview() {
    HousekeepingTheme {
        OrderScreen(
            OrderViewModel(
                1,
                // do not replace with actual network data source
                // otherwise preview won't work as intended
                OrderRepositoryImplementation(FakeNetworkDataSource()),
            )
        )
    }
}

@Composable
fun OrderScreen(
    orderViewModel: OrderViewModel,
    // TODO("navigation?"),
) {
    val cleaningStaffId = orderViewModel.cleaningStaffId
    val orderState = orderViewModel.orders.collectAsState(listOf())

    OrderScreenContent(
        cleaningStaffId = cleaningStaffId,
        orderState = orderState,
        onDelete = { orderViewModel.deleteOrder(it) },
        onSubmitNewOrder = { orderViewModel.placeOrder(it) }
    )
}

@Composable
private fun OrderScreenContent(
    cleaningStaffId: Int,
    orderState: State<List<Order>>,
    onDelete: (Int) -> Unit,
    onSubmitNewOrder: (String) -> Unit,
) {
    Column(
        modifier = Modifier
            .fillMaxSize(),
    ) {
        HousekeepingTopAppBar(
            text = "Orders",
            navigationIcon = { DefaultNavigationIcon(onClick = { }) },
            actions = { NewOrderButton(onSubmitNewOrder) },
        )
        LazyColumn(
            verticalArrangement = Arrangement.spacedBy(16.dp),
            modifier = Modifier
                .padding(16.dp)
                .fillMaxSize(),
        ) {
            items(orderState.value) {
                DeletableListItem(
                    id = it.id,
                    text = it.orderData,
                    deletable = it.cleaningLadyId == cleaningStaffId,
                    onDelete = onDelete,
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

    Icon(
        id = R.drawable.ic_menu_add_order,
        alt = "Place Order",
        onClick = { expanded = true },
        sizeVariation = SizeVariation.LARGE,
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

    Popup {
        Column(
            horizontalAlignment = Alignment.CenterHorizontally,
            verticalArrangement = Arrangement.spacedBy(16.dp),
            modifier = Modifier
                .padding(16.dp),
        ) {
            MediumDisplayText(
                text = "New Order",
            )
            InputField(
                value = value,
                onValueChange = setValue,
                placeholderText = "Please type your Order",
                modifier = Modifier.wrapContentSize(),
            )
            ButtonWithText(
                text = "Submit",
                onClick = { onSubmit(value) },
            )
        }
    }
}
