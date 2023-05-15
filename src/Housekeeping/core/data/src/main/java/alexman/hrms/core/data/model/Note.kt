package alexman.hrms.core.data.model

import alexman.hrms.core.model.data.CleaningStaffType
import alexman.hrms.core.model.data.Note
import alexman.hrms.core.model.data.UpstreamNoteDetails
import alexman.hrms.core.network.model.NetworkNote
import alexman.hrms.core.network.model.UpstreamNetworkNoteDetails

fun NetworkNote.asExternalModel() = Note(
    id = id,
    roomId = roomId,
    cleaningStaffId = cleaningStaffId,
    noteData = noteData,
)

fun UpstreamNoteDetails.asUpstreamNetworkNoteDetails() = UpstreamNetworkNoteDetails(
    roomId = roomId,
    cleaningStaffId = cleaningStaffId,
    noteData = noteData,
)
