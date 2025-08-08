#!/bin/bash
# Start script for Next.js deployment
echo "Starting Next.js application in production mode..."

# Set the port from environment variable or default to 5000
export PORT=${PORT:-5000}

# Ensure the .next directory exists (from build step)
if [ ! -d ".next" ]; then
    echo "ERROR: .next directory not found. Make sure the build step completed successfully."
    echo "Running build step..."
    npx next build
fi

echo "Starting Next.js production server on port $PORT"

# Start the Next.js application in production mode
npx next start --port $PORT