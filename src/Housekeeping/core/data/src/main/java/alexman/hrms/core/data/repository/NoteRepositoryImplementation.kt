package alexman.hrms.core.data.repository

import alexman.hrms.core.data.model.asExternalModel
import alexman.hrms.core.data.model.asUpstreamNetworkNoteDetails
import alexman.hrms.core.model.data.Note
import alexman.hrms.core.model.data.UpstreamNoteDetails
import alexman.hrms.core.network.HrmsNetworkDataSource
import alexman.hrms.core.network.model.NetworkNote
import kotlinx.coroutines.CoroutineDispatcher
import kotlinx.coroutines.withContext

class NoteRepositoryImplementation (
    private val ioDispatcher: CoroutineDispatcher,
    private val datasource: HrmsNetworkDataSource,
) : NoteRepository {

    override suspend fun getNotes(query: NoteQuery): List<Note> =
        // TODO("sort out the Flow stuff")
        /*flow {
            emit( */
        /**/withContext(ioDispatcher) {
            datasource.getNotes(query.roomId)
                .map(NetworkNote::asExternalModel)
        /**/}
            /* )
        }.flowOn(ioDispatcher) */

    override suspend fun addNote(upstreamNoteDetails: UpstreamNoteDetails) =
        withContext(ioDispatcher) {
            datasource.addNote(upstreamNoteDetails.asUpstreamNetworkNoteDetails())
        }
}
