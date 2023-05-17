package alexman.hrms.feature.room

internal fun <T: Enum<T>> Enum<T>.toSentenceCase() =
    name.lowercase().replaceFirstChar { it.uppercase() }
