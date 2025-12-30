#!/usr/bin/env bash
set -e

./infra/scripts/create-network.sh

docker compose -f infra/docker/postgres/docker-compose.yml up -d
docker compose -f infra/docker/redis/docker-compose.yml up -d
docker compose -f infra/docker/adminer/docker-compose.yml up -d

echo "Infra local is up"
