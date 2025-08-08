#!/bin/bash

# PRODUCTION SSR FIX
# This script ensures proper Next.js SSR in production deployment
# Fixes the "Edit with ×" placeholder issue by using correct Next.js commands

echo "🔧 PRODUCTION SSR FIX - Starting Next.js production server..."

# Critical: Set production environment
export NODE_ENV=production
export PORT=${PORT:-5000}

# Verify production build exists
if [ ! -f ".next/BUILD_ID" ]; then
    echo "❌ CRITICAL: No production build found!"
    echo "🔨 Building production version first..."
    NODE_ENV=production npx next build
    
    if [ ! -f ".next/BUILD_ID" ]; then
        echo "❌ FATAL: Build failed, cannot start production server"
        exit 1
    fi
fi

BUILD_ID=$(cat .next/BUILD_ID)
echo "✅ Production build verified - BUILD_ID: $BUILD_ID"

# Start Next.js production server with correct SSR
echo "🚀 Starting Next.js SSR production server on port $PORT..."
echo "🎯 This fixes the 'Edit with ×' placeholder issue"

# Use Next.js native production server (NOT the package.json start script)
exec npx next start -p $PORT