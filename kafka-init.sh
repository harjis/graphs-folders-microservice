kubectl create ns kafka

kubectl create ns my-kafka-project

kubectl apply -f k8s-cluster-operator/ -n kafka

kubectl apply -f k8s-cluster-operator/020-RoleBinding-strimzi-cluster-operator.yaml -n my-kafka-project

kubectl apply -f k8s-cluster-operator/032-RoleBinding-strimzi-cluster-operator-topic-operator-delegation.yaml -n my-kafka-project

kubectl apply -f k8s-cluster-operator/031-RoleBinding-strimzi-cluster-operator-entity-operator-delegation.yaml -n my-kafka-project

kubectl create -n my-kafka-project -f k8s-kafka/my-cluster-kafka.yaml

# This times out but it doesn't matter
kubectl wait kafka/my-cluster --for=condition=Ready --timeout=300s -n my-kafka-project

kubectl create -n my-kafka-project -f k8s-kafka/my-cluster-folders-topic.yaml
