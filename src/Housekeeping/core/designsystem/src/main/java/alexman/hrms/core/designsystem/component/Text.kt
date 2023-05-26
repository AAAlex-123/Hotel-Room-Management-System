package alexman.hrms.core.designsystem.component

import alexman.hrms.core.designsystem.PreviewLight
import alexman.hrms.core.designsystem.theme.BlackTransparent33
import alexman.hrms.core.designsystem.theme.HrmsTheme
import alexman.hrms.core.designsystem.theme.HrmsTypography
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.style.TextDecoration

@PreviewLight
@Composable
private fun LargeDisplayTextPreview() {
    HrmsTheme {
        LargeDisplayText("Display Large")
    }
}

@PreviewLight
@Composable
private fun MediumDisplayTextPreview() {
    HrmsTheme {
        MediumDisplayText("Display Medium")
    }
}

@PreviewLight
@Composable
private fun SmallDisplayTextPreview() {
    HrmsTheme {
        SmallDisplayText("Display Small")
    }
}

@PreviewLight
@Composable
private fun LargeBodyTextPreview() {
    HrmsTheme {
        LargeBodyText("Body Large")
    }
}

@PreviewLight
@Composable
private fun MediumBodyTextPreview() {
    HrmsTheme {
        MediumBodyText("Body Medium")
    }
}

@PreviewLight
@Composable
private fun StrikethroughLargeBodyTextPreview() {
    HrmsTheme {
        StrikethroughLargeBodyText("Body Strikethrough Large")
    }
}

@PreviewLight
@Composable
private fun StrikethroughMediumBodyTextPreview() {
    HrmsTheme {
        StrikethroughMediumBodyText("Body Strikethrough Medium")
    }
}

@PreviewLight
@Composable
private fun ErrorLabelPreview() {
    HrmsTheme {
        ErrorLabel("Error Label")
    }
}

@Composable
fun LargeDisplayText(
    text: String,
    modifier: Modifier = Modifier,
) {
    Text(
        text = text,
        style = HrmsTypography.displayLarge,
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
        style = HrmsTypography.displayMedium,
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
        style = HrmsTypography.displaySmall,
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
        style = HrmsTypography.bodyLarge,
        modifier = modifier,
    )
}

@Composable
fun MediumBodyText(
    text: String,
    modifier: Modifier = Modifier,
) {
    Text(
        text = text,
        style = HrmsTypography.bodyMedium,
        modifier = modifier,
    )
}

@Composable
fun StrikethroughLargeBodyText(
    text: String,
    modifier: Modifier = Modifier,
) {
    Text(
        text = text,
        style = HrmsTypography.bodyLarge.copy(
            color = BlackTransparent33,
            textDecoration = TextDecoration.LineThrough,
        ),
        modifier = modifier,
    )
}

@Composable
fun StrikethroughMediumBodyText(
    text: String,
    modifier: Modifier = Modifier,
) {
    Text(
        text = text,
        style = HrmsTypography.bodyMedium.copy(
            color = BlackTransparent33,
            textDecoration = TextDecoration.LineThrough,
        ),
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
        style = HrmsTypography.labelLarge,
    )
}
