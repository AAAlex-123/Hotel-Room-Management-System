package alexman.hrms.core.model.data

import alexman.hrms.core.network.model.CleanState
import alexman.hrms.core.network.model.CleanType

data class Room(
    val number: Int,
    val comments: List<String>,
    val cleanState: CleanState,
    val occupied: Boolean,
    val cleanType: CleanType,
)
