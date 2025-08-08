#!/usr/bin/env node

// Production build script for Next.js deployment
// This ensures proper Next.js build process

const { spawn } = require('child_process');
const path = require('path');

console.log('Building Next.js application for production...');

const nextBuild = spawn('npx', ['next', 'build'], {
  cwd: process.cwd(),
  stdio: 'inherit',
  env: { ...process.env, NODE_ENV: 'production' }
});

nextBuild.on('error', (error) => {
  console.error('Failed to build Next.js application:', error);
  process.exit(1);
});

nextBuild.on('close', (code) => {
  if (code === 0) {
    console.log('Next.js build completed successfully');
  } else {
    console.error(`Next.js build failed with code ${code}`);
  }
  process.exit(code || 0);
});