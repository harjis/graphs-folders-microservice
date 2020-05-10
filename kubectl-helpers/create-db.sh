kubectl exec -it deployment/postgres-deployment -- createdb -U postgres 'graphs-folders-microservice/folders'
kubectl exec -it deployment/postgres-deployment -- createdb -U postgres 'graphs-folders-microservice/graphs'
kubectl exec -it deployment/postgres-deployment -- createdb -U postgres 'graphs-folders-microservice/jobs'

kubectl rollout restart deployment/folders-deployment
kubectl rollout restart deployment/graphs-deployment
kubectl rollout restart deployment/jobs-deployment
