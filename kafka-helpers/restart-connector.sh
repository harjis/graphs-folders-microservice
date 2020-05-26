#!/bin/bash

if [ "$1" != "" ]; then
  minikube_ip=$(minikube ip)
  curl -X POST $minikube_ip/connectors/$1/restart
else
    echo "Give selector to restart"
fi

