package alexman.hrms.core.designsystem.component

import alexman.hrms.core.designsystem.PreviewLight
import alexman.hrms.core.designsystem.R
import alexman.hrms.core.designsystem.SizeVariation
import alexman.hrms.core.designsystem.theme.HrmsShapes
import alexman.hrms.core.designsystem.theme.HrmsTheme
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
import androidx.compose.material3.Checkbox
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.unit.dp

@PreviewLight
@Composable
private fun ListItemPreview() {
    HrmsTheme {
        Column(
            verticalArrangement = Arrangement.spacedBy(16.dp)
        ) {
            ListItem(
                id = 1,
                text = "Lorem ipsum",
                deletable = true,
                onDelete = { },
                completed = false,
                markable = true,
                onMarkCompleted = { _: Int, _: Boolean -> },
                sizeVariation = SizeVariation.PRIMARY,
            )
            ListItem(
                id = 2,
                text = "Lorem ipsum",
                deletable = true,
                onDelete = { },
                completed = false,
                markable = true,
                onMarkCompleted = { _: Int, _: Boolean -> },
                sizeVariation = SizeVariation.SECONDARY,
            )
            ListItem(
                id = 3,
                text = "Lorem ipsum",
                deletable = false,
                onDelete = { },
                completed = false,
                markable = true,
                onMarkCompleted = { _: Int, _: Boolean -> },
                sizeVariation = SizeVariation.SECONDARY,
            )
            ListItem(
                id = 4,
                text = "Lorem ipsum",
                deletable = true,
                onDelete = { },
                completed = true,
                markable = true,
                onMarkCompleted = { _: Int, _: Boolean -> },
                sizeVariation = SizeVariation.SECONDARY,
            )
        }
    }
}

@Composable
fun ListItem(
    id: Int,
    text: String,
    deletable: Boolean,
    onDelete: (Int) -> Unit,
    completed: Boolean,
    markable: Boolean,
    onMarkCompleted: (Int, Boolean) -> Unit,
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
                .clip(HrmsShapes.medium)
                .padding(16.dp),
        ) {
            ListItemNumber(
                number = id,
                sizeVariation = sizeVariation,
                completed = completed
            )
            val textModifier = Modifier.weight(1f)
            when (sizeVariation) {
                SizeVariation.PRIMARY -> when (completed) {
                    false -> LargeBodyText(
                        text = text,
                        modifier = textModifier,
                    )

                    true -> StrikethroughLargeBodyText(
                        text = text,
                        modifier = textModifier,
                    )
                }

                SizeVariation.SECONDARY -> when (completed) {
                    false -> MediumBodyText(
                        text = text,
                        modifier = textModifier,
                    )

                    true -> StrikethroughMediumBodyText(
                        text = text,
                        modifier = textModifier,
                    )
                }
            }
            if (deletable) {
                IconClickable(
                    id = R.drawable.ic_trashcan,
                    alt = "delete",
                    onClick = { onDelete(id) },
                    sizeVariation = sizeVariation,
                )
            }
            if (markable) {
                Checkbox(
                    checked = completed,
                    onCheckedChange = { checked -> onMarkCompleted(id, checked) },
                )
            }
        }
    }
}

@PreviewLight
@Composable
private fun ListItemNumberPreview() {
    HrmsTheme {
        Column(
            verticalArrangement = Arrangement.spacedBy(16.dp)
        ) {
            ListItemNumber(1, SizeVariation.PRIMARY, true)
            ListItemNumber(2, SizeVariation.SECONDARY, true)
            ListItemNumber(3, SizeVariation.PRIMARY, false)
            ListItemNumber(4, SizeVariation.SECONDARY, false)
        }
    }
}

@Composable
private fun ListItemNumber(
    number: Int,
    sizeVariation: SizeVariation,
    completed: Boolean,
) {
    Box(
        modifier = Modifier
            .size(
                when (sizeVariation) {
                    SizeVariation.PRIMARY -> 40.dp
                    SizeVariation.SECONDARY -> 32.dp
                }
            )
            .background(
                color = when (completed) {
                    false -> MaterialTheme.colorScheme.primary
                    true -> MaterialTheme.colorScheme.surfaceVariant
                },
                shape = CircleShape
            ),
        contentAlignment = Alignment.Center,
    ) {
        when (sizeVariation) {
            SizeVariation.PRIMARY -> MediumDisplayText(text = number.toString())
            SizeVariation.SECONDARY -> SmallDisplayText(text = number.toString())
        }
    }
}
