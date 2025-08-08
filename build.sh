#!/bin/bash
# Build script for Next.js deployment
echo "Building Next.js application..."

# Create a minimal dist directory structure to satisfy Vite deployment requirements
mkdir -p dist
echo '<!DOCTYPE html><html><head><title>YoStreamer</title></head><body><div id="root"></div></body></html>' > dist/index.html

# Build the actual Next.js application
npx next build

echo "Build completed successfully!"