#!/bin/bash

if [[ ( "$1" != "" ) || ( "$2" != "" ) ]]; then
  curl -X POST $minikube_ip/connectors/$1/tasks/$2/restart
else
  echo "Give selector to delete"
fi
