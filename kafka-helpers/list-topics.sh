#!/bin/bash

kubectl exec -it kafka-client -- kafka-topics --zookeeper my-kafka-cp-zookeeper-headless:2181 --list
