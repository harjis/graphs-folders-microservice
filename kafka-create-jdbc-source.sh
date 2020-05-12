curl -X POST http://172.17.0.9:8083/connectors -H "Content-Type: application/json" -d '{
  "name": "graphs",
  "config": {
    "connector.class": "io.confluent.connect.jdbc.JdbcSourceConnector",
    "transforms": "createKey, extractInt",
    "transforms.createKey.type": "org.apache.kafka.connect.transforms.ValueToKey",
    "transforms.extractInt.type": "org.apache.kafka.connect.transforms.ExtractField$Key",
    "connection.url": "jdbc:postgresql://172.17.0.20:5432/graphs-folders-microservice/folders",
    "connection.user": "postgres",
    "connection.password": "my_pgpassword",
    "table.whitelist": "folders",
    "dialect.name": "PostgreSqlDatabaseDialect",
    "mode": "timestamp+incrementing",
    "incrementing.column.name": "id",
    "timestamp.column.name": "updated_at",
    "validate.non.null": "true",
    "topic.prefix": "folders_"
  }
}'

#TODO DOES NOT WORK
