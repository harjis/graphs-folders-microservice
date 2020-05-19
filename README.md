# How to start

## Skaffold
1. Create postgress secret and enable ingress
```shell script
kubectl create secret generic pgpassword --from-literal POSTGRES_PASSWORD=my_pgpassword
minikube addons enable ingress
```

1.5: Apply persistent volume claim. This is done separately so that skaffold dev doesn't clean up db on restarts
```shell script
./db-helpers/pvc-apply.sh
```

2. Init kafka. Sometimes this takes quite long (~5min)
```shell script
helm install my-kafka confluent/cp-helm-charts -f k8s-kafka/values.yaml
```

3. Start dev
```shell script
skaffold dev
```

4. Create db's

### Create databases
```shell script
./db-helpers/create-db.sh
```

5. Upload sources and sinks
```shell script
./kafka-helpers/upload-folders-source.sh
./kafka-helpers/upload-graphs-source.sh
./kafka-helpers/upload-folders-sink-graphs.sh
./kafka-helpers/upload-folders-sink-jobs.sh
```

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

List topics:
```shell script
./kafka-helpers/ssh.sh
kafka-topics --zookeeper my-kafka-cp-zookeeper-headless:2181 --list
```

Delete topic:
```shell script
./kafka-helpers/ssh.sh
kafka-topics --zookeeper my-kafka-cp-zookeeper-headless:2181 --delete --topic t_folders
```

Consume topic:
```shell script
./kafka-helpers/ssh.sh
kafka-console-consumer --bootstrap-server my-kafka-cp-kafka-headless:9092 --topic t_folders --from-beginning
```
