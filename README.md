# How to start

## Docker-compose
### Start services
`docker-compose up`

### Create databases
`docker exec -it graphs-folders-microservice_postgres_1 createdb -U postgres 'graphs-folders-microservice/folders'`

`docker exec -it graphs-folders-microservice_postgres_1 createdb -U postgres 'graphs-folders-microservice/graphs'`

### Seed databases
`docker exec -it graphs-folders-microservice_graphs_service_1 npm run seed`

`docker exec -it graphs-folders-microservice_folders_service_1 npm run seed`

### Navigate to

localhost:3000/folders
localhost:3000/graphs

## Skaffold
`skaffold dev`

### Create databases
`./kubectl-helpers/create-db.sh`

### Seed databases

`./kubectl-helpers/seed-folders.sh`
`./kubectl-helpers/seed-graphs.sh`

### Navigate to

<minikube-ip>/folders
<minikube-ip>/graphs
