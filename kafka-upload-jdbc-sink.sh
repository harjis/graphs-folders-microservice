kubectl exec -it kafka-client -- curl -X POST http://my-kafka-cp-kafka-connect:8083/connectors -H "Content-Type: application/json" -d '{
  "name": "sink-folders-jobs",
  "config": {
    "connector.class": "io.confluent.connect.jdbc.JdbcSinkConnector",
    "topics": "f_folders",
    "connection.url": "jdbc:postgresql://postgres-cluster-ip-service:5432/graphs-folders-microservice/jobs",
    "connection.user": "postgres",
    "connection.password": "my_pgpassword",
    "dialect.name": "PostgreSqlDatabaseDialect",
    "insert.mode": "upsert",
    "delete.enabled": "true",
    "pk.mode": "record_key",
    "pk.fields": "id",
    "auto.create": "true",
    "auto.evolve": "true"
  }
}
'
