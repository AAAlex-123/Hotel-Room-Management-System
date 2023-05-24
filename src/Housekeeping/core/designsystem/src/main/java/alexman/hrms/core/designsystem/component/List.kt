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
import androidx.compose.ui.unit.dp

@PreviewLight
@Composable
private fun DeletableListItemPreview() {
    HousekeepingTheme {
        Column(
            verticalArrangement = Arrangement.spacedBy(16.dp)
        ) {
            DeletableListItem(
                id = 1,
                text = "Lorem ipsum",
                deletable = true,
                onDelete = { },
                sizeVariation = SizeVariation.PRIMARY,
            )
            DeletableListItem(
                id = 2,
                text = "Lorem ipsum",
                deletable = true,
                onDelete = { },
                sizeVariation = SizeVariation.SECONDARY,
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
    sizeVariation: SizeVariation,
) {
    Surface(
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
                sizeVariation = sizeVariation,
            )
            when (sizeVariation) {
                SizeVariation.PRIMARY -> LargeBodyText(
                    text = text,
                    modifier = Modifier.weight(1f),
                )

                SizeVariation.SECONDARY -> MediumBodyText(
                    text = text,
                    modifier = Modifier.weight(1f),
                )
            }
            if (deletable) {
                IconClickable(
                    id = R.drawable.ic_trashcan,
                    alt = "Delete order",
                    onClick = { onDelete(id) },
                    sizeVariation = sizeVariation,
                )
            }
        }
    }
}

@PreviewLight
@Composable
private fun ListItemNumberPreview() {
    HousekeepingTheme {
        Column(
            verticalArrangement = Arrangement.spacedBy(16.dp)
        ) {
            ListItemNumber(1, SizeVariation.PRIMARY)
            ListItemNumber(2, SizeVariation.SECONDARY)
        }
    }
}

@Composable
private fun ListItemNumber(
    number: Int,
    sizeVariation: SizeVariation,
) {
    Box(
        modifier = Modifier
            .size(
                when (sizeVariation) {
                    SizeVariation.PRIMARY -> 40.dp
                    SizeVariation.SECONDARY -> 32.dp
                }
            )
            .background(MaterialTheme.colorScheme.primary, shape = CircleShape),
        contentAlignment = Alignment.Center,
    ) {
        when (sizeVariation) {
            SizeVariation.PRIMARY -> MediumDisplayText(text = number.toString())
            SizeVariation.SECONDARY -> SmallDisplayText(text = number.toString())
        }
    }
}
