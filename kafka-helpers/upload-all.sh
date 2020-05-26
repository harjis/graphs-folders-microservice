#!/bin/bash

sh $(pwd)/upload-sink-folders-db-graphs.sh
sh ./upload-sink-folders-es.sh
sh ./upload-source-folders.sh
