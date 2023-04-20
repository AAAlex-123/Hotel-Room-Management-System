package alexman.hrms.core.data.repository

import alexman.hrms.core.data.model.asExternalModel
import alexman.hrms.core.data.model.asNetworkRoom
import alexman.hrms.core.model.data.Room
import alexman.hrms.core.network.HrmsNetworkDataSource
import alexman.hrms.core.network.model.NetworkRoom
import kotlinx.coroutines.CoroutineDispatcher
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.flow
import kotlinx.coroutines.flow.flowOn
import kotlinx.coroutines.withContext

class RoomRepositoryImplementation (
    private val ioDispatcher: CoroutineDispatcher,
    private val datasource: HrmsNetworkDataSource,
) : RoomRepository {

    override fun getRooms(query: RoomQuery): Flow<List<Room>> =
        flow {
            emit(
                datasource.getRooms(query.housekeeperId)
                    .map(NetworkRoom::asExternalModel),
            )
        }.flowOn(ioDispatcher)

    override suspend fun updateRoom(room: Room) =
        withContext(ioDispatcher) {
            datasource.updateRoom(room.asNetworkRoom())
        }
}
