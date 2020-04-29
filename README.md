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
1. Create postgress secret and enable ingress on minikube
```sh
kubectl create secret generic pgpassword --from-literal POSTGRES_PASSWORD=my_pgpassword
minikube addons enable ingress
```

3. Start dev
```sh
skaffold dev
```

4. Create db's

### Create databases
`./kubectl-helpers/create-db.sh`

### Seed databases

`./kubectl-helpers/seed-folders.sh`
`./kubectl-helpers/seed-graphs.sh`

### Navigate to (there is insomnia config also)

<minikube-ip>/folders
<minikube-ip>/graphs
