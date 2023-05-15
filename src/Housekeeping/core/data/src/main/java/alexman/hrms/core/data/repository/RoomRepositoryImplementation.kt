package alexman.hrms.core.data.repository

import alexman.hrms.core.data.model.asExternalModel
import alexman.hrms.core.data.model.asUpstreamNetworkNoteDetails
import alexman.hrms.core.data.model.asUpstreamNetworkRoomUpdateDetails
import alexman.hrms.core.model.data.Note
import alexman.hrms.core.model.data.Room
import alexman.hrms.core.model.data.UpstreamNoteDetails
import alexman.hrms.core.model.data.UpstreamRoomUpdateDetails
import alexman.hrms.core.network.HrmsNetworkDataSource
import alexman.hrms.core.network.model.UpstreamNetworkRoomUpdateDetails
import kotlinx.coroutines.CoroutineDispatcher
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.flow
import kotlinx.coroutines.flow.flowOn

class RoomRepositoryImplementation (
    private val ioDispatcher: CoroutineDispatcher,
    private val datasource: HrmsNetworkDataSource,
) : RoomRepository {

    override suspend fun getSingleRoom(singleRoomQuery: SingleRoomQuery): Flow<Room> {
        // TODO("lmao fix, do like OrderRepositoryImplementation#getOrders(OrderQuery)")
        return flow {
            emit(
                datasource.getSingleRoom(singleRoomQuery.roomId).body!!.asExternalModel()
            )
        }.flowOn(ioDispatcher)
    }

    override suspend fun getRooms(query: RoomQuery): Flow<List<Room>> {
        // TODO("lmao fix, do like OrderRepositoryImplementation#getOrders(OrderQuery)")
        return flow {
            emit(
                datasource.getRooms(query.cleaningStaffId).body!!
                    .map { it.asExternalModel() },
            )
        }.flowOn(ioDispatcher)
    }

    override suspend fun updateRoomState(upstreamRoomUpdateDetails: UpstreamRoomUpdateDetails) {
        // TODO("lmao fix, do like OrderRepository")
        datasource.updateRoomState(
            upstreamRoomUpdateDetails.asUpstreamNetworkRoomUpdateDetails()
        )
    }

    override suspend fun getNotes(query: NoteQuery): Flow<List<Note>> {
        // TODO("lmao fix, do like OrderRepositoryImplementation#getOrders(OrderQuery)")
        return flow {
            emit(
                datasource.getNotes(query.roomId).body!!
                    .map{ it.asExternalModel() }
            )
        }.flowOn(ioDispatcher)
    }

    override suspend fun addNote(upstreamNoteDetails: UpstreamNoteDetails) {
        // TODO("lmao fix, do like OrderRepositoryImplementation#placeOrder(Int)")
        datasource.addNote(
            upstreamNoteDetails.asUpstreamNetworkNoteDetails()
        )
    }

    override suspend fun deleteNote(noteId: Int) {
        // TODO("lmao fix, do like OrderRepositoryImplementation#deleteOrder(Int)")
        datasource.deleteNote(noteId)
    }
}
