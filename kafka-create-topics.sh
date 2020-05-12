kubectl exec -it kafka-client -- kafka-topics --zookeeper my-kafka-cp-zookeeper-headless:2181 --topic folders-topic --create --partitions 1 --replication-factor 1 --if-not-exists
kubectl exec -it kafka-client -- kafka-topics --zookeeper my-kafka-cp-zookeeper-headless:2181 --topic graphs-topic --create --partitions 1 --replication-factor 1 --if-not-exists

