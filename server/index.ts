#!/usr/bin/env node
import { exec } from 'child_process';

// Launch Next.js dev server
const child = exec('npx next dev --port 5000', (error, stdout, stderr) => {
  if (error) {
    console.error(`Error: ${error}`);
    return;
  }
  console.log(stdout);
  if (stderr) {
    console.error(stderr);
  }
});

child.stdout?.pipe(process.stdout);
child.stderr?.pipe(process.stderr);

// Handle process termination
process.on('SIGINT', () => {
  child.kill('SIGINT');
  process.exit();
});

process.on('SIGTERM', () => {
  child.kill('SIGTERM');
  process.exit();
});

console.log('Starting Next.js SSR server on port 5000...');