#!/bin/bash

minikube_ip=$(minikube ip)
curl -s -X GET "http://$minikube_ip/sr/subjects/" | jq .
