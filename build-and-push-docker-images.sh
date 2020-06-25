docker build -t d0rka/graphs-folders-microservice_folders:latest -f ./folders/Dockerfile.dev ./folders
docker build -t d0rka/graphs-folders-microservice_graphs:latest -f ./graphs/Dockerfile.dev ./graphs

docker push d0rka/graphs-folders-microservice_folders:latest
docker push d0rka/graphs-folders-microservice_graphs:latest
