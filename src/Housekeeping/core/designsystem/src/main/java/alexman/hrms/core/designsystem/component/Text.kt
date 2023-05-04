package alexman.hrms.core.designsystem.component

import alexman.hrms.core.designsystem.PreviewLight
import alexman.hrms.core.designsystem.theme.HousekeepingTheme
import alexman.hrms.core.designsystem.theme.HousekeepingTypography
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier

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

// TODO("figure out what is going on with typography")

@Composable
fun LargeDisplayText(
    text: String,
    modifier: Modifier = Modifier,
) {
    Text(
        text = text,
        style = HousekeepingTypography.displayLarge,
        modifier = modifier,
    )
}

@Composable
fun MediumDisplayText(
    text: String,
    modifier: Modifier = Modifier,
) {
    Text(
        text = text,
        style = HousekeepingTypography.displayMedium,
        modifier = modifier,
    )
}

@Composable
fun SmallDisplayText(
    text: String,
    modifier: Modifier = Modifier,
) {
    Text(
        text = text,
        style = HousekeepingTypography.displaySmall,
        modifier = modifier,
    )
}

@Composable
fun LargeBodyText(
    text: String,
    modifier: Modifier = Modifier,
) {
    Text(
        text = text,
        style = HousekeepingTypography.bodyLarge,
        modifier = modifier,
    )
}

@Composable
fun ErrorLabel(
    text: String,
) {
    Text(
        text = text,
        color = MaterialTheme.colorScheme.error,
        style = HousekeepingTypography.labelLarge,
    )
}
