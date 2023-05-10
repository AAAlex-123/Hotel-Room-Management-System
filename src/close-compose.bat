docker-compose --profile second_batch down
docker-compose --profile first_batch down
docker image prune -f