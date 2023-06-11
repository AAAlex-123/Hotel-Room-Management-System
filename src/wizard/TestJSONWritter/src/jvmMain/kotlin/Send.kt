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
fun Send(
    stage: MutableState<Page>,
    floors: SnapshotStateList<Floor>,
    employees: SnapshotStateList<Employee>,
    url: MutableState<String>,
    authToken: MutableState<String>
) {
    val client = remember { OkHttpClient() }
    val urlBasis = "http://${url.value}/api"
    val showError = remember { mutableStateOf(-1) }
    val errorType = remember { mutableStateOf("Room") }
    val coroutineScope = rememberCoroutineScope()
    val mediaType = "application/json; charset=utf-8".toMediaType()
    Column(horizontalAlignment = Alignment.CenterHorizontally, verticalArrangement = Arrangement.Center) {
        Button(onClick = {
            coroutineScope.launch {
                sendRoom(floors, urlBasis, mediaType, client, showError, errorType, authToken)
                sendEmployees(employees, urlBasis, mediaType, client, showError, errorType, authToken)
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
    errorType: MutableState<String>,
    authToken: MutableState<String>
) {
    if (floors.isNotEmpty()) {
        val request =
            Request.Builder().url("$url/room/many").addHeader("Authorization", "Bearer ${authToken.value}").post(
                floors.toJsonString().toString().toRequestBody(mediaType)
            ).build()
        client.newCall(request).execute().use {
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
    errorType: MutableState<String>,
    authToken: MutableState<String>
) {
    if (employees.isNotEmpty()) {
        val request =
            Request.Builder().url("$url/employee/many").addHeader("Authorization", "Bearer ${authToken.value}").post(
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


