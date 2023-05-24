package alexman.hrms.core.designsystem.component

import alexman.hrms.core.designsystem.PreviewLight
import alexman.hrms.core.designsystem.theme.HousekeepingTheme
import alexman.hrms.core.designsystem.theme.HousekeepingTypography
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp

@PreviewLight
@Composable
private fun InputFieldPreview() {
    val (value, setValue) = remember { mutableStateOf("") }

    HousekeepingTheme {
        Column(
            verticalArrangement = Arrangement.spacedBy(16.dp)
        ) {
            TextInputField(
                value = value,
                onValueChange = setValue,
                placeholderText = "placeholder text",
                isError = false,
            )
            TextInputField(
                value = value,
                onValueChange = setValue,
                placeholderText = "placeholder text",
                isError = true,
            )
        }
    }
}

@Composable
fun TextInputField(
    value: String,
    onValueChange: (String) -> Unit,
    placeholderText: String,
    modifier: Modifier = Modifier,
    isError: Boolean = false,
    singleLine: Boolean = true,
) {
    OutlinedTextField(
        value = value,
        onValueChange = onValueChange,
        modifier = modifier,
        placeholder = {
            Text(
                text = placeholderText,
                style = HousekeepingTypography.labelMedium,
            )
        },
        isError = isError,
        singleLine = singleLine,
    )
}
