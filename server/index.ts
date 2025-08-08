#!/usr/bin/env node
/**
 * Simple Next.js launcher without ESM conflicts
 * Uses direct process spawn to avoid dynamic require() issues
 */

import { spawn } from 'child_process';

const isDev = process.env.NODE_ENV !== 'production';
const port = process.env.PORT || '5000';

console.log(`🚀 Starting Next.js in ${isDev ? 'development' : 'production'} mode...`);
console.log(`📡 Port: ${port}`);

// Use direct Next.js CLI without dynamic imports
const args = isDev 
  ? ['next', 'dev', '--port', port]
  : ['next', 'start', '--port', port];

const nextProcess = spawn('npx', args, {
  stdio: 'inherit',
  env: { ...process.env, PORT: port }
});

nextProcess.on('close', (code) => {
  process.exit(code || 0);
});

nextProcess.on('error', (err) => {
  console.error('❌ Failed to start Next.js:', err);
  process.exit(1);
});