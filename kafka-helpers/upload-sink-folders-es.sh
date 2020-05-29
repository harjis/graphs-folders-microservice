#!/bin/bash

minikube_ip=$(minikube ip)
__dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

curl -X POST http://$minikube_ip/connectors/connectors -H "Content-Type: application/json" -d @${__dir}/../connectors/sink-folders-es.json
