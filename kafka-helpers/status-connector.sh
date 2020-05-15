if [ "$1" != "" ]; then
  kubectl exec -it kafka-client -- curl my-kafka-cp-kafka-connect:8083/connectors/$1/status | jq
else
    echo "Give selector to see status"
fi

