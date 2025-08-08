#!/bin/bash
# Start script for Next.js deployment
echo "Starting Next.js application in production mode..."
npx next start --port ${PORT:-5000}