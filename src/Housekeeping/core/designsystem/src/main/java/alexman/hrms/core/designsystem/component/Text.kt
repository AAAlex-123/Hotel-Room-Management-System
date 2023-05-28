package alexman.hrms.core.designsystem.component

import alexman.hrms.core.designsystem.PreviewLight
import alexman.hrms.core.designsystem.theme.BlackTransparent33
import alexman.hrms.core.designsystem.theme.HrmsTheme
import alexman.hrms.core.designsystem.theme.HrmsTypography
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.style.TextAlign
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
    textAlign: TextAlign? = null,
) {
    Text(
        text = text,
        style = HrmsTypography.displayLarge,
        modifier = modifier,
        textAlign = textAlign,
    )
}

@Composable
fun MediumDisplayText(
    text: String,
    modifier: Modifier = Modifier,
    textAlign: TextAlign? = null,
) {
    Text(
        text = text,
        style = HrmsTypography.displayMedium,
        modifier = modifier,
        textAlign = textAlign,
    )
}

@Composable
fun SmallDisplayText(
    text: String,
    modifier: Modifier = Modifier,
    textAlign: TextAlign? = null,
) {
    Text(
        text = text,
        style = HrmsTypography.displaySmall,
        modifier = modifier,
        textAlign = textAlign,
    )
}

@Composable
fun LargeBodyText(
    text: String,
    modifier: Modifier = Modifier,
    textAlign: TextAlign? = null,
) {
    Text(
        text = text,
        style = HrmsTypography.bodyLarge,
        modifier = modifier,
        textAlign = textAlign,
    )
}

@Composable
fun MediumBodyText(
    text: String,
    modifier: Modifier = Modifier,
    textAlign: TextAlign? = null,
) {
    Text(
        text = text,
        style = HrmsTypography.bodyMedium,
        modifier = modifier,
        textAlign = textAlign,
    )
}

@Composable
fun StrikethroughLargeBodyText(
    text: String,
    modifier: Modifier = Modifier,
    textAlign: TextAlign? = null,
) {
    Text(
        text = text,
        style = HrmsTypography.bodyLarge.copy(
            color = BlackTransparent33,
            textDecoration = TextDecoration.LineThrough,
        ),
        modifier = modifier,
        textAlign = textAlign,
    )
}

@Composable
fun StrikethroughMediumBodyText(
    text: String,
    modifier: Modifier = Modifier,
    textAlign: TextAlign? = null,
) {
    Text(
        text = text,
        style = HrmsTypography.bodyMedium.copy(
            color = BlackTransparent33,
            textDecoration = TextDecoration.LineThrough,
        ),
        modifier = modifier,
        textAlign = textAlign,
    )
}

@Composable
fun ErrorLabel(
    text: String,
    textAlign: TextAlign? = null,
) {
    Text(
        text = text,
        color = MaterialTheme.colorScheme.error,
        style = HrmsTypography.labelLarge,
        textAlign = textAlign,
    )
}
