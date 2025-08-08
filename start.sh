#!/bin/bash
# Start script for Next.js deployment
echo "Starting Next.js application in production mode..."

# Set the port from environment variable or default to 5000
export PORT=${PORT:-5000}

# Start the Next.js application in production mode
npx next start --port $PORT