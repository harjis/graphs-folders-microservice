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
1. Create postgress secret and enable ingress
```shell script
kubectl create secret generic pgpassword --from-literal POSTGRES_PASSWORD=my_pgpassword
minikube addons enable ingress
```

1.5: Apply persistent volume claim. This is done separately so that skaffold dev doesn't clean up db on restarts
```shell script
kubectl apply -f k8s-pvc
```

2. Init kafka. Sometimes this takes quite long (~5min)
```shell script
./kafka-init.sh
```

3. Start dev
```shell script
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
`docker system prune`

`docker volume prune`

Trouble with kafka: If strimzi fails to start it might be that KubernetesClient and Kubernetes versions are not
compatible. Try starting the minikube with an older version `minikube start --kubernetes-version v1.15.3`
https://github.com/strimzi/strimzi-kafka-operator/issues/2920

## Kafka

Open kafka producer (debug purposes)
```shell script
kubectl -n kafka run kafka-producer -ti --image=strimzi/kafka:0.17.0-kafka-2.4.0 --rm=true --restart=Never -- bin/kafka-console-producer.sh --broker-list $(minikube ip):32100 --topic folders-topic
```

Open kafka consumer (debug purposes)
```shell script
kubectl -n kafka run kafka-consumer -ti --image=strimzi/kafka:0.17.0-kafka-2.4.0 --rm=true --restart=Never -- bin/kafka-console-consumer.sh --bootstrap-server $(minikube ip):32100 --topic folders-topic --from-beginning
```