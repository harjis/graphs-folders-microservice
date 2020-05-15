kubectl exec -it deployment/graphs-deployment -- yarn migrations:rollback
kubectl exec -it deployment/folders-deployment -- yarn migrations:rollback
