# Hestia
## Requirements
- Docker Desktop or the docker engine see [Docker Download page](https://www.docker.com/products/docker-desktop/)

## Execution

On the folder src/backend

### Windows

Run the run_compose.ps1 file with the docker desktop application open (the bottom left corner will be green and display a "Engine is runnign tooltip").

### Mac and Linux

Run the run_compose.sh file with the docker desktop application open (Or if just the engine was installed, make sure the engine is running with the docker info).

### Android

As is, the Android application does not use an external API to fetch and update its data. 
Instead, hardcoded data is displayed to the user, and all updates happen only in memory and are
therefore erased on application restart. The hardcoded data can be found in the
[FakeNetworkDataSource.kt](src/Housekeeping/core/network/src/main/java/alexman/hrms/core/network/fake/FakeNetworkDataSource.kt)
file.

To configure the Android application to use an external API instead of the hardcoded test data,
perform the steps below.

Navigate to line 17 in the 
[Repository.kt](./src/Housekeeping/core/data/src/main/java/alexman/hrms/core/data/Repository.kt)
file, and chage it from
```kt
private val datasource: HrmsNetworkDataSource = FakeNetworkDataSource()
```
to
```kt
private val datasource: HrmsNetworkDataSource = HrmsRetrofitNetworkDataSource()
```
and also add the necessary import
```kt
import alexman.hrms.core.network.retrofit.HrmsRetrofitNetworkDataSource
```
Navigate to line 23 in the 
[HrmsRetrofitInstance.kt](./src/Housekeeping/core/network/src/main/java/alexman/hrms/core/network/retrofit/HrmsRetrofitInstance.kt)
file, locate the `baseUrl` field and change its value to match the IP address of the machine which
is running the docker containers. Its IP address can be obtained by running the `ipconfig` command 
in the terminal. Specifically, the value of the `baseUrl` field, for IP address `ip` should be:
`https://<ip>:8000/api/`

After performing these two changes, build the Android application either
[from the command line](https://developer.android.com/build/building-cmdline) or by opening the
project in Android Studio and using the `Ctrl + F9` (Make Project) shortcut.

Finally, deploy the Android application
[to an emulator](https://developer.android.com/build/building-cmdline#RunningOnEmulator) or
[to a physical device](https://developer.android.com/build/building-cmdline#RunningOnDevice), or run
it via Android Studio using the `Shift + F10` (Run 'app') shortcut. Running the application in
Android Studio requires creating a virtual device. As an alternative to this rather lengthy process,
run the Android application [on a hardware device](https://developer.android.com/studio/run/device).

### After the execution
You can make sure that it's running smoothly if you run the `docker container ls` or by looking at the Containers section in the docker desktop application
If a group of four containers (mysql_image, api, front and nginx) are running then the application is running smoothly.

You can access the front end in the url [http://localhost:8000/](http://localhost:8000/ )
You can access the client's side in the url [http://localhost:8000/client?room_id=the_room_number_they_are_loggining_into](http://localhost:8000/client?room_id=the_room_number_they_are_loggining_into)

