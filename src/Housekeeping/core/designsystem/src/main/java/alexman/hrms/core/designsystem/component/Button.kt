package alexman.hrms.core.designsystem.component

import alexman.hrms.core.designsystem.theme.HousekeepingShapes
import alexman.hrms.core.designsystem.theme.HousekeepingTheme
import androidx.annotation.DrawableRes
import androidx.compose.foundation.Image
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.wrapContentSize
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.IconButton
import androidx.compose.material3.IconButtonDefaults
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp

@Preview
@Composable
private fun ButtonWithTextPreview() {
    HousekeepingTheme(darkTheme = false) {
        ButtonWithText(text = "Submit", onClick = {  } )
    }
}

@Preview
@Composable
private fun TabButtonPreview() {
    HousekeepingTheme(darkTheme = false) {
        // TODO("add this and dummy icon")
        // TabButton(text = "Tab Name", id = , onClick = { } )
    }
}

@Preview
@Composable
private fun ButtonWithIconPreview() {
    HousekeepingTheme {
        // TODO("add this and dummy icon")
        // ButtonWithIcon(id = , alt = "alt", onClick = { } )
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
        content = { Text(text = text) },
    )
}

@Composable
internal fun TabButton(
    text: String,
    @DrawableRes id: Int,
    alt: String? = null,
    onClick: () -> Unit,
) {
    Surface {
        Column(
            modifier = Modifier
                .wrapContentSize()
                .clickable(onClick = onClick),
            verticalArrangement = Arrangement.Center,
            horizontalAlignment = Alignment.CenterHorizontally,
        ) {
            MediumDisplayText(text = text)
            Image(
                painter = painterResource(id = id),
                contentDescription = alt,
            )
        }
    }
}

@Composable
fun ButtonWithIcon(
    @DrawableRes id: Int,
    alt: String? = null,
    onClick: () -> Unit,
) {
    IconButton(
        onClick = onClick,
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
        Image(
            painter = painterResource(id = id),
            contentDescription = alt,
        )
    }
}
