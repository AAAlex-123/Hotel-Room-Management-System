package alexman.hrms.feature.login

import alexman.hrms.core.designsystem.PreviewLight
import alexman.hrms.core.designsystem.SizeVariation
import alexman.hrms.core.designsystem.component.ButtonWithText
import alexman.hrms.core.designsystem.component.ErrorLabel
import alexman.hrms.core.designsystem.component.HrmsScaffold
import alexman.hrms.core.designsystem.component.TextInputField
import alexman.hrms.core.designsystem.component.MediumDisplayText
import alexman.hrms.core.designsystem.theme.HrmsTheme
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.wrapContentSize
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.rememberCoroutineScope
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.unit.dp
import kotlinx.coroutines.launch

@PreviewLight
@Composable
private fun LoginScreenContentPreview() {
    HrmsTheme {
        LoginScreenContent(
            onAuthenticate = { _: String, _: String -> -1 },
            onNavigateToHome = { },
        )
    }
}

@Composable
internal fun LoginScreen(
    loginViewModel: LoginViewModel,
    onNavigateToHome: (Int) -> Unit,
) {
    suspend fun authenticate(username: String, password: String): Int =
        loginViewModel.authenticate(username, password)

    LoginScreenContent(
        onAuthenticate = ::authenticate,
        onNavigateToHome = onNavigateToHome,
    )
}

@Composable
private fun LoginScreenContent(
    onAuthenticate: suspend (String, String) -> Int,
    onNavigateToHome: (Int) -> Unit,
) {
    var username by remember { mutableStateOf("") }
    var password by remember { mutableStateOf("") }

    var success by remember { mutableStateOf(true) }

    val coroutineScope = rememberCoroutineScope()

    HrmsScaffold(
        topBarText = stringResource(R.string.topbar_login),
    ) {
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
                verticalArrangement = Arrangement.spacedBy(8.dp),
                horizontalAlignment = Alignment.CenterHorizontally,
            ) {
                MediumDisplayText(text = stringResource(R.string.staffId))
                TextInputField(
                    value = username,
                    onValueChange = { username = it },
                    placeholderText = stringResource(R.string.staffId_placeholder),
                    isError = !success,
                    modifier = Modifier
                        .wrapContentSize(Alignment.Center),
                )
            }
            Column(
                verticalArrangement = Arrangement.spacedBy(8.dp),
                horizontalAlignment = Alignment.CenterHorizontally,
            ) {
                MediumDisplayText(text = stringResource(R.string.password))
                TextInputField(
                    value = password,
                    onValueChange = { password = it },
                    placeholderText = stringResource(R.string.password_placeholder),
                    isError = !success,
                    modifier = Modifier
                        .wrapContentSize(Alignment.Center),
                )
            }
            ButtonWithText(
                text = stringResource(R.string.login_button),
                onClick = {
                    coroutineScope.launch {
                        val cleaningStaffId = onAuthenticate(username, password)

                        success = cleaningStaffId != -1
                        if (success)
                            onNavigateToHome(cleaningStaffId)
                    }
                },
                sizeVariation = SizeVariation.PRIMARY,
            )
            if (!success) {
                ErrorLabel(
                    text = stringResource(R.string.login_error),
                )
            }
        }
    }
}
