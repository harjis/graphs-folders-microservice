#!/bin/bash

minikube_ip=$(minikube ip)
curl -X POST http://$minikube_ip/connectors/connectors -H "Content-Type: application/json" -d @../connectors/source-folders.json
