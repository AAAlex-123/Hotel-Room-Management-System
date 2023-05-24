package alexman.hrms.core.designsystem.component

import alexman.hrms.core.designsystem.PreviewLight
import alexman.hrms.core.designsystem.theme.HrmsShapes
import alexman.hrms.core.designsystem.theme.HrmsTheme
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.wrapContentSize
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp

@PreviewLight
@Composable
private fun PopupPreview() {
    HrmsTheme {
        HrmsPopup {
            LargeBodyText(text = "This is a popup")
        }
    }
}

@Composable
fun HrmsPopup(
    content: @Composable () -> Unit
) {
    Surface(
        modifier = Modifier
            .wrapContentSize()
            .padding(16.dp)
            .background(MaterialTheme.colorScheme.background),
        shape = HrmsShapes.medium,
        color = MaterialTheme.colorScheme.background,
        contentColor = MaterialTheme.colorScheme.onBackground,
        tonalElevation = 0.dp,
        shadowElevation = 4.dp,
        border = null,
        content = content,
    )
}
