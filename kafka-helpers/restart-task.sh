#!/bin/bash

if [[ ( "$1" != "" ) || ( "$2" != "" ) ]]; then
  minikube_ip=$(minikube ip)
  curl -X POST $minikube_ip/connectors/connectors/$1/tasks/$2/restart
else
  echo "Give selector to delete"
fi
