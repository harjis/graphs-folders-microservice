if [ "$1" != "" ]; then
  kubectl exec -it kafka-client -- curl -X POST my-kafka-cp-kafka-connect:8083/connectors/$1/restart
else
    echo "Give selector to restart"
fi

