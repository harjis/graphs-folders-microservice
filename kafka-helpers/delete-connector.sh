#!/bin/bash

if [ "$1" != "" ]; then
  minikube_ip=$(minikube ip)
  curl -X DELETE http://$minikube_ip/connectors/connectors/$1
else
  echo "Give selector to delete"
fi
