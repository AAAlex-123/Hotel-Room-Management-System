package alexman.hrms.core.data.model

import alexman.hrms.core.model.data.CleanState
import alexman.hrms.core.model.data.CleanType
import alexman.hrms.core.model.data.Occupied
import alexman.hrms.core.model.data.Room
import alexman.hrms.core.model.data.UpstreamRoomUpdateDetails
import alexman.hrms.core.network.model.NetworkRoom
import alexman.hrms.core.network.model.UpstreamNetworkRoomUpdateDetails

fun NetworkRoom.asExternalModel() = Room(
    id = id,
    cleanState = when (cleanState) {
        "DIRTY" -> CleanState.DIRTY
        "PENDING" -> CleanState.PENDING
        "CLEAN" -> CleanState.CLEAN
        else -> error("Invalid clean state $cleanState")
    },
    occupied = if (occupied) Occupied.OCCUPIED else Occupied.VACANT,
    cleanType = when (cleanType) {
        "DAILY" -> CleanType.NORMAL
        "DEEP" -> CleanType.DEEP
        else -> error("Invalid clean type $cleanType")
    },
)

fun UpstreamRoomUpdateDetails.asUpstreamNetworkRoomUpdateDetails() =
    UpstreamNetworkRoomUpdateDetails(
        id = id,
        cleanState = when (cleanState) {
            CleanState.DIRTY -> "DIRTY"
            CleanState.PENDING -> "PENDING"
            CleanState.CLEAN -> "CLEAN"
        }
    )
