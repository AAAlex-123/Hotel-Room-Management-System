package alexman.hrms.core.designsystem.component

import alexman.hrms.core.designsystem.PreviewLight
import alexman.hrms.core.designsystem.SizeVariation
import alexman.hrms.core.designsystem.theme.HrmsShapes
import alexman.hrms.core.designsystem.theme.HrmsTheme
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp

@PreviewLight
@Composable
private fun ButtonWithTextPreview() {
    HrmsTheme {
        Column(
            verticalArrangement = Arrangement.spacedBy(16.dp)
        ) {
            ButtonWithText(
                text = "Button Text Primary",
                onClick = { },
                sizeVariation = SizeVariation.PRIMARY,
            )
            ButtonWithText(
                text = "Button Text Secondary",
                onClick = { },
                sizeVariation = SizeVariation.SECONDARY,
            )
        }
    }
}

@Composable
fun ButtonWithText(
    text: String,
    onClick: () -> Unit,
    sizeVariation: SizeVariation,
    modifier: Modifier = Modifier,
) {
    Button(
        onClick = onClick,
        modifier = modifier,
        enabled = true,
        shape = HrmsShapes.medium,
        border = null,
        colors = ButtonDefaults.buttonColors(),
        contentPadding = PaddingValues(8.dp),
    ) {
        when (sizeVariation) {
            SizeVariation.PRIMARY -> SmallDisplayText(text = text)
            SizeVariation.SECONDARY -> LargeBodyText(text = text)
        }
    }
}
