Write-Host "=== Setting up QueryCore Local Development Environment ===" -ForegroundColor Cyan

# 1. Frontend Environment File
if (-not (Test-Path "client\.env")) {
    Write-Host "Creating client/.env from client/.env.example..." -ForegroundColor Green
    Copy-Item "client\.env.example" "client\.env"
}

# 2. Server Environment File
if (-not (Test-Path "server\.env")) {
    Write-Host "Creating server/.env from server/.env.example..." -ForegroundColor Green
    Copy-Item "server\.env.example" "server\.env"
}

Write-Host "Environment files ready." -ForegroundColor Green
Write-Host ""
Write-Host "To start the full stack with Docker Compose:"
Write-Host "  docker compose up -d --build" -ForegroundColor Yellow
Write-Host ""
Write-Host "To run frontend locally:"
Write-Host "  cd client; npm.cmd install; npm.cmd run dev" -ForegroundColor Yellow
Write-Host ""
Write-Host "To run backend locally:"
Write-Host "  cd server; pip install -r requirements.txt; uvicorn app.main:app --reload" -ForegroundColor Yellow
Write-Host ""
Write-Host "=== Setup Complete! ===" -ForegroundColor Cyan
