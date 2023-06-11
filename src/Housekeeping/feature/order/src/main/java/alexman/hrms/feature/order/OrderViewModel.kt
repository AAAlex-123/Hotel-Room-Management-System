package alexman.hrms.feature.order

import alexman.hrms.core.data.repository.CleaningLadiesQuery
import alexman.hrms.core.data.repository.CleaningStaffQuery
import alexman.hrms.core.data.repository.CleaningStaffRepository
import alexman.hrms.core.data.repository.OrderQuery
import alexman.hrms.core.data.repository.OrderRepository
import alexman.hrms.core.model.data.CleaningStaffType
import alexman.hrms.core.model.data.Order
import alexman.hrms.core.model.data.OrderStatus
import alexman.hrms.core.model.data.UpstreamOrderDetails
import alexman.hrms.core.model.data.UpstreamOrderUpdateDetails
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.SharingStarted
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.stateIn
import kotlinx.coroutines.launch
import kotlinx.coroutines.runBlocking

internal data class OrderStaffUiState(
    val staffId: Int,
    val staffType: CleaningStaffType,
)

internal class OrderViewModel(
    cleaningStaffId: Int,
    cleaningStaffRepository: CleaningStaffRepository,
    private val orderRepository: OrderRepository,
) : ViewModel() {

    private val _staffUiState = MutableStateFlow(
        OrderStaffUiState(-1, CleaningStaffType.CLEANING_LADY)
    )

    val staffUiState: StateFlow<OrderStaffUiState> = _staffUiState.asStateFlow()

    var orders: StateFlow<List<Order>>
        private set

    init {
        runBlocking {
            // TODO("figure out how to handle failure")
            with(
                cleaningStaffRepository.getCleaningStaff(
                    CleaningStaffQuery(cleaningStaffId = cleaningStaffId)
                )
            ) {
                _staffUiState.value = OrderStaffUiState(
                    staffId = this.employeeId,
                    staffType = this.cleaningStaffType,
                )
            }

            // TODO("figure out how to handle failure")
            orders = orderRepository.getOrders(
                when (staffUiState.value.staffType) {
                    CleaningStaffType.CLEANING_LADY -> OrderQuery(cleaningLadyId = cleaningStaffId)
                    CleaningStaffType.HOUSEKEEPER -> OrderQuery(
                        cleaningLadyIds = cleaningStaffRepository.getCleaningLadies(
                            CleaningLadiesQuery(housekeeperId = cleaningStaffId)
                        ).map { it.employeeId }
                    )
                }
            ).stateIn(
                viewModelScope,
                SharingStarted.WhileSubscribed(5000L),
                listOf(),
            )
        }
    }

    fun placeOrder(orderData: String) {
        viewModelScope.launch {
            // TODO("figure out how to handle failure")
            orderRepository.placeOrder(
                UpstreamOrderDetails(
                    cleaningLadyId = staffUiState.value.staffId,
                    orderData = orderData,
                )
            )
        }
    }

    fun deleteOrder(orderId: Int) {
        viewModelScope.launch {
            // TODO("figure out how to handle failure")
            orderRepository.deleteOrder(orderId)
        }
    }

    fun markOrderCompleted(orderId: Int, completed: Boolean) {
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
