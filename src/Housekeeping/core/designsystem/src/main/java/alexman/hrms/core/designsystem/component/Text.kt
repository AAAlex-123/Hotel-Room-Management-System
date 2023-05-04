package alexman.hrms.core.designsystem.component

import alexman.hrms.core.designsystem.PreviewLight
import alexman.hrms.core.designsystem.theme.HousekeepingTheme
import alexman.hrms.core.designsystem.theme.HousekeepingTypography
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable

@PreviewLight
@Composable
private fun LargeDisplayTextPreview() {
    HousekeepingTheme {
        LargeDisplayText("Display Large")
    }
}

@PreviewLight
@Composable
private fun MediumDisplayTextPreview() {
    HousekeepingTheme {
        MediumDisplayText("Display Medium")
    }
}

@PreviewLight
@Composable
private fun SmallDisplayTextPreview() {
    HousekeepingTheme {
        SmallDisplayText("Display Small")
    }
}

@PreviewLight
@Composable
private fun LargeBodyTextPreview() {
    HousekeepingTheme {
        LargeBodyText("Body Large")
    }
}

@PreviewLight
@Composable
private fun ErrorLabelPreview() {
    HousekeepingTheme {
        ErrorLabel("Error Label")
    }
}

@Composable
fun LargeDisplayText(
    text: String
) {
    Text(
        text = text,
        style = HousekeepingTypography.displayLarge,
    )
}

@Composable
fun MediumDisplayText(
    text: String
) {
    Text(
        text = text,
        style = HousekeepingTypography.displayMedium,
    )
}

@Composable
fun ErrorLabel(
    text: String
) {
    Text(
        text = text,
        color = MaterialTheme.colorScheme.error,
        style = HousekeepingTypography.labelLarge,
    )
}
