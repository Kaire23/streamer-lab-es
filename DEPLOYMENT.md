# Deployment Guide for YoStreamer Next.js Application

## Overview
This application is a Next.js SSR (Server-Side Rendered) application that needs to be deployed using Next.js commands, not Vite commands.

## Issue Resolution
The main deployment issue was that the package.json contained legacy Vite build commands while the application is actually a pure Next.js application.

### Fixed Files:
1. `build.sh` - Uses `npx next build` (correct)
2. `start.sh` - Uses `npx next start` (correct)
3. `next-build.cjs` - Alternative build script for deployment systems
4. `next-start.cjs` - Alternative start script for deployment systems

## Deployment Commands

### For Build Process:
```bash
# Option 1: Use the build script
./build.sh

# Option 2: Use Next.js directly
npx next build

# Option 3: Use the custom build script
node next-build.cjs
```

### For Production Start:
```bash
# Option 1: Use the start script
./start.sh

# Option 2: Use Next.js directly
npx next start --port $PORT

# Option 3: Use the custom start script
node next-start.cjs
```

## Expected Build Output
- Creates `.next/` directory (Next.js production build)
- Creates `dist/` directory (for deployment compatibility)
- Static pages are pre-rendered for optimal performance
- Server-side rendering enabled for dynamic content

## Environment Variables
- `PORT` - Server port (defaults to 5000)
- `NODE_ENV` - Should be set to "production" for deployment

## Verification
After build, check that:
1. `.next/` directory exists and contains Next.js build files
2. `npx next start --port 5000` runs without errors
3. Application responds correctly on the specified port

## Deployment Systems
This application should be deployed as a Next.js application, not a Vite application. The deployment system should:
1. Run the build step using Next.js commands
2. Start the server using Next.js production mode
3. Expect `.next/` directory structure (not `dist/` for main application)

## Package.json Note
The package.json currently contains legacy Vite commands for historical reasons. The actual application uses Next.js exclusively. Deployment systems should rely on the build.sh and start.sh scripts or the custom .cjs files rather than the package.json scripts.