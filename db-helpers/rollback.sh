if [ "$1" == "graphs" ]; then
  kubectl exec -it deployment/graphs-deployment -- yarn migrations:rollback
elif [ "$1" == "folders" ]; then
  kubectl exec -it deployment/folders-deployment -- yarn migrations:rollback
else
  echo "Give graphs / folders"
fi
