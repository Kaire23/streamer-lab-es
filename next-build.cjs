#!/usr/bin/env node
/**
 * Custom build script that ensures Next.js build instead of Vite build
 * This script can be used as an alternative to package.json build command
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('Starting Next.js production build...');

try {
  // Run Next.js build
  execSync('npx next build', { stdio: 'inherit' });
  
  // Verify the build was successful
  const nextDir = path.join(process.cwd(), '.next');
  if (fs.existsSync(nextDir)) {
    console.log('✅ Next.js build completed successfully');
    console.log('✅ .next directory created');
    
    // Create dist directory for deployment compatibility if needed
    const distDir = path.join(process.cwd(), 'dist');
    if (!fs.existsSync(distDir)) {
      fs.mkdirSync(distDir, { recursive: true });
    }
    
    // Create a simple index.html in dist for deployment systems that expect it
    const distIndexPath = path.join(distDir, 'index.html');
    fs.writeFileSync(distIndexPath, 
      '<!DOCTYPE html><html><head><title>YoStreamer</title></head><body><div id="root"></div></body></html>'
    );
    
    console.log('✅ Deployment compatibility files created');
    process.exit(0);
  } else {
    console.error('❌ Build failed: .next directory not found');
    process.exit(1);
  }
} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}