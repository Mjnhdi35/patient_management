#!/usr/bin/env bash
set -e

docker compose -f infra/docker/adminer/docker-compose.yml down || true
docker compose -f infra/docker/redis/docker-compose.yml down || true
docker compose -f infra/docker/postgres/docker-compose.yml down || true

echo "Infra local is down"
