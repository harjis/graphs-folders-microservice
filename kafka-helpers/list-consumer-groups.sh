#!/bin/bash

kubectl exec -it kafka-client -- kafka-consumer-groups --list --bootstrap-server my-kafka-cp-kafka-headless:9092
