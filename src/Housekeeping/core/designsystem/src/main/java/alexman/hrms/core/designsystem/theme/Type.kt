package alexman.hrms.core.designsystem.theme

import androidx.compose.material3.Typography
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.Shadow
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.font.FontStyle
import androidx.compose.ui.text.font.FontSynthesis
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.intl.LocaleList
import androidx.compose.ui.text.style.BaselineShift
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.text.style.TextDecoration
import androidx.compose.ui.text.style.TextDirection
import androidx.compose.ui.text.style.TextIndent
import androidx.compose.ui.unit.TextUnit
import androidx.compose.ui.unit.sp

private val baseTextStyle = TextStyle(
    color = Color.Unspecified,
    fontSize = TextUnit.Unspecified,
    fontWeight = FontWeight.Normal,
    fontStyle = FontStyle.Normal,
    fontSynthesis = FontSynthesis.All,
    fontFamily = FontFamily.Default,
    // fontFeatureSettings = ,
    letterSpacing = TextUnit.Unspecified,
    baselineShift = BaselineShift.None,
    // textGeometricTransform = ,
    localeList = LocaleList.current,
    background = Color.Unspecified,
    textDecoration = TextDecoration.None,
    shadow = Shadow.None,
    textAlign = TextAlign.Left,
    textDirection = TextDirection.Content,
    lineHeight = TextUnit.Unspecified,
    textIndent = TextIndent.None,
)

internal val HousekeepingTypography = Typography(
    displayLarge = baseTextStyle.copy(
        fontSize = 36.sp,
        fontWeight = FontWeight.SemiBold,
    ),
    displayMedium = baseTextStyle.copy(
        fontSize = 24.sp,
        fontWeight = FontWeight.SemiBold,
    ),
    displaySmall = baseTextStyle.copy(
        fontSize = 20.sp,
        fontWeight = FontWeight.SemiBold,
    ),
    bodyLarge = baseTextStyle.copy(
        fontSize = 16.sp,
        lineHeight = 24.sp,
        letterSpacing = 0.5.sp,
    ),
    labelLarge = baseTextStyle.copy(
        fontSize = 20.sp,
        fontWeight = FontWeight.SemiBold,
    ),
    labelMedium = baseTextStyle.copy(
        color = Gray50,
        fontSize = 14.sp,
        fontStyle = FontStyle.Italic,
    ),
)
