#!/bin/bash

kubectl get pvc --no-headers=true | awk '/claim|kafka|elastic/{print $1}' | xargs  kubectl delete pvc
