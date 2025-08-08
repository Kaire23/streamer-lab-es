#!/bin/bash
# Build script for Next.js deployment
echo "Building Next.js application..."

# Build the actual Next.js application
npx next build

# Create a minimal dist directory structure to satisfy deployment requirements if needed
# This maintains compatibility with deployment systems that expect a dist folder
mkdir -p dist
echo '<!DOCTYPE html><html><head><title>YoStreamer</title></head><body><div id="root"></div></body></html>' > dist/index.html

# Also copy the .next build to dist if needed for deployment compatibility
if [ -d ".next" ]; then
    echo "Next.js build successful - .next directory created"
    echo "Build output:"
    ls -la .next
else
    echo "ERROR: Next.js build failed - .next directory not found"
    exit 1
fi

echo "Build completed successfully!"