package alexman.hrms.core.designsystem.component

import alexman.hrms.core.designsystem.PreviewLight
import alexman.hrms.core.designsystem.R
import alexman.hrms.core.designsystem.SizeVariation
import alexman.hrms.core.designsystem.theme.HousekeepingTheme
import androidx.annotation.DrawableRes
import androidx.compose.foundation.Image
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.size
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.unit.dp

@PreviewLight
@Composable
private fun IconPreview() {
    HousekeepingTheme {
        Column(
            verticalArrangement = Arrangement.spacedBy(16.dp)
        ) {
            Icon(
                R.drawable.ic_placeholder,
                alt = "placeholder",
                sizeVariation = SizeVariation.SMALL,
            )
            Icon(
                R.drawable.ic_placeholder,
                alt = "placeholder",
                sizeVariation = SizeVariation.MEDIUM,
            )
            Icon(
                R.drawable.ic_placeholder,
                alt = "placeholder",
                sizeVariation = SizeVariation.LARGE,
            )
        }
    }
}

@Composable
fun DefaultNavigationIcon(
    onClick: () -> Unit,
) {
    IconClickable(
        id = R.drawable.ic_menu_back,
        alt = "back",
        onClick = onClick,
        sizeVariation = SizeVariation.LARGE,
    )
}

@Composable
fun Icon(
    @DrawableRes id: Int,
    alt: String,
    modifier: Modifier = Modifier,
    sizeVariation: SizeVariation = SizeVariation.MEDIUM,
) {
    Image(
        painter = painterResource(id = id),
        contentDescription = alt,
        modifier = modifier
            .size(
                when (sizeVariation) {
                    SizeVariation.LARGE -> 40.dp
                    SizeVariation.MEDIUM -> 32.dp
                    SizeVariation.SMALL -> 24.dp
                }
            ),
    )
}

@Composable
fun IconClickable(
    @DrawableRes id: Int,
    alt: String,
    modifier: Modifier = Modifier,
    onClick: () -> Unit = { },
    sizeVariation: SizeVariation = SizeVariation.MEDIUM,
) {
    Icon(
        id = id,
        alt = alt,
        modifier = modifier
            .clickable(onClick = onClick),
        sizeVariation = sizeVariation,
    )
}
