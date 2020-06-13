#!/bin/bash

if [ "$1" != "" ]; then
  kubectl exec -it kafka-client -- kafka-console-consumer --bootstrap-server my-kafka-cp-kafka-headless:9092 --topic $1 --from-beginning
else
  echo "Give topic to print"
fi

