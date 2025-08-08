#!/usr/bin/env node

// Production start script for Next.js deployment
// This ensures proper Next.js production server startup

const { spawn } = require('child_process');
const path = require('path');

const port = process.env.PORT || '5000';

console.log('Starting Next.js production server on port', port);

const nextStart = spawn('npx', ['next', 'start', '-p', port], {
  cwd: process.cwd(),
  stdio: 'inherit',
  env: { ...process.env, PORT: port, NODE_ENV: 'production' }
});

nextStart.on('error', (error) => {
  console.error('Failed to start Next.js production server:', error);
  process.exit(1);
});

nextStart.on('close', (code) => {
  console.log(`Next.js production server exited with code ${code}`);
  process.exit(code || 0);
});

// Handle graceful shutdown
process.on('SIGTERM', () => {
  console.log('Received SIGTERM, shutting down gracefully');
  nextStart.kill('SIGTERM');
});

process.on('SIGINT', () => {
  console.log('Received SIGINT, shutting down gracefully');
  nextStart.kill('SIGINT');
});