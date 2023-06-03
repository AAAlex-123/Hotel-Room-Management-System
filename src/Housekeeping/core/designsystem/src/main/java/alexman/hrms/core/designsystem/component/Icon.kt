package alexman.hrms.core.designsystem.component

import alexman.hrms.core.designsystem.PreviewLight
import alexman.hrms.core.designsystem.R
import alexman.hrms.core.designsystem.SizeVariation
import alexman.hrms.core.designsystem.theme.HrmsTheme
import androidx.annotation.DrawableRes
import androidx.compose.foundation.Image
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.wrapContentWidth
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.unit.dp

@PreviewLight
@Composable
private fun IconPreview() {
    HrmsTheme {
        Column(
            verticalArrangement = Arrangement.spacedBy(16.dp)
        ) {
            Icon(
                R.drawable.ic_placeholder,
                alt = "placeholder",
                sizeVariation = SizeVariation.PRIMARY,
            )
            Icon(
                R.drawable.ic_placeholder,
                alt = "placeholder",
                sizeVariation = SizeVariation.SECONDARY,
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
        sizeVariation = SizeVariation.PRIMARY,
    )
}

@Composable
fun IconClickable(
    @DrawableRes id: Int,
    alt: String,
    modifier: Modifier = Modifier,
    onClick: () -> Unit = { },
    sizeVariation: SizeVariation = SizeVariation.SECONDARY,
) {
    Icon(
        id = id,
        alt = alt,
        modifier = modifier
            .clickable(onClick = onClick),
        sizeVariation = sizeVariation,
    )
}

@Composable
fun Icon(
    @DrawableRes id: Int,
    alt: String,
    modifier: Modifier = Modifier,
    sizeVariation: SizeVariation = SizeVariation.SECONDARY,
) {
    Image(
        painter = painterResource(id = id),
        contentDescription = alt,
        modifier = modifier
            .height(
                when (sizeVariation) {
                    SizeVariation.PRIMARY -> 40.dp
                    SizeVariation.SECONDARY -> 32.dp
                }
            )
            .wrapContentWidth(),
    )
}
