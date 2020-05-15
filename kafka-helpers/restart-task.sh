if [[ ( "$1" != "" ) || ( "$2" != "" ) ]]; then
  kubectl exec -it kafka-client -- curl -X POST my-kafka-cp-kafka-connect:8083/connectors/$1/tasks/$2/restart
else
  echo "Give selector to delete"
fi
