# Deployment Guide

This document explains how to deploy the YoStreamer Next.js application after fixing the ESM/CommonJS deployment issues.

## Problems Fixed

**Previous Issues**: 
1. Dynamic require() calls in server/index.ts caused deployment failures with error:
```
Dynamic require of "next/dist/bin/next-start" is not supported - ESM module cannot use require() for Next.js server
```
2. Legacy Vite dependencies and conflicting build scripts in package.json

**Solutions Applied**: 
1. Replaced dynamic require() calls with proper Next.js CLI commands using child_process.spawn()
2. Removed all legacy Vite dependencies and Express server components
3. Cleaned up package.json by removing conflicting build tools (vite, esbuild, express, wouter, etc.)
4. Updated project to be pure Next.js SSR application without legacy dependencies

## Deployment Options

### Option 1: Use Next.js Native Commands (Recommended)

For deployment systems that support Next.js directly:

```bash
# Build
npx next build

# Start
npx next start -p $PORT
```

### Option 2: Use Deployment Scripts

The application includes deployment scripts for compatibility:

```bash
# Build using deployment script
node next-build.cjs

# Start using deployment script  
node next-start.cjs
```

### Option 3: Use Shell Scripts

For deployment systems that prefer shell scripts:

```bash
# Build
./build.sh

# Start
./start.sh
```

## Deployment Configuration

The `deploy.json` file provides deployment system guidance:

```json
{
  "build": {
    "command": "node next-build.cjs"
  },
  "start": {
    "command": "node next-start.cjs"
  }
}
```

## Environment Variables

Required in production:
- `NODE_ENV=production`
- `PORT` (defaults to 5000)

## Build Output

Successful build creates:
- `.next/` directory with optimized production assets
- Static pages and API routes
- Build traces for deployment optimization

## Verification

Test the deployment fix locally:

```bash
# Build the application
NODE_ENV=production npx next build

# Start production server
NODE_ENV=production npx next start -p 5000
```

Expected output:
```
✓ Ready in 690ms
- Local: http://localhost:5000
```

## Notes

- No custom server wrapper required
- Uses Next.js native production server
- Compatible with all Next.js deployment platforms
- ESM/CommonJS conflicts completely resolved