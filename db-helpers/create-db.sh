kubectl exec -it deployment/folders-postgres-deployment -- createdb -U postgres 'folders-db'
kubectl exec -it deployment/graphs-postgres-deployment -- createdb -U postgres 'graphs-db'
kubectl exec -it deployment/most-popular-folders-postgres-deployment -- createdb -U postgres 'most-popular-folders-db'

kubectl rollout restart deployment/folders-deployment
kubectl rollout restart deployment/graphs-deployment
kubectl rollout restart deployment/most-popular-folders-deployment
