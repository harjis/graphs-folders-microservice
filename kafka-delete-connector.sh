if [ "$1" != "" ]; then
  kubectl exec -it kafka-client -- curl -X DELETE http://my-kafka-cp-kafka-connect:8083/connectors/$1
else
    echo "Give selector to delete"
fi

