#!/bin/bash

if [ "$1" != "" ]; then
  kubectl exec -it kafka-client -- kafka-topics --zookeeper my-kafka-cp-zookeeper-headless:2181 --delete --topic $1
else
  echo "Give topic to delete"
fi

