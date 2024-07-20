#!/bin/bash

if [[ "$*" == *--dev* ]]; then
  echo "Running in dev mode"
  docker-compose -f docker-compose.dev.yml up -d
else
  echo "Running in prod mode"
  docker-compose up --build
fi