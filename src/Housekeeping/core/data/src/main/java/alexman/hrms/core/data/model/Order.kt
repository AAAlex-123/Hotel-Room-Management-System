package alexman.hrms.core.data.model

import alexman.hrms.core.model.data.Order
import alexman.hrms.core.model.data.OrderStatus
import alexman.hrms.core.model.data.UpstreamOrderDetails
import alexman.hrms.core.model.data.UpstreamOrderUpdateDetails
import alexman.hrms.core.network.model.NetworkOrder
import alexman.hrms.core.network.model.UpstreamNetworkOrderDetails
import alexman.hrms.core.network.model.UpstreamNetworkOrderUpdateDetails

fun NetworkOrder.asExternalModel() = Order(
    id = id,
    completed = if (completed) OrderStatus.COMPLETED else OrderStatus.PENDING,
    cleaningLadyId = cleaningLadyId,
    orderData = orderData,
)

fun UpstreamOrderDetails.asUpstreamNetworkOrderDetails() = UpstreamNetworkOrderDetails(
    cleaningLadyId = cleaningLadyId,
    orderData = orderData,
)

fun UpstreamOrderUpdateDetails.asUpstreamNetworkOrderUpdateDetails() =
    UpstreamNetworkOrderUpdateDetails(
        id = id,
        completed = completed == OrderStatus.COMPLETED,
    )
