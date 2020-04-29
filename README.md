# How to start

## Docker-compose (DOESN'T HAVE SUPPORT FOR KAFKA ATM.)
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
1. Create postgress secret
```sh
kubectl create secret generic pgpassword --from-literal POSTGRES_PASSWORD=my_pgpassword
```

2. Init kafka. Sometimes this takes quite long (~5min)
```sh
./kafka-init.sh
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

#Memos

The reason why Dockerfiles use yarn is that I experienced some really weird behaviour with npm. When I added
class-validator and class-transformer to package.json and ran docker-compose up npm install did not install
these. When sh to the container you could see that package.json is correct but ls node_modules | grep class
showed that the packages are not there.

Trouble with skaffold: At some point skaffold dev simply did not stabilize the deployments. All stayed at Pending
state. I was not able to figure out the exact reason for this but it might be related to missing space. At 
that time I also started to get a lot of `no space left on device` errors. I pruned everything and skaffold started
working
```sh
docker system prune
```

```sh
docker volume prune
```

## Kafka

Open kafka consumer (debug purposes)
```sh
kubectl -n kafka run kafka-consumer -ti --image=strimzi/kafka:0.17.0-kafka-2.4.0 --rm=true --restart=Never -- bin/kafka-console-consumer.sh --bootstrap-server $(minikube ip):32100 --topic folders-topic --from-beginning
```
