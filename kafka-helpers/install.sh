#!/bin/bash

helm install my-kafka confluent/cp-helm-charts -f k8s-kafka/values.yaml
