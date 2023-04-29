package alexman.hrms.core.data.repository

import alexman.hrms.core.data.model.asExternalModel
import alexman.hrms.core.model.data.Room
import alexman.hrms.core.network.HrmsNetworkDataSource
import kotlinx.coroutines.CoroutineDispatcher
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.flow
import kotlinx.coroutines.flow.flowOn

class RoomRepositoryImplementation (
    private val ioDispatcher: CoroutineDispatcher,
    private val datasource: HrmsNetworkDataSource,
) : RoomRepository {

    override fun getRooms(query: RoomQuery): Flow<List<Room>> =
        flow {
            emit(
                datasource.getRooms(query.housekeeperId)
                    .map {
                         it.asExternalModel(listOf()) // TODO("add proper Notes")
                    },
            )
        }.flowOn(ioDispatcher)

    /*
    TODO("implement after figuring out interface")

    override suspend fun updateRoom(room: Room) =
        withContext(ioDispatcher) {
            datasource.updateRoom(room.asNetworkRoom())
        }
    */
}
