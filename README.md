# Hestia
## Requirements
- Docker Desktop or the docker engine see [Docker Download page](https://www.docker.com/products/docker-desktop/)

## Execution

On the folder src/backend

### Windows

Run the run_compose.ps1 file with the docker desktop application open (the bottom left corner will be green and display a "Engine is runnign tooltip").

### Mac and Linux

Run the run_compose.sh file with the docker desktop application open (Or if just the engine was installed, make sure the engine is running with the docker info).

### After the execution
You can make sure that it's running smoothly if you run the `docker container ls` or by looking at the Containers section in the docker desktop application
If a group of four containers (mysql_image, api, front and nginx) are running then the application is running smoothly.

You can access the front end in the url [http://localhost:8000/](http://localhost:8000/ )
You can access the client's side in the url [http://localhost:8000/client?room_id=the_room_number_they_are_loggining_into](http://localhost:8000/client?room_id=the_room_number_they_are_loggining_into)

