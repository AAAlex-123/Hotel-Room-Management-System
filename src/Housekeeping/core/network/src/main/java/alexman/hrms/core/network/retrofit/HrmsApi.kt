package alexman.hrms.core.network.retrofit

import alexman.hrms.core.network.retrofit.model.RetrofitCleaningStaff
import alexman.hrms.core.network.retrofit.model.RetrofitCleaningStaffAuthBody
import alexman.hrms.core.network.retrofit.model.RetrofitOrder
import alexman.hrms.core.network.retrofit.model.RetrofitOrderBody
import alexman.hrms.core.network.retrofit.model.RetrofitSessionId
import retrofit2.Response
import retrofit2.http.Body
import retrofit2.http.DELETE
import retrofit2.http.GET
import retrofit2.http.POST
import retrofit2.http.Path

interface HrmsApi {

    @POST("auth")
    suspend fun authenticate(
        @Body auth: RetrofitCleaningStaffAuthBody,
    ): Response<RetrofitSessionId>

    @GET("employee/{id}")
    suspend fun getCleaningStaff(
        @Path("id") cleaningStaffId: Int,
    ): Response<RetrofitCleaningStaff>

    @GET("provision/employee/{emp_id}")
    suspend fun getOrders(
        @Path("emp_id") cleaningStaffId: Int,
    ): Response<List<RetrofitOrder>>

    @POST("provision")
    suspend fun postOrder(
        @Body order: RetrofitOrderBody,
    ): Response<RetrofitOrder>

    @DELETE("provision/{id}")
    suspend fun deleteOrder(
        @Path("id") orderId: Int,
    ): Response<Any>
}
