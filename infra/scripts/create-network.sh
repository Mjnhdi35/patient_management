#!/usr/bin/env bash
set -e

NETWORK=backend_network

if ! docker network inspect $NETWORK >/dev/null 2>&1; then
   docker network create $NETWORK
   echo "Created network: $NETWORK"
else 
   echo "Network already exists: $NETWORK"
fi