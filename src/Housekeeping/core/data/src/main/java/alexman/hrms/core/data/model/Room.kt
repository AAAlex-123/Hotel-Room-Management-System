package alexman.hrms.core.data.model

import alexman.hrms.core.model.data.*
import alexman.hrms.core.network.model.NetworkRoom
import alexman.hrms.core.network.model.UpstreamNetworkRoomUpdateDetails

fun NetworkRoom.asExternalModel() = Room(
    id = id,
    cleanState = when(cleanState) {
        0 -> CleanState.DIRTY
        1 -> CleanState.PENDING_UPLOAD
        2 -> CleanState.PENDING_CHECK
        3 -> CleanState.CLEAN
        4 -> CleanState.INSPECTED
        else -> error("Invalid clean state $cleanState")
    },
    occupied = if (occupied) Occupied.OCCUPIED else Occupied.VACANT,
    cleanType = when(cleanType) {
        0 -> CleanType.NORMAL
        1 -> CleanType.DEEP
        else -> error("Invalid clean type $cleanType")
    },
)

fun UpstreamRoomUpdateDetails.asUpstreamNetworkRoomUpdateDetails() =
    UpstreamNetworkRoomUpdateDetails(
        id = id,
        cleanState = when(cleanState) {
            CleanState.DIRTY -> 0
            CleanState.PENDING_UPLOAD -> 1
            CleanState.PENDING_CHECK -> 2
            CleanState.CLEAN -> 3
            CleanState.INSPECTED -> 4
        }
    )

/*
TODO("figure out if necessary, then fix")

fun Room.asNetworkRoom() = NetworkRoom(
    number = number,
    notes = notes,
    cleanState = cleanState,
    occupied = occupied,
    cleanType = cleanType,
)
*/
