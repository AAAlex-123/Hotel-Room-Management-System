package alexman.hrms.core.designsystem.component

import alexman.hrms.core.designsystem.PreviewLight
import alexman.hrms.core.designsystem.R
import alexman.hrms.core.designsystem.SizeVariation
import alexman.hrms.core.designsystem.theme.HousekeepingShapes
import alexman.hrms.core.designsystem.theme.HousekeepingTheme
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.wrapContentHeight
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.unit.Dp
import androidx.compose.ui.unit.dp

@PreviewLight
@Composable
private fun DeletableListItemPreview() {
    HousekeepingTheme {
        Column (
            verticalArrangement = Arrangement.spacedBy(16.dp)
        ) {
            DeletableListItem(
                id = 1,
                text = "Lorem",
                deletable = true,
                onDelete = { },
            )
            DeletableListItem(
                id = 2,
                text = "Lorem",
                deletable = false,
                onDelete = { },
            )
        }
    }
}

@Composable
fun DeletableListItem(
    id: Int,
    text: String,
    deletable: Boolean,
    onDelete: (Int) -> Unit,
) {
    Surface (
        shape = MaterialTheme.shapes.medium,
    ) {
        Row(
            verticalAlignment = Alignment.CenterVertically,
            horizontalArrangement = Arrangement.spacedBy(16.dp),
            modifier = Modifier
                .wrapContentHeight()
                .fillMaxWidth()
                .clip(HousekeepingShapes.medium)
                .padding(16.dp),
        ) {
            ListItemNumber(
                number = id,
                sizeVariation = SizeVariation.MEDIUM,
            )
            LargeBodyText(
                text = text,
                modifier = Modifier.weight(1f),
            )
            if (deletable) {
                Icon(
                    id = R.drawable.ic_trashcan,
                    alt = "Delete order",
                    onClick = { onDelete(id) },
                    sizeVariation = SizeVariation.MEDIUM,
                )
            }
        }
    }
}

@PreviewLight
@Composable
private fun ListItemNumberPreview() {
    HousekeepingTheme {
        ListItemNumber(1, SizeVariation.MEDIUM)
    }
}

@Composable
private fun ListItemNumber(
    number: Int,
    sizeVariation: SizeVariation,
) {
    ListItemNumber(
        number = number,
        size = when(sizeVariation) {
            SizeVariation.LARGE -> 48.dp
            SizeVariation.MEDIUM -> 32.dp
            SizeVariation.SMALL -> 16.dp
        },
    )
}

@Composable
private fun ListItemNumber(
    number: Int,
    size: Dp,
) {
    Box(
        modifier = Modifier
            .size(size)
            .background(MaterialTheme.colorScheme.primary, shape = CircleShape),
        contentAlignment = Alignment.Center,
    ) {
        MediumDisplayText(
            text = number.toString(),
        )
    }
}
