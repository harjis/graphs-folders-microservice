kubectl exec -it kafka-client -- curl -X POST http://my-kafka-cp-kafka-connect:8083/connectors -H "Content-Type: application/json" -d '{
  "name": "folders-source",
  "config": {
    "connector.class": "io.debezium.connector.postgresql.PostgresConnector",
    "tasks.max": "1",
    "database.hostname": "postgres-cluster-ip-service",
    "database.port": "5432",
    "database.user": "postgres",
    "database.password": "my_pgpassword",
    "database.dbname": "graphs-folders-microservice/folders",
    "database.server.name": "folders",
    "database.whitelist": "folders",
    "database.history.kafka.bootstrap.servers": "broker:9092",
    "database.history.kafka.topic": "schema-changes.customers",
    "transforms": "route",
    "transforms.route.type": "org.apache.kafka.connect.transforms.RegexRouter",
    "transforms.route.regex": "([^.]+)\\.([^.]+)\\.([^.]+)",
    "transforms.route.replacement": "$3"
  }
}
'
