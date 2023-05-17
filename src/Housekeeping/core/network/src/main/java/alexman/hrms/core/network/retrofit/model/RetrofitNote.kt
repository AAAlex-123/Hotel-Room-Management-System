package alexman.hrms.core.network.retrofit.model

import alexman.hrms.core.network.model.NetworkNote
import alexman.hrms.core.network.model.UpstreamNetworkNoteDetails
import com.squareup.moshi.Json

data class RetrofitNote(
    @Json(name = "note_id") val id: Int,
    @Json(name = "room_id") val roomId: Int,
    @Json(name = "cleaning_staff_id") val cleaningStaffId: Int,
    @Json(name = "note_data") val noteData: String,
) {
    fun asNetworkNote() = NetworkNote(
        id = id,
        roomId = roomId,
        cleaningStaffId = cleaningStaffId,
        noteData = noteData,
    )
}

data class RetrofitNoteBody(
    val room_id: Int,
    val cleaning_staff_id: Int,
    val note_data: String,
)

fun UpstreamNetworkNoteDetails.asRetrofitNoteBody() =
    RetrofitNoteBody(
        room_id = roomId,
        cleaning_staff_id = cleaningStaffId,
        note_data = noteData,
    )
