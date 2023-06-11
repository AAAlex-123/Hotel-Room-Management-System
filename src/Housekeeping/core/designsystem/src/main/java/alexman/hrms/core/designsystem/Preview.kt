package alexman.hrms.core.designsystem

import android.content.res.Configuration.UI_MODE_NIGHT_NO
import android.content.res.Configuration.UI_MODE_NIGHT_YES
import androidx.compose.ui.tooling.preview.Preview

@Preview(
    uiMode = UI_MODE_NIGHT_NO,
)
annotation class PreviewLight

@Preview(
    uiMode = UI_MODE_NIGHT_YES,
)
annotation class PreviewDark

@PreviewLight
@PreviewDark
annotation class PreviewBoth
