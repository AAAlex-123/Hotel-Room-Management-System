package alexman.hrms.core.designsystem.component

import alexman.hrms.core.designsystem.theme.HousekeepingTheme
import alexman.hrms.core.designsystem.theme.HousekeepingTypography
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.tooling.preview.Preview

@Preview
@Composable
private fun LargeDisplayTextPreview() {
    HousekeepingTheme (darkTheme = false) {
        LargeDisplayText("Display Large")
    }
}

@Preview
@Composable
private fun MediumDisplayTextPreview() {
    HousekeepingTheme (darkTheme = false) {
        MediumDisplayText("Display Medium")
    }
}

@Composable
fun LargeDisplayText(
    text: String
) {
    Text(text = text, style = HousekeepingTypography.displayLarge)
}

@Composable
fun MediumDisplayText(
    text: String
) {
    Text(text = text, style = HousekeepingTypography.displayMedium)
}
