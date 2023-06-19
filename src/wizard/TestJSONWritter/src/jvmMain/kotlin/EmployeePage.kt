import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.material.*
import androidx.compose.runtime.*
import androidx.compose.runtime.snapshots.SnapshotStateList
import androidx.compose.ui.Alignment

@OptIn(ExperimentalMaterialApi::class)
@Composable
fun EmployeePage(stage: MutableState<Page>, employee: SnapshotStateList<Employee>) {
    var canContinueToSend by remember { mutableStateOf(true) }
    Column {
        Column {

            Button(onClick = {
                employee.add(Employee(username = "", name = "", login = "", type = EmployeeType.CHAMBERMAID))
            }) {
                Text("Add employee")
            }
            Row {
                Button(onClick = {
                    canContinueToSend = employee.map { it.username }.distinct().size == employee.size
                    if (canContinueToSend) {
                        stage.value = Page.SEND
                    }
                }) {
                    Text("Continue")
                }
                Button(onClick = {
                    stage.value = Page.ROOM
                }) {
                    Text("Back")
                }
                if (!canContinueToSend)
                    AlertDialog(onDismissRequest = {}, text = { Text("Usernames must be unique") }, confirmButton = {
                        Button(onClick = {
                            canContinueToSend = true
                        }) { Text(text = "OK") }
                    })
            }
            LazyColumn {
                items(employee.size) {
                    employeeView(employee, it)
                }
            }
        }

    }

}

@Composable
fun employeeView(employees: SnapshotStateList<Employee>, index: Int) {
    var show by remember { mutableStateOf(false) }
    var expanded by remember { mutableStateOf(false) }
    var username by remember { mutableStateOf(employees[index].username) }
    var name by remember { mutableStateOf(employees[index].name) }
    var login by remember { mutableStateOf(employees[index].login) }
    var type by remember { mutableStateOf(employees[index].type.name) }
    var uniqueUsername by remember { mutableStateOf(false) }
    if (show) {
        Row(verticalAlignment = Alignment.CenterVertically) {
            Text("Full Name")
            TextField(value = name, onValueChange = {
                employees[index].name = it
                name = it
            })
            Text("Username")
            TextField(value = username, isError = uniqueUsername, onValueChange = {
                uniqueUsername = employees.map { emp -> emp.username }.contains(it)
                employees[index].username = it
                username = it
            })
            Text("Login")
            TextField(value = login, onValueChange = {
                employees[index].login = it
                login = it
            })
            Text("Type")
            TextButton(onClick = { expanded = true }) {
                Text(type)
                DropdownMenu(expanded = expanded, onDismissRequest = { expanded = false }) {
                    EmployeeType.values().map {
                        DropdownMenuItem(content = { Text(it.name) }, onClick = {
                            type = it.name
                            employees[index].type = it
                        })
                    }
                }
            }
            TextButton(onClick = { show = false }) {
                Text("Done")
            }
            TextButton(onClick = {
                employees.removeAt(index)
                if (index >= employees.size) return@TextButton
                username = employees[index].username
                name = employees[index].name
                login = employees[index].login
                type = employees[index].type.name

            }) {
                Text("X")
            }
        }
    } else {
        TextButton(onClick = { show = true }) {
            Text("FullName: $name")
        }
    }

}
