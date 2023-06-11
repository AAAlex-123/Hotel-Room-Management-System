package alexman.hrms.feature.localization

import alexman.hrms.core.designsystem.PreviewLight
import alexman.hrms.core.designsystem.component.HrmsScaffold
import alexman.hrms.core.designsystem.component.LargeBodyText
import alexman.hrms.core.designsystem.component.MediumDisplayText
import alexman.hrms.core.designsystem.theme.HrmsTheme
import android.content.res.Resources
import android.util.Log
import android.widget.Toast
import androidx.appcompat.app.AppCompatDelegate
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxHeight
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material3.DropdownMenuItem
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.unit.dp
import androidx.core.os.LocaleListCompat
import java.util.Locale

@PreviewLight
@Composable
private fun LocalizationScreenContentPreview() {
    HrmsTheme {
        LocalizationScreenContent(
            locales = listOf(Locale.FRANCE, Locale.ENGLISH, Locale.GERMANY),
            onLocaleSelected = { },
            onNavigateBack = { },
        )
    }
}

@Composable
internal fun LocalizationScreen(
    onNavigateBack: () -> Unit,
) {

    val context = LocalContext.current

    val locales = mutableListOf<Locale>().also {
        with (Resources.getSystem().configuration.locales) {
            for (i in 0 until size()) {
                it.add(get(i))
            }
        }
        Log.d("LocalizationScreen", "locales found = $it")
    }

    val onLocaleSelected = { locale: Locale ->
        Log.d("LocalizationScreen", "onLocaleSelected() called with: locale = $locale")
        // TODO("make it work instead of toast")
        Toast.makeText(context, "Locale set to $locale", Toast.LENGTH_SHORT).show()
    }

    LocalizationScreenContent(
        locales = locales,
        onLocaleSelected = onLocaleSelected,
        onNavigateBack = onNavigateBack,
    )
}

@Composable
private fun LocalizationScreenContent(
    locales: List<Locale>,
    onLocaleSelected: (Locale) -> Unit,
    onNavigateBack: () -> Unit,
) {
    HrmsScaffold(
        topBarText = "Select Language",
        onNavigationIconClick = { onNavigateBack() },
    ) {
        Column(
            horizontalAlignment = Alignment.CenterHorizontally,
            // verticalArrangement = Arrangement.spacedBy(8.dp, Alignment.CenterVertically),
            modifier = Modifier
                .fillMaxSize()
                .padding(top = 16.dp)
                .padding(horizontal = 16.dp)
        ) {
            LazyColumn(
                horizontalAlignment = Alignment.CenterHorizontally,
                modifier = Modifier
                     // .fillMaxWidth(0.95f)
            ) {
                items(locales) {
                    DropdownMenuItem(
                        text = { LargeBodyText(text = it.displayName) },
                        onClick = { onLocaleSelected(it) },
                    )
                }
            }
        }
    }
}
