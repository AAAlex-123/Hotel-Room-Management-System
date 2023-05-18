package alexman.hrms.core.designsystem.component

import alexman.hrms.core.designsystem.PreviewLight
import alexman.hrms.core.designsystem.R
import alexman.hrms.core.designsystem.theme.HousekeepingShapes
import alexman.hrms.core.designsystem.theme.HousekeepingTheme
import androidx.annotation.DrawableRes
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.IconButton
import androidx.compose.material3.IconButtonDefaults
import androidx.compose.material3.MaterialTheme
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp

@PreviewLight
@Composable
private fun ButtonWithTextPreview() {
    HousekeepingTheme {
        ButtonWithText(
            text = "Button Text",
            onClick = {  },
        )
    }
}

@PreviewLight
@Composable
private fun ButtonWithIconPreview() {
    HousekeepingTheme {
        ButtonWithIcon(
            id = R.drawable.ic_placeholder,
            alt = "image alt text",
            onClick = { },
        )
    }
}

@Composable
fun ButtonWithText(
    text: String,
    onClick: () -> Unit,
    modifier: Modifier = Modifier,
    enabled: Boolean = true,
) {
    Button(
        onClick = onClick,
        modifier = modifier,
        enabled = enabled,
        shape = HousekeepingShapes.medium,
        border = null,
        colors = ButtonDefaults.buttonColors(),
        contentPadding = PaddingValues(8.dp),
    ) {
        LargeBodyText(text = text)
    }
}

@Composable
fun ButtonWithIcon(
    @DrawableRes id: Int,
    alt: String,
    onClick: () -> Unit,
) {
    IconButton(
        onClick = { }, // Icon consumes the onClick event
        modifier = Modifier,
        enabled = true,
        colors = IconButtonDefaults.iconButtonColors(
            containerColor = Color.Unspecified,
            contentColor = MaterialTheme.colorScheme.onPrimary,
            // the icon button is always enabled
            // disabledContainerColor = Color,
            // disabledContentColor = Color,
        ),
    ) {
        IconClickable(
            id = id,
            alt = alt,
            onClick = onClick,
        )
    }
}
