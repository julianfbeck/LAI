#!/bin/bash
#abort if any command fails
set -eu

mkdir -p ${REPOSITORY_PATH}
cd ${REPOSITORY_PATH}

echo "configuring dns"
curl -4 -u ${DNS_USERNAME}:${DNS_PASSWORD} "https://api.dynu.com/nice/update?hostname=${DNS_HOST}"
curl -6 -u ${DNS_USERNAME}:${DNS_PASSWORD} "https://api.dynu.com/nice/update?hostname=${DNS_HOST}"

echo "authenticate to pull private docker image"
echo "${DOCKER_PASSWORD}" | docker login -u "${DOCKER_USERNAME}" --password-stdin

echo "starting docker-compose"
docker-compose up -d
