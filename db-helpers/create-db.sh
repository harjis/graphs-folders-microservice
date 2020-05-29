kubectl exec -it deployment/folders-postgres-deployment -- createdb -U postgres 'graphs-folders-microservice/folders'
kubectl exec -it deployment/graphs-postgres-deployment -- createdb -U postgres 'graphs-folders-microservice/graphs'

kubectl rollout restart deployment/folders-deployment
kubectl rollout restart deployment/graphs-deployment
