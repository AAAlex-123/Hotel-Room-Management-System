docker-compose --profile second_batch down 
docker-compose --profile first_batch down
docker-compose --profile first_batch up -d --build
docker-compose --profile second_batch up -d --build