package alexman.hrms.feature.login

import alexman.hrms.core.data.repository.AuthenticationQuery
import alexman.hrms.core.data.repository.CleaningStaffRepository
import androidx.lifecycle.ViewModel

class LoginViewModel(
    private val cleaningStaffRepository: CleaningStaffRepository,
) : ViewModel() {
    suspend fun authenticate(login: String, password: String): Int =
        cleaningStaffRepository.authenticate(
            AuthenticationQuery(
                login = login,
                password = password,
            ),
        )
}
