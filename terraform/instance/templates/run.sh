#!/bin/bash
#abort if any command fails
set -eu

mkdir -p ${REPOSITORY_PATH}
cd ${REPOSITORY_PATH}

# echo "configuring dns"
#TODO insert dyndns curl here

echo "authenticate to pull private docker image"
echo "${DOCKER_PASSWORD}" | docker login -u "${DOCKER_USERNAME}" --password-stdin

echo "starting docker-compose"
docker-compose up -d
