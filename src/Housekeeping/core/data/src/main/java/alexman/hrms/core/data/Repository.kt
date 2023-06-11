package alexman.hrms.core.data

import alexman.hrms.core.data.repository.CleaningStaffRepository
import alexman.hrms.core.data.repository.CleaningStaffRepositoryImplementation
import alexman.hrms.core.data.repository.OrderRepository
import alexman.hrms.core.data.repository.OrderRepositoryImplementation
import alexman.hrms.core.data.repository.RoomRepository
import alexman.hrms.core.data.repository.RoomRepositoryImplementation
import alexman.hrms.core.network.HrmsNetworkDataSource
import alexman.hrms.core.network.fake.FakeNetworkDataSource
import kotlinx.coroutines.Dispatchers
import kotlin.time.DurationUnit
import kotlin.time.toDuration

object Repository {

    private val datasource: HrmsNetworkDataSource = FakeNetworkDataSource()
    private val ioDispatcher = Dispatchers.IO
    private val refreshPeriod = 10.toDuration(DurationUnit.SECONDS)

    val cleaningStaff: CleaningStaffRepository = CleaningStaffRepositoryImplementation(
        datasource, ioDispatcher,
    )
    val order: OrderRepository = OrderRepositoryImplementation(
        datasource, ioDispatcher, refreshPeriod,
    )
    val room: RoomRepository = RoomRepositoryImplementation(
        datasource, ioDispatcher, refreshPeriod,
    )
}
