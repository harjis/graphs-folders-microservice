#!/bin/bash

minikube_ip=$(minikube ip)
url=http://$minikube_ip/connectors/connectors

arr=( $( curl -s -X GET "$url" | jq -r '.[]' ) )

echo Connector statuses: ${#arr[@]}
for i in "${arr[@]}"
do
  echo $i
	curl -s -X GET http://$minikube_ip/connectors/connectors/$i/status | jq
done
