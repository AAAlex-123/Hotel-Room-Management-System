package alexman.hrms.core.data.model

import alexman.hrms.core.model.data.Order
import alexman.hrms.core.network.model.NetworkOrder

fun NetworkOrder.asExternalModel() = Order(
    id = id,
    completed = completed,
    orderData = orderDetails.orderData,
)
