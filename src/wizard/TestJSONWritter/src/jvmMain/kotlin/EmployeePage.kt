import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material.*
import androidx.compose.runtime.*
import androidx.compose.runtime.snapshots.SnapshotStateList
import androidx.compose.ui.Alignment

@Composable
fun EmployeePage(stage: MutableState<Page>, employee: SnapshotStateList<Employee>) {
    Column {
        Column {

            Button(onClick = {
                employee.add(Employee(useranme = "", name = "", login = "", type = EmployeeType.CHAMBERMAID))
            }) {
                Text("Add employee")
            }
            Row {
                Button(onClick = {
                    stage.value = Page.SEND
                }) {
                    Text("Continue")
                }
                Button(onClick = {
                    stage.value = Page.ROOM
                }) {
                    Text("Back")
                }
            }

            LazyColumn {
                items(employee.size){
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
    var username by remember { mutableStateOf(employees[index].useranme) }
    var name by remember { mutableStateOf(employees[index].name) }
    var login by remember { mutableStateOf(employees[index].login) }
    var type by remember { mutableStateOf(employees[index].type.name) }
    if (show) {
        Row(verticalAlignment = Alignment.CenterVertically) {
            Text("Full Name")
            TextField(value = name, onValueChange = {
                employees[index].name = it
                name = it
            })
            Text("Username")
            TextField(value = username, onValueChange = {
                employees[index].useranme = it
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
                username = employees[index].useranme
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
