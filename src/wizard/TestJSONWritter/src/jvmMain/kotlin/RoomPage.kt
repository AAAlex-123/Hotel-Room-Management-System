import androidx.compose.desktop.ui.tooling.preview.Preview
import androidx.compose.foundation.border
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.grid.GridCells
import androidx.compose.foundation.lazy.grid.LazyVerticalGrid
import androidx.compose.foundation.lazy.grid.itemsIndexed
import androidx.compose.material.*
import androidx.compose.runtime.*
import androidx.compose.runtime.snapshots.SnapshotStateList
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.focus.FocusState
import androidx.compose.ui.focus.onFocusChanged
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.RectangleShape
import androidx.compose.ui.unit.dp

@Composable
@Preview
fun App(stage: MutableState<Page>, floors: SnapshotStateList<Floor>) {
    val (show, setShow) = remember { mutableStateOf(false) }
    val mainFloor = remember { mutableStateOf<Floor?>(null) }

    Surface {
        Row {
            Column {
                repeat(floors.size) {
                    FloorButton(mainFloor = mainFloor, index = it, floors = floors)
                }
                Row {
                    Button(onClick = {
                        setShow(true)
                    }) {
                        Text("Add floor")
                    }
                }
                if (show) {
                    fieldGenerate(floorName = getNextAvailable(floors), hide = setShow, floors = floors)
                }
                Button(onClick = {
                    stage.value = Page.EMPLOYEE
                }) {
                    Text("Continue")
                }
            }
            Column(horizontalAlignment = Alignment.End) {
                if (mainFloor.value != null) {
                    LazyVerticalGrid(columns = GridCells.Adaptive(minSize = 300.dp)) {
                        itemsIndexed(mainFloor.value!!.rooms) { index: Int, _: Room ->
                            roomView(index = index, rooms = mainFloor.value!!.rooms)
                        }
                    }
                }
            }
        }
    }
}

@Composable
private fun FloorButton(mainFloor: MutableState<Floor?>, index: Int, floors: SnapshotStateList<Floor>) {
    var show by remember { mutableStateOf(true) }
    var floor by remember { mutableStateOf(floors[index].floor.toString()) }
    Row {
        if (show) {
            Button(onClick = {
                mainFloor.value = floors[index]
            }) {
                Text(text = "Floor $floor")
            }
            TextButton(onClick = {
                show = false
            }) {
                Text("...")
            }
            TextButton(onClick = {
                floors.removeAt(index)
                if (index < floors.size) floor = floors[index].floor.toString()
            }) {
                Text("X")
            }
        } else {
            TextField(value = floor, onValueChange = {
                if (!"\\d*".toRegex().containsMatchIn(it)) return@TextField
                var temp = try {
                    it.toInt()
                } catch (e: Exception) {
                    0
                }
                while (floors.map { tempIt -> tempIt.floor }.contains(temp)) temp++
                floors[index].floor = temp
                floor = it
            })
            Button(onClick = {
                show = true
            }) {
                Text("Done")
            }
        }
    }
}

private fun getNextAvailable(floors: SnapshotStateList<Floor>): Int {
    var i = floors.size + 1
    while (floors.map(Floor::floor).contains(i)) i++
    return i
}

@Composable
private fun roomView(rooms: MutableList<Room>, index: Int) {
    var roomId by remember { mutableStateOf(rooms[index].roomId) }
    var roomType by remember { mutableStateOf(rooms[index].roomType) }
    var roomClass by remember { mutableStateOf(rooms[index].roomClass) }
    Column(modifier = Modifier.border(2.dp, Color.Black, RectangleShape).padding(5.dp)) {
        Text("Room", modifier = Modifier.height(IntrinsicSize.Min))
        TextField(value = roomId,
            modifier = Modifier.height(IntrinsicSize.Min),
            onValueChange = { newValue ->
                roomId = newValue
                rooms[index].roomId = newValue
            })
        Text("Room Type", modifier = Modifier.height(IntrinsicSize.Min))
        TextField(value = roomType,
            modifier = Modifier.height(IntrinsicSize.Min),
            onValueChange = { newValue ->
                roomType = newValue
                rooms[index].roomType = newValue
            })
        Text("Room Class", modifier = Modifier.height(IntrinsicSize.Min))
        TextField(value = roomClass,
            modifier = Modifier.height(IntrinsicSize.Min),
            onValueChange = { newValue ->
                roomClass = newValue
                rooms[index].roomClass = newValue
            })

    }
}

@Composable
private fun fieldGenerate(hide: (Boolean) -> Unit, floors: SnapshotStateList<Floor>, floorName: Int) {
    val numOfRooms = remember { mutableStateOf("0") }
    var isRoomsNotNumber by remember { mutableStateOf(true) }
    val statsFrom = remember { mutableStateOf("1") }
    var isStartNotNumber by remember { mutableStateOf(false) }
    val roomType = remember { mutableStateOf("") }
    val roomClass = remember { mutableStateOf("") }
    Row(verticalAlignment = Alignment.CenterVertically) {
        Text("Νum. of Rooms")
        TextField(value = numOfRooms.value,
            isError = isRoomsNotNumber,
            modifier = Modifier.onFocusChanged(onFocusClear(numOfRooms)).width(IntrinsicSize.Min),
            onValueChange = {
                isRoomsNotNumber = "\\D".toRegex().containsMatchIn(it) || it == "0"
                numOfRooms.value = it
            })
    }
    Row(verticalAlignment = Alignment.CenterVertically) {
        Text("Starting from:")
        TextField(value = statsFrom.value,
            isError = isStartNotNumber,
            modifier = Modifier.onFocusChanged(onFocusClear(statsFrom)).width(IntrinsicSize.Min),
            onValueChange = {
                isStartNotNumber = "\\D".toRegex().containsMatchIn(it)
                statsFrom.value = it
            })
    }
    Row(verticalAlignment = Alignment.CenterVertically) {
        Text("Room Type")
        TextField(value = roomType.value, modifier = Modifier.onFocusChanged(onFocusClear(roomType)).width(
            IntrinsicSize.Min
        ), onValueChange = {
            roomType.value = it
        })
    }
    Row(verticalAlignment = Alignment.CenterVertically) {
        Text("Room Class")
        TextField(value = roomClass.value, modifier = Modifier.onFocusChanged(onFocusClear(roomClass)).width(
            IntrinsicSize.Min
        ), onValueChange = {
            roomClass.value = it
        })
    }
    Button(onClick = {
        val rooms = mutableListOf<Room>()
        if (isRoomsNotNumber || isStartNotNumber) return@Button
        val rNum = numOfRooms.value.toInt()
        val start = statsFrom.value.toInt()
        repeat(rNum) {
            rooms.add(Room("${start + it}", roomType.value, roomClass.value))
        }
        floors.add(Floor(floorName, rooms))
        hide(false)
    }) {
        Text(text = "OK")
    }
}

private fun onFocusClear(statsFrom: MutableState<String>) = { focusState: FocusState ->
    if (focusState.hasFocus) {
        statsFrom.value = ""
    }

}