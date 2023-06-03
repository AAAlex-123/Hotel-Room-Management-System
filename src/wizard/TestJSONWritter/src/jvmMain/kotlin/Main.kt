import androidx.compose.material.MaterialTheme
import androidx.compose.material.lightColors
import androidx.compose.runtime.mutableStateListOf
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.rememberCoroutineScope
import androidx.compose.runtime.snapshots.SnapshotStateList
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.window.Window
import androidx.compose.ui.window.WindowPlacement
import androidx.compose.ui.window.application
import androidx.compose.ui.window.rememberWindowState
import kotlinx.coroutines.launch
import okhttp3.OkHttpClient
import okhttp3.Request
import org.json.JSONArray


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
    val scope = rememberCoroutineScope()
    scope.launch {
        val client = OkHttpClient()
        getRooms(client, floors)
        getEmployees(client, employee)
    }
    Window(
        onCloseRequest = ::exitApplication, title = "Hestia Wizard", state = state, icon = painterResource(
            "logo.png"
        )
    ) {
        MaterialTheme(
            colors = DarkColors

        ) {
            when (stage.value) {
                Page.ROOM -> App(stage, floors)
                Page.EMPLOYEE -> EmployeePage(stage, employee)
                Page.SEND -> Send(stage, floors, employee)
            }
        }
    }

}

private fun getEmployees(
    client: OkHttpClient, employee: SnapshotStateList<Employee>
) {
    val request = Request.Builder().url("http://localhost:8081/api/employee").get().build()
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
    client: OkHttpClient, floors: SnapshotStateList<Floor>
) {
    val request = Request.Builder().url("http://localhost:8081/api/room").get().build()
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


