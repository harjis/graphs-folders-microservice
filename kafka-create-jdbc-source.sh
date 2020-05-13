curl -X POST http://$(minikube ip)/my-connectors/connectors -H "Content-Type: application/json" -d @/Users/harjukallio/Sites/microservices/graphs-folders-microservice/jdbc-sources/folders-source.json
#curl -X POST http://$(minikube ip):8083/my-connectors/connectors -H "Content-Type: application/json" -d @../jdbc-sources/folders-sink-jobs.json
