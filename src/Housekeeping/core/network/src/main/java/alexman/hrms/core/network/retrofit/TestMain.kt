package alexman.hrms.core.network.retrofit

import alexman.hrms.core.network.HrmsNetworkResponse
import alexman.hrms.core.network.model.UpstreamNetworkCleaningStaffAuth
import alexman.hrms.core.network.model.UpstreamNetworkOrderDetails
import kotlinx.coroutines.runBlocking

fun main() {
    val retrofitDS = HrmsRetrofitNetworkDataSource()

    doPrintResponse("GET /auth") { retrofitDS.authenticate(UpstreamNetworkCleaningStaffAuth("login1", "password1")) }
    doPrintResponse("GET /employee/{id}") { retrofitDS.getCleaningStaff(1) }
    doPrintResponse("GET /provision/employee/{emp_id}") { retrofitDS.getOrders(2) }
    doPrintResponse("POST /provision") { retrofitDS.placeOrder(UpstreamNetworkOrderDetails(3, "orderData3")) }
    doPrintResponse("DELETE /provision/{id}") { retrofitDS.deleteOrder(4) }
}

private fun <T> doPrintResponse(rest: String, request: suspend () -> HrmsNetworkResponse<T>) {
    runBlocking{
        request()
    }.also {
        print("\n\n---\nHTTP ${rest}\nCode: ${it.code} (OK: ${it.ok})\nBody: ${it.body}\nErrorBody: ${it.errorBody}")
    }
}
