#!/bin/bash

echo '----'
# Set the path so cron can find jq, necessary for cron depending on your default PATH
export PATH=$PATH:/usr/local/bin/

date

curl -s "http://localhost:8083/connectors/connectors?expand=info&expand=status" | \
           jq '. | to_entries[] | [ .value.info.type, .key, .value.status.connector.state,.value.status.tasks[].state,.value.info.config."connector.class"]|join(":|:")' | \
           column -s : -t| sed 's/\"//g'| sort

curl -s "http://localhost:8083/connectors/connectors?expand=status" | \
  jq -c -M 'map({name: .status.name } +  {tasks: .status.tasks}) | .[] | {task: ((.tasks[]) + {name: .name})}  | select(.task.state=="FAILED") | {name: .task.name, task_id: .task.id|tostring} | ("/connectors/connectors/"+ .name + "/tasks/" + .task_id + "/restart")' | \
  xargs -I{connector_and_task} curl -v -X POST "http://localhost:8083"\{connector_and_task\}

