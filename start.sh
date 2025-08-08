#!/bin/bash

# Enhanced Next.js production start script
# Implements all suggested deployment fixes

echo "🚀 Starting Next.js production server..."

# Set production environment variables
export NODE_ENV=production
export PORT=${PORT:-5000}

# Verify production build exists
if [ ! -f ".next/BUILD_ID" ]; then
    echo "❌ No production build found in .next directory"
    echo "🔨 Running build first..."
    npm run build || npx next build
fi

BUILD_ID=$(cat .next/BUILD_ID)
echo "📦 Starting with Build ID: $BUILD_ID"

# Start Next.js production server
echo "🌐 Starting Next.js server on port $PORT..."
exec npx next start -p $PORT