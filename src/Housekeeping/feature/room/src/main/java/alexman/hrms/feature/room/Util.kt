package alexman.hrms.feature.room

import alexman.hrms.core.model.data.CleanState
import alexman.hrms.core.model.data.CleanType
import alexman.hrms.core.model.data.Room
import androidx.compose.ui.graphics.Color

internal fun <T : Enum<T>> Enum<T>.toSentenceCase() =
    name.lowercase().replaceFirstChar { it.uppercase() }

internal fun Room?.color() = when (this?.cleanState) {
        CleanState.DIRTY -> Color.Red
        CleanState.PENDING -> Color.Yellow
        CleanState.CLEAN -> when (this.cleanType) {
            CleanType.NORMAL -> Color.Green
            CleanType.DEEP -> Color.Cyan
        }
        else -> Color.Transparent
    }
