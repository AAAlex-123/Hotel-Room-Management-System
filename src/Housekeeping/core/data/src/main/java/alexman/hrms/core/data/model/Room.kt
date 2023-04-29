package alexman.hrms.core.data.model

import alexman.hrms.core.model.data.*
import alexman.hrms.core.network.model.NetworkRoom

// TODO("add proper Notes")
fun NetworkRoom.asExternalModel(notes: List<Note>) = Room(
    id = id,
    notes = notes,
    cleanState = when(cleanState) {
        0 -> CleanState.DIRTY
        1 -> CleanState.PENDING_UPLOAD
        2 -> CleanState.PENDING_CHECK
        3 -> CleanState.CLEAN
        4 -> CleanState.INSPECTED
        else -> error("invalid clean state $cleanState")
    },
    occupied = if (occupied) Occupied.OCCUPIED else Occupied.VACANT,
    cleanType = when(cleanType) {
        0 -> CleanType.NORMAL
        1 -> CleanType.DEEP
        else -> error("invalid clean type $cleanType")
    },
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
