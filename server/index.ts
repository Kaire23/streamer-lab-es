#!/usr/bin/env node
import { exec } from 'child_process';

const isDevelopment = process.env.NODE_ENV !== 'production';

// Launch Next.js server (dev or production)
const command = isDevelopment 
  ? 'npx next dev --port 5000' 
  : 'npx next start --port 5000';

console.log(`Starting Next.js SSR server in ${isDevelopment ? 'development' : 'production'} mode on port 5000...`);

const child = exec(command, (error, stdout, stderr) => {
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

process.on('exit', () => {
  child.kill();
});