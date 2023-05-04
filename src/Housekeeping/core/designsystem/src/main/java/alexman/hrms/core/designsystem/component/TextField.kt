package alexman.hrms.core.designsystem.component

import alexman.hrms.core.designsystem.PreviewLight
import alexman.hrms.core.designsystem.theme.HousekeepingTheme
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.ui.Modifier
import alexman.hrms.core.designsystem.theme.HousekeepingTypography
import androidx.compose.foundation.layout.wrapContentSize
import androidx.compose.ui.Alignment

@PreviewLight
@Composable
private fun InputFieldPreview() {
    val (value, setValue) = remember { mutableStateOf("") }

    HousekeepingTheme {
        Column (
            verticalArrangement = Arrangement.spacedBy(16.dp)
        ) {
            InputField(
                value = value,
                onValueChange = setValue,
                placeholderText = "placeholder text",
                isError = false,
            )
            InputField(
                value = value,
                onValueChange = setValue,
                placeholderText = "placeholder text",
                isError = true,
            )
        }
    }
}

@Composable
fun InputField(
    value: String,
    onValueChange: (String) -> Unit,
    placeholderText: String,
    modifier: Modifier = Modifier,
    align: Alignment = Alignment.Center,
    isError: Boolean = false,
) {
    OutlinedTextField(
        value = value,
        onValueChange = onValueChange,
        modifier = modifier.wrapContentSize(align),
        placeholder = {
            Text(
                text = placeholderText,
                style = HousekeepingTypography.labelMedium,
            )
        },
        isError = isError,
    )
}
