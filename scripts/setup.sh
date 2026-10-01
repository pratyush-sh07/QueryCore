#!/usr/bin/env bash
set -e

echo "=== Setting up QueryCore Local Development Environment ==="

# 1. Frontend Environment File
if [ ! -f "client/.env" ]; then
    echo "Creating client/.env from client/.env.example..."
    cp client/.env.example client/.env
fi

# 2. Server Environment File
if [ ! -f "server/.env" ]; then
    echo "Creating server/.env from server/.env.example..."
    cp server/.env.example server/.env
fi

echo "Environment files ready."
echo ""
echo "To start the full stack with Docker Compose:"
echo "  docker compose up -d --build"
echo ""
echo "To run frontend locally:"
echo "  cd client && npm install && npm run dev"
echo ""
echo "To run backend locally:"
echo "  cd server && pip install -r requirements.txt && uvicorn app.main:app --reload"
echo ""
echo "=== Setup Complete! ==="
