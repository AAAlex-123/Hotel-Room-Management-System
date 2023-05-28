package alexman.hrms.core.data

import alexman.hrms.core.data.repository.CleaningStaffRepository
import alexman.hrms.core.data.repository.CleaningStaffRepositoryImplementation
import alexman.hrms.core.data.repository.OrderRepository
import alexman.hrms.core.data.repository.OrderRepositoryImplementation
import alexman.hrms.core.data.repository.RoomRepository
import alexman.hrms.core.data.repository.RoomRepositoryImplementation
import alexman.hrms.core.network.HrmsNetworkDataSource
import alexman.hrms.core.network.fake.FakeNetworkDataSource

object Repository {

    private val datasource: HrmsNetworkDataSource = FakeNetworkDataSource()

    val cleaningStaff: CleaningStaffRepository = CleaningStaffRepositoryImplementation(datasource)
    val order: OrderRepository = OrderRepositoryImplementation(datasource)
    val room: RoomRepository = RoomRepositoryImplementation(datasource)
}
