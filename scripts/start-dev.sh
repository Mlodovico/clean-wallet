#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

if ! command -v docker >/dev/null 2>&1; then
  echo "Docker is required but was not found in PATH."
  exit 1
fi

if [ ! -f ".env" ]; then
  echo "Missing .env file. Create one with POSTGRES_* variables before starting."
  exit 1
fi

echo "Starting PostgreSQL and OpenTelemetry Collector..."
docker compose -f docker-compose.yml -f docker-compose.observability.yml \
  up -d --wait postgres otel-collector

echo "Starting application in watch mode..."
exec pnpm run start:dev
