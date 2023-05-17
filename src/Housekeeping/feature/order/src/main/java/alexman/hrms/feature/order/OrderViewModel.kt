package alexman.hrms.feature.order

import alexman.hrms.core.data.repository.OrderQuery
import alexman.hrms.core.data.repository.OrderRepository
import alexman.hrms.core.model.data.Order
import alexman.hrms.core.model.data.UpstreamOrderDetails
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.launch

class OrderViewModel(
    val cleaningStaffId: Int,
    private val orderRepository: OrderRepository,
) : ViewModel() {

    lateinit var orders: Flow<List<Order>>
        private set

    init {
        viewModelScope.launch {
            orders = orderRepository.getOrders(
                OrderQuery(cleaningLadyId = cleaningStaffId)
            )
        }
    }

    internal fun placeOrder(orderData: String) {
        viewModelScope.launch {
            orderRepository.placeOrder(
                UpstreamOrderDetails(
                    cleaningLadyId = cleaningStaffId,
                    orderData = orderData,
                )
            )
        }
    }

    internal fun deleteOrder(orderId: Int) {
        viewModelScope.launch {
            orderRepository.deleteOrder(orderId)
        }
    }
}