#!/usr/bin/env node
/**
 * Deployment-specific Next.js launcher
 * This file ensures the application starts correctly in production environments
 */

const { execSync, spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

// Set production environment
process.env.NODE_ENV = 'production';
const port = process.env.PORT || 5000;

console.log('🚀 Starting Next.js application for deployment...');
console.log(`📡 Port: ${port}`);
console.log(`🌍 Environment: ${process.env.NODE_ENV}`);

try {
  // Check if .next directory exists, if not build first
  const nextDir = path.join(process.cwd(), '.next');
  if (!fs.existsSync(nextDir)) {
    console.log('⚠️  .next directory not found, running build...');
    execSync('npx next build', { stdio: 'inherit' });
    console.log('✅ Build completed');
  }

  // Verify build exists
  if (!fs.existsSync(nextDir)) {
    console.error('❌ Build failed: .next directory still missing');
    process.exit(1);
  }

  console.log('✅ Next.js build found, starting production server...');

  // Start Next.js production server
  const nextProcess = spawn('npx', ['next', 'start', '--port', port.toString()], {
    stdio: 'inherit',
    env: { ...process.env, NODE_ENV: 'production' }
  });

  // Handle graceful shutdown
  process.on('SIGTERM', () => {
    console.log('🛑 Received SIGTERM, shutting down gracefully...');
    nextProcess.kill('SIGTERM');
  });

  process.on('SIGINT', () => {
    console.log('🛑 Received SIGINT, shutting down gracefully...');
    nextProcess.kill('SIGINT');
  });

  nextProcess.on('close', (code) => {
    console.log(`Next.js process exited with code ${code}`);
    process.exit(code);
  });

  nextProcess.on('error', (err) => {
    console.error('❌ Failed to start Next.js server:', err);
    process.exit(1);
  });

} catch (error) {
  console.error('❌ Deployment startup failed:', error.message);
  process.exit(1);
}