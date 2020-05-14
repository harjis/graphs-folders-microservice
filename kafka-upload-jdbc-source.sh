kubectl exec -it kafka-client -- curl -X POST http://my-kafka-cp-kafka-connect:8083/connectors -H "Content-Type: application/json" -d '{
  "name": "folders-source",
  "config": {
    "connector.class": "io.confluent.connect.jdbc.JdbcSourceConnector",
    "transforms": "createKey, extractInt",
    "transforms.createKey.type": "org.apache.kafka.connect.transforms.ValueToKey",
    "transforms.createKey.fields": "id",
    "transforms.extractInt.type": "org.apache.kafka.connect.transforms.ExtractField$Key",
    "transforms.extractInt.field": "id",
    "connection.url": "jdbc:postgresql://postgres-cluster-ip-service:5432/graphs-folders-microservice/folders",
    "connection.user": "postgres",
    "connection.password": "my_pgpassword",
    "table.whitelist": "folders",
    "mode": "timestamp+incrementing",
    "incrementing.column.name": "id",
    "timestamp.column.name": "createdAt",
    "validate.non.null": "true",
    "topic.prefix": "f_"
  }
}
'
