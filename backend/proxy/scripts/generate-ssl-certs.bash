#!/bin/bash
# makes sure the folder containing the script will be the root folder
cd "$(dirname "$0")" || exit

echo "Generating SSL certificates"
mkdir -p ../dist/openssl
openssl req -x509 -newkey rsa:4096 -keyout ../dist/openssl/dashboard-key.pem -out ../dist/openssl/dashboard-cert.pem -days 365 -nodes -subj '/CN=dashboard.localhost'
openssl req -x509 -newkey rsa:4096 -keyout ../dist/openssl/component-library-key.pem -out ../dist/openssl/component-library-cert.pem -days 365 -nodes -subj '/CN=component-library.localhost'
