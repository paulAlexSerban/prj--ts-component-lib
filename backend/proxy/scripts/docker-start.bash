#!/bin/bash
# makes sure the folder containing the script will be the root folder
cd "$(dirname "$0")" || exit

bash generate-ssl-certs.bash
echo "🟢  START 🐳  Traefik Proxy"
docker-compose --env-file ../../../.env.development \
  --file ../docker-compose.dev.yml \
  up --detach --build
