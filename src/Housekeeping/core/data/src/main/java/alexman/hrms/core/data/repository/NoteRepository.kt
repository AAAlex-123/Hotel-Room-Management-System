package alexman.hrms.core.data.repository

import alexman.hrms.core.model.data.Note
import alexman.hrms.core.model.data.UpstreamNoteDetails

data class NoteQuery(
    val roomId: Int,
)

interface NoteRepository {

    suspend fun getNotes(query: NoteQuery): List<Note>

    suspend fun addNote(upstreamNoteDetails: UpstreamNoteDetails)
}