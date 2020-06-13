#!/bin/bash

if [[ ( "$1" != "" ) || ( "$2" != "" ) ]]; then
  echo "Remeber to delete topic consuming connector before running this command"
  kubectl exec -it kafka-client -- kafka-consumer-groups --group $1 --topic $2 --reset-offsets --to-earliest --bootstrap-server my-kafka-cp-kafka-headless:9092 --execute
else
  echo "Give 1: group and 2: topic"
fi
