#!/usr/bin/env node

import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '..');

const isDevelopment = process.env.NODE_ENV !== 'production';
const port = process.env.PORT || '5000';

if (isDevelopment) {
  console.log('Starting Next.js development server on port', port);
  const nextDev = spawn('npx', ['next', 'dev', '-p', port], {
    cwd: projectRoot,
    stdio: 'inherit',
    env: { ...process.env, PORT: port }
  });

  nextDev.on('error', (error) => {
    console.error('Failed to start Next.js dev server:', error);
    process.exit(1);
  });

  nextDev.on('close', (code) => {
    console.log(`Next.js dev server exited with code ${code}`);
    process.exit(code || 0);
  });
} else {
  console.log('Starting Next.js production server on port', port);
  const nextStart = spawn('npx', ['next', 'start', '-p', port], {
    cwd: projectRoot,
    stdio: 'inherit',
    env: { ...process.env, PORT: port }
  });

  nextStart.on('error', (error) => {
    console.error('Failed to start Next.js production server:', error);
    process.exit(1);
  });

  nextStart.on('close', (code) => {
    console.log(`Next.js production server exited with code ${code}`);
    process.exit(code || 0);
  });
}