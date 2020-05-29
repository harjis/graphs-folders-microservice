#!/bin/bash

__dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
bash ${__dir}/upload-sink-folders-db-graphs.sh
bash ${__dir}/upload-sink-folders-es.sh
bash ${__dir}/upload-source-folders.sh
