#!/bin/bash

helm install my-kafka confluent/cp-helm-charts -f k8s-kafka/values.yaml
helm install my-elasticsearch stable/elasticsearch -f k8s-elasticsearch/values.yaml
