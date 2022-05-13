#!/bin/bash
# Adapted from: https://docs.docker.com/config/containers/multi-service_container/

# Start backend
node app.js &
  
# Start vaccination data pipeline
node ./dataPipeline/vaccDataPipeline.js &

# Start vaccination supply pipeline
node ./dataPipeline/vaccSupplyDataPipeline.js &

# Wait for any process to exit
wait -n

# Exit with status of process that exited first
exit $?