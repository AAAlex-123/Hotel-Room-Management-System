package alexman.hrms.core.network.retrofit

import alexman.hrms.core.network.retrofit.model.RetrofitAuthBody
import alexman.hrms.core.network.retrofit.model.RetrofitAuthResult
import alexman.hrms.core.network.retrofit.model.RetrofitCleaningStaff
import alexman.hrms.core.network.retrofit.model.RetrofitNote
import alexman.hrms.core.network.retrofit.model.RetrofitNoteBody
import alexman.hrms.core.network.retrofit.model.RetrofitOrder
import alexman.hrms.core.network.retrofit.model.RetrofitOrderBody
import alexman.hrms.core.network.retrofit.model.RetrofitOrderUpdateBody
import alexman.hrms.core.network.retrofit.model.RetrofitRoom
import alexman.hrms.core.network.retrofit.model.RetrofitRoomBody
import retrofit2.Response
import retrofit2.http.Body
import retrofit2.http.DELETE
import retrofit2.http.GET
import retrofit2.http.POST
import retrofit2.http.PUT
import retrofit2.http.Path
import retrofit2.http.Query

internal interface HrmsApi {

    @POST("auth")
    suspend fun authenticate(
        @Body auth: RetrofitAuthBody,
    ): Response<RetrofitAuthResult>

    @GET("employee/{id}")
    suspend fun getCleaningStaff(
        @Path("id") cleaningStaffId: Int,
    ): Response<RetrofitCleaningStaff>

    @GET("chambermaid")
    suspend fun getCleaningLadies(
        @Query("cleaning_staff_id") housekeeperId: Int,
    ): Response<List<RetrofitCleaningStaff>>

    @GET("provision")
    suspend fun getOrders(
        @Query("employee_id") cleaningStaffId: Int,
    ): Response<List<RetrofitOrder>>

    @POST("provision")
    suspend fun postOrder(
        @Body order: RetrofitOrderBody,
    ): Response<RetrofitOrder>

    @PUT("provision/{id}")
    suspend fun updateOrder(
        @Path("id") orderId: Int,
        @Body order: RetrofitOrderUpdateBody,
    ): Response<RetrofitOrder>

    @DELETE("provision/{id}")
    suspend fun deleteOrder(
        @Path("id") orderId: Int,
    ): Response<Any>

    @GET("room")
    suspend fun getRooms(
        @Query("chambermaid_id") cleaningStaffId: Int,
    ): Response<List<RetrofitRoom>>

    @GET("room/{id}")
    suspend fun getSingleRoom(
        @Path("id") roomId: String,
    ): Response<RetrofitRoom>

    @PUT("room/{id}")
    suspend fun updateRoom(
        @Path("id") roomId: String,
        @Body room: RetrofitRoomBody,
    ): Response<RetrofitRoom>

    @GET("note")
    suspend fun getNotes(
        @Query("room_id") roomId: String,
    ): Response<List<RetrofitNote>>

    @POST("note")
    suspend fun postNote(
        @Body note: RetrofitNoteBody
    ): Response<RetrofitNote>

    @DELETE("note/{id}")
    suspend fun deleteNote(
        @Path("id") noteId: Int,
    ): Response<Any>
}
