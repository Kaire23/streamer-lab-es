#!/usr/bin/env node

const isDevelopment = process.env.NODE_ENV !== 'production';

if (isDevelopment) {
  // In development, use Next.js dev server
  console.log('Starting Next.js development server on port 5000...');
  process.env.PORT = '5000';
  require('next/dist/bin/next-dev');
} else {
  // In production, use Next.js production server
  console.log('Starting Next.js production server on port 5000...');
  process.env.PORT = '5000';
  require('next/dist/bin/next-start');
}