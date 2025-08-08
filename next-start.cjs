#!/usr/bin/env node
/**
 * Custom start script that ensures Next.js production server
 * This script can be used as an alternative to package.json start command
 */

const { execSync, spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const port = process.env.PORT || 5000;

console.log(`Starting Next.js production server on port ${port}...`);

try {
  // Check if .next directory exists
  const nextDir = path.join(process.cwd(), '.next');
  if (!fs.existsSync(nextDir)) {
    console.log('⚠️  .next directory not found, running build first...');
    execSync('npx next build', { stdio: 'inherit' });
  }
  
  console.log('✅ Starting Next.js production server...');
  
  // Start Next.js in production mode
  const nextStart = spawn('npx', ['next', 'start', '--port', port], {
    stdio: 'inherit',
    env: { ...process.env, NODE_ENV: 'production' }
  });
  
  // Handle process termination
  process.on('SIGINT', () => {
    nextStart.kill('SIGINT');
    process.exit();
  });
  
  process.on('SIGTERM', () => {
    nextStart.kill('SIGTERM');
    process.exit();
  });
  
  nextStart.on('close', (code) => {
    console.log(`Next.js server exited with code ${code}`);
    process.exit(code);
  });
  
} catch (error) {
  console.error('❌ Failed to start server:', error.message);
  process.exit(1);
}