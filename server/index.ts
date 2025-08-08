#!/usr/bin/env node
/**
 * Server entry point for Next.js application
 * Handles development and production modes
 */
import { spawn } from 'child_process';

const isDev = process.env.NODE_ENV !== 'production';
const port = process.env.PORT || '5000';

console.log(`🚀 Starting Next.js in ${isDev ? 'development' : 'production'} mode...`);
console.log(`📡 Port: ${port}`);

const command = isDev ? 'dev' : 'start';
const nextProcess = spawn('npx', ['next', command, '--port', port], {
  stdio: 'inherit',
  env: { ...process.env, NODE_ENV: isDev ? 'development' : 'production' }
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
  process.exit(code || 0);
});

nextProcess.on('error', (err) => {
  console.error('❌ Failed to start Next.js server:', err);
  process.exit(1);
});