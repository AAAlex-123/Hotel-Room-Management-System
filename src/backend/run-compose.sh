docker-compose --profile second_batch down 
docker-compose --profile first_batch down
docker-compose down
docker-compose up mysql_image -d --build
# sleep 5
docker-compose --profile first_batch up -d --build
docker-compose --profile second_batch up -d --build