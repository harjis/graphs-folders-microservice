#!/bin/bash

kubectl exec -it deployment/my-kafka-cp-ksql-server --container=cp-ksql-server -- ksql
