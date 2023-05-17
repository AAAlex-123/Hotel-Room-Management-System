package alexman.hrms.feature.login

import alexman.hrms.core.data.repository.CleaningStaffRepositoryImplementation
import alexman.hrms.core.designsystem.PreviewBoth
import alexman.hrms.core.designsystem.component.MediumDisplayText
import alexman.hrms.core.designsystem.component.HousekeepingTopAppBar
import alexman.hrms.core.designsystem.component.InputField
import alexman.hrms.core.designsystem.component.ButtonWithText
import alexman.hrms.core.designsystem.component.ErrorLabel
import alexman.hrms.core.designsystem.theme.HousekeepingTheme
import alexman.hrms.core.network.fake.FakeNetworkDataSource
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.wrapContentSize
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Surface
import androidx.compose.runtime.Composable
import androidx.compose.runtime.remember
import androidx.compose.runtime.rememberCoroutineScope
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext

@PreviewBoth
@Composable
fun LoginScreenPreview() {
    HousekeepingTheme {
        LoginScreen(
            LoginViewModel(
                // do not replace with actual network data source
                // otherwise preview won't work as intended
                CleaningStaffRepositoryImplementation(FakeNetworkDataSource()),
            ),
            onNavigateToHome = { _: Int -> }
        )
    }
}

@Composable
fun LoginScreen(
    loginViewModel: LoginViewModel,
    onNavigateToHome: (Int) -> Unit,
) {
    suspend fun authenticate(username: String, password: String): Int =
        withContext(Dispatchers.IO) {
            return@withContext loginViewModel.authenticate(username, password)
        }

    LoginScreenContent(
        onAuthenticate = ::authenticate,
        onNavigateToHome = onNavigateToHome,
    )
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun LoginScreenContent(
    onAuthenticate: suspend (String, String) -> Int,
    onNavigateToHome: (Int) -> Unit,
) {
    var username by remember { mutableStateOf("") }
    var password by remember { mutableStateOf("") }

    var success by remember { mutableStateOf(true) }

    val coroutineScope = rememberCoroutineScope()

    Scaffold (
        topBar = { HousekeepingTopAppBar(text = "Login") },
    ) {
        paddingValues ->
            Surface (
                modifier = Modifier
                    .padding(paddingValues)
            ) {
                Column {
                    Column(
                        modifier = Modifier
                            .fillMaxSize(),
                        verticalArrangement = Arrangement.spacedBy(
                            48.dp,
                            Alignment.CenterVertically
                        ),
                        horizontalAlignment = Alignment.CenterHorizontally,
                    ) {
                        Column(
                            horizontalAlignment = Alignment.CenterHorizontally,
                        ) {
                            MediumDisplayText(text = "Staff ID")
                            InputField(
                                value = username,
                                onValueChange = { username = it },
                                placeholderText = "Staff ID",
                                isError = !success,
                                modifier = Modifier
                                    .wrapContentSize(Alignment.Center),
                            )
                        }
                        Column(
                            horizontalAlignment = Alignment.CenterHorizontally,
                        ) {
                            MediumDisplayText(text = "Password")
                            InputField(
                                value = password,
                                onValueChange = { password = it },
                                placeholderText = "Password",
                                isError = !success,
                                modifier = Modifier
                                    .wrapContentSize(Alignment.Center),
                            )
                        }
                        ButtonWithText(
                            text = "Submit",
                            onClick = {
                                coroutineScope.launch {
                                    val cleaningStaffId = onAuthenticate(username, password)

                                    success = cleaningStaffId != -1

                                    if (success) {
                                        onNavigateToHome(cleaningStaffId)
                                    }
                                }
                            },
                        )
                        if (!success) {
                            ErrorLabel(
                                text = "Invalid Credentials",
                            )
                        }
                    }
                }
            }
    }
}
