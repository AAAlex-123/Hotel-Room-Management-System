package alexman.hrms.feature.order

import alexman.hrms.core.data.repository.CleaningStaffQuery
import alexman.hrms.core.data.repository.CleaningStaffRepository
import alexman.hrms.core.data.repository.OrderQuery
import alexman.hrms.core.data.repository.OrderRepository
import alexman.hrms.core.model.data.CleaningStaffType
import alexman.hrms.core.model.data.Order
import alexman.hrms.core.model.data.OrderStatus
import alexman.hrms.core.model.data.UpstreamOrderDetails
import alexman.hrms.core.model.data.UpstreamOrderUpdateDetails
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.launch

internal data class OrderStaffUiState(
    val staffId: Int,
    val staffType: CleaningStaffType,
)

internal class OrderViewModel(
    cleaningStaffId: Int,
    cleaningStaffRepository: CleaningStaffRepository,
    private val orderRepository: OrderRepository,
) : ViewModel() {

    internal var staffUiState: OrderStaffUiState by mutableStateOf(
        OrderStaffUiState(-1, CleaningStaffType.CLEANING_LADY)
    )
        private set

    lateinit var orders: Flow<List<Order>>
        private set

    init {
        viewModelScope.launch {
            // TODO("figure out how to handle failure")
            with(
                cleaningStaffRepository.getCleaningStaff(
                    CleaningStaffQuery(cleaningStaffId = cleaningStaffId)
                )
            ) {
                staffUiState = staffUiState.copy(
                    staffId = this.employeeId,
                    staffType = this.cleaningStaffType,
                )
            }
        }

        viewModelScope.launch {
            // TODO("figure out how to handle failure")
            orders = orderRepository.getOrders(
                OrderQuery(cleaningLadyId = cleaningStaffId)
            )
        }
    }

    internal fun placeOrder(orderData: String) {
        viewModelScope.launch {
            // TODO("figure out how to handle failure")
            orderRepository.placeOrder(
                UpstreamOrderDetails(
                    cleaningLadyId = staffUiState.staffId,
                    orderData = orderData,
                )
            )
        }
    }

    internal fun deleteOrder(orderId: Int) {
        viewModelScope.launch {
            // TODO("figure out how to handle failure")
            orderRepository.deleteOrder(orderId)
        }
    }

    internal fun markOrderCompleted(orderId: Int, completed: Boolean) {
        viewModelScope.launch {
            // TODO("figure out how to handle failure")
            orderRepository.updateOrderState(
                UpstreamOrderUpdateDetails(
                    id = orderId,
                    completed = if (completed) OrderStatus.COMPLETED else OrderStatus.PENDING,
                )
            )
        }
    }
}
