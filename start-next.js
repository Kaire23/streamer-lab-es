#!/usr/bin/env node
const { spawn } = require('child_process');

const child = spawn('npx', ['next', 'dev', '--port', '5000'], {
  stdio: 'inherit',
  shell: true
});

child.on('error', (err) => {
  console.error('Failed to start Next.js:', err);
  process.exit(1);
});

child.on('exit', (code) => {
  process.exit(code);
});
