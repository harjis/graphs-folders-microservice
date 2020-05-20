kubectl exec -it kafka-client -- curl -X POST http://my-kafka-cp-kafka-connect:8083/connectors -H "Content-Type: application/json" -d '{
  "name": "sink-folders-graphs",
  "config": {
    "connector.class": "io.confluent.connect.jdbc.JdbcSinkConnector",
    "tasks.max": "1",
    "topics": "folders",
    "connection.url": "jdbc:postgresql://postgres-cluster-ip-service:5432/graphs-folders-microservice/graphs?user=postgres&password=my_pgpassword",
    "transforms": "unwrap",
    "transforms.unwrap.type": "io.debezium.transforms.ExtractNewRecordState",
    "transforms.unwrap.drop.tombstones": "false",
    "auto.create": "true",
    "insert.mode": "upsert",
    "delete.enabled": "true",
    "pk.fields": "id",
    "pk.mode": "record_key"
  }
}
'
