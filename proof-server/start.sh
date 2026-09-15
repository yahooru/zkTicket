#!/usr/bin/env bash
set -euo pipefail

container_name="zkticket-proof-server-8-1"

if docker container inspect "$container_name" >/dev/null 2>&1; then
  docker start "$container_name" >/dev/null
else
  docker run --detach \
    --name "$container_name" \
    --restart unless-stopped \
    --publish 127.0.0.1:6300:6300 \
    midnightntwrk/proof-server:8.1.0 \
    midnight-proof-server -v >/dev/null
fi

echo "Proof server container '$container_name' is running at http://127.0.0.1:6300"
