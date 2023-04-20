package alexman.hrms.core.data.model

import alexman.hrms.core.model.data.Room
import alexman.hrms.core.network.model.NetworkRoom

fun NetworkRoom.asExternalModel() = Room(
    number = number,
    comments = comments,
    cleanState = cleanState,
    occupied = occupied,
    cleanType = cleanType,
)

fun Room.asNetworkRoom() = NetworkRoom(
    number = number,
    comments = comments,
    cleanState = cleanState,
    occupied = occupied,
    cleanType = cleanType,
)
