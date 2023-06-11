import androidx.compose.foundation.layout.Column
import androidx.compose.material.*
import androidx.compose.runtime.*
import androidx.compose.runtime.snapshots.SnapshotStateList
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.window.Window
import androidx.compose.ui.window.WindowPlacement
import androidx.compose.ui.window.application
import androidx.compose.ui.window.rememberWindowState
import kotlinx.coroutines.launch
import okhttp3.MediaType
import okhttp3.MediaType.Companion.toMediaType
import okhttp3.OkHttpClient
import okhttp3.Request
import okhttp3.RequestBody.Companion.toRequestBody
import org.json.JSONArray
import org.json.JSONObject


private val Blue = Color(200, 210, 236)
private val LIGHTBLUE = Color(0xc8d2ec)

private val DarkColors = lightColors(
    primary = Blue,
    secondary = Color.White,
    // ...
)

fun main() = application {
    val state = rememberWindowState(WindowPlacement.Maximized)
    val stage = remember { mutableStateOf(Page.ROOM) }
    val floors = remember { mutableStateListOf<Floor>() }
    val employee = remember { mutableStateListOf<Employee>() }
    val url = remember { mutableStateOf("localhost:8000") }
    val authToken = remember { mutableStateOf("") }
    val mediaType = "application/json; charset=utf-8".toMediaType()
    var doneHttp by remember { mutableStateOf(false) }
    val scope = rememberCoroutineScope()
    if (!doneHttp) {
        scope.launch {
            val client = OkHttpClient()
            try {
                println("Heyu")
                authenticate(url.value, mediaType, client, authToken)
                getRooms(client, floors, url, authToken)
                getEmployees(client, employee, url, authToken)
            } catch (e: Exception) {
                e.printStackTrace()
            }
            doneHttp = true
        }
    }
    Window(
        onCloseRequest = ::exitApplication, title = "Hestia Wizard", state = state, icon = painterResource(
            "logo.png"
        )
    ) {
        MaterialTheme(
            colors = DarkColors
        ) {
            Column {
                Text("Server url")
                TextField(value = url.value, onValueChange = {
                    url.value = it
                })
                if (stage.value == Page.ROOM) {
                    Button(onClick = {
                        doneHttp = false
                        floors.clear()
                        employee.clear()
                    }) {
                        Text("Search")
                    }
                }
                when (stage.value) {
                    Page.ROOM -> App(stage, floors)
                    Page.EMPLOYEE -> EmployeePage(stage, employee)
                    Page.SEND -> Send(stage, floors, employee, url, authToken)
                }
            }
        }
    }

}

fun authenticate(
    url: String,
    mediaType: MediaType,
    client: OkHttpClient,
    authToken: MutableState<String>
) {
    val login = JSONObject(mapOf("login" to "wizard", "password" to "wizard_random"))
    val request = Request.Builder().url("http://$url/api/auth").post(
        login.toString().toRequestBody(mediaType)
    ).build()
    client.newCall(request).execute().use {
        if (it.isSuccessful) {
            val body = JSONObject(it.body?.string())
            if (!body.isEmpty) {
                authToken.value = body.getString("access_token")
            }

        }
    }
}

private fun getEmployees(
    client: OkHttpClient,
    employee: SnapshotStateList<Employee>,
    url: MutableState<String>,
    authToken: MutableState<String>
) {
    val request = Request.Builder().url("http://${url.value}/api/employee").get()
        .addHeader("Authorization", "Bearer ${authToken.value}").build()
    client.newCall(request).execute().use {
        if (it.isSuccessful) {
            val body = JSONArray(it.body?.string())
            if (!body.isEmpty) {
                val employeeList = mutableListOf<Employee>()
                repeat(body.length()) { index ->
                    val jsonObject = body.getJSONObject(index)
                    employeeList.add(
                        Employee(
                            name = jsonObject.getString("name"),
                            useranme = jsonObject.getString("username"),
                            login = "***",
                            type = EmployeeType.valueOf(
                                jsonObject.getString("type")
                            )
                        )
                    )
                }
                employeeList.forEach { key ->
                    employee.add(key)
                }
            }
        }
    }
}

private fun getRooms(
    client: OkHttpClient, floors: SnapshotStateList<Floor>, url: MutableState<String>, authToken: MutableState<String>
) {
    val request = Request.Builder().url("http://${url.value}/api/room").get()
        .addHeader("Authorization", "Bearer ${authToken.value}").build()
    client.newCall(request).execute().use {
        if (it.isSuccessful) {
            val result = it.body?.string() ?: "[]"
            val body = JSONArray(result)
            if (!body.isEmpty) {
                val floorMap = hashMapOf<Int, MutableList<Room>>()
                repeat(body.length()) { index ->
                    val jsonObject = body.getJSONObject(index)
                    val floor = jsonObject.getInt("floor")
                    floorMap.putIfAbsent(floor, mutableListOf())
                    floorMap[floor]!!.add(
                        Room(
                            jsonObject.getString("room_id"),
                            jsonObject.getString("roomType"),
                            jsonObject.getString("roomClass")
                        )
                    )
                }
                floorMap.keys.forEach { key ->
                    floorMap[key]!!.sortBy { room -> room.roomId }
                    floors.add(Floor(key, floorMap[key]!!))
                }
            }
        }
    }
}


