#!/bin/bash

# Enhanced Next.js production build script
# Implements all suggested deployment fixes

echo "🚀 Starting Next.js production build..."

# Set production environment
export NODE_ENV=production
export PORT=5000

# Clean previous builds
echo "🧹 Cleaning previous builds..."
rm -rf .next/
rm -rf out/

# Update browserslist data to avoid warnings
echo "📋 Updating browser data..."
npx update-browserslist-db@latest

# Run Next.js native build command 
echo "🔨 Building Next.js application..."
npx next build

# Verify build success
if [ -f ".next/BUILD_ID" ]; then
    BUILD_ID=$(cat .next/BUILD_ID)
    echo "✅ Build completed successfully!"
    echo "📦 Build ID: $BUILD_ID"
    echo "📁 Production files created in .next directory"
    ls -la .next/ | head -5
else
    echo "❌ Build failed - .next/BUILD_ID not found"
    exit 1
fi

echo "🎉 Next.js production build ready for deployment!"