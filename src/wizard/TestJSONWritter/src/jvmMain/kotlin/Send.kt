import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.material.AlertDialog
import androidx.compose.material.Button
import androidx.compose.material.ExperimentalMaterialApi
import androidx.compose.material.Text
import androidx.compose.runtime.*
import androidx.compose.runtime.snapshots.SnapshotStateList
import androidx.compose.ui.Alignment
import kotlinx.coroutines.launch
import okhttp3.MediaType
import okhttp3.MediaType.Companion.toMediaType
import okhttp3.OkHttpClient
import okhttp3.Request
import okhttp3.RequestBody.Companion.toRequestBody
import org.json.JSONArray

@OptIn(ExperimentalMaterialApi::class)
@Composable
fun Send(stage: MutableState<Page>, floors: SnapshotStateList<Floor>, employees: SnapshotStateList<Employee>) {
    val client = remember { OkHttpClient() }
    // FIXME: ADD DYNAMIC URL
    val url = "http://localhost:8081/api"
    val showError = remember { mutableStateOf(-1) }
    val errorType = remember { mutableStateOf("Room") }
    val coroutineScope = rememberCoroutineScope()
    val mediaType = "application/json; charset=utf-8".toMediaType()
    Column(horizontalAlignment = Alignment.CenterHorizontally, verticalArrangement = Arrangement.Center) {
        Button(onClick = {
            coroutineScope.launch {
                sendRoom(floors, url, mediaType, client, showError, errorType)
                sendEmployees(employees, url, mediaType, client, showError, errorType)
            }
        }) {
            Text("Complete")
        }
        Button(onClick = {
            stage.value = Page.EMPLOYEE
        }) {
            Text("Back")
        }
        if (showError.value != -1) {
            AlertDialog(
                title = { Text("Network Issue") }, onDismissRequest = { showError.value = -1 },
                text = { Text("Could not complete insert of ${errorType.value} check the provided url and network options") },
                confirmButton = {
                    Button(onClick = {
                        showError.value = -1
                    }) {
                        Text("OK")
                    }
                },
            )
        }
    }
}

private fun sendRoom(
    floors: SnapshotStateList<Floor>,
    url: String,
    mediaType: MediaType,
    client: OkHttpClient,
    showError: MutableState<Int>,
    errorType: MutableState<String>
) {
    if (floors.isNotEmpty()) {
        val request = Request.Builder().url("$url/room/many").post(
            floors.toJsonString().toString().toRequestBody(mediaType)
        ).build()
        client.newCall(request).execute().use {
            it.code
            if (!it.isSuccessful) {
                showError.value = it.code
                errorType.value = "room"
                return
            }
        }
    }
}

private fun sendEmployees(
    employees: SnapshotStateList<Employee>,
    url: String,
    mediaType: MediaType,
    client: OkHttpClient,
    showError: MutableState<Int>,
    errorType: MutableState<String>
) {
    if (employees.isNotEmpty()) {
        val request = Request.Builder().url("$url/employee/many").post(
            employees.toJsonString().toRequestBody(mediaType)
        ).build()
        client.newCall(request).execute().use {
            if (!it.isSuccessful) {
                showError.value = it.code
                errorType.value = "employee"
                return
            }
        }
    }
}

private fun SnapshotStateList<Floor>.toJsonString(): JSONArray {
    val array = JSONArray()
    forEach {
        val temp = it.toJsonObject()
        repeat(temp.length()) { index ->
            array.put(temp.getJSONObject(index))
        }
    }
    return array
}

private fun <T : JSONAble> SnapshotStateList<T>.toJsonString(): String {
    val ret = JSONArray()
    forEach {
        ret.put(it.toJsonObject())
    }
    return ret.toString()
}


