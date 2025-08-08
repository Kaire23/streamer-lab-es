#!/usr/bin/env node
/**
 * Production deployment test script
 * Tests exact production environment behavior
 */

const { spawn } = require('child_process');
const http = require('http');

async function testProduction() {
  console.log('🧪 Testing production deployment...');
  
  // Start Next.js production server
  console.log('🚀 Starting Next.js production server...');
  const server = spawn('npx', ['next', 'start', '-p', '3002'], {
    env: { ...process.env, NODE_ENV: 'production', PORT: '3002' },
    stdio: 'pipe'
  });

  // Wait for server to start
  await new Promise(resolve => setTimeout(resolve, 3000));

  try {
    // Test HTTP response
    const response = await new Promise((resolve, reject) => {
      const req = http.get('http://localhost:3002/', (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => resolve({ status: res.statusCode, html: data }));
      });
      req.on('error', reject);
      req.setTimeout(5000, () => reject(new Error('Request timeout')));
    });

    console.log(`📊 Response Status: ${response.status}`);
    
    // Check for content
    const hasTitle = response.html.includes('Setups de Streamers');
    const hasContent = response.html.includes('ibai-llanos') || response.html.includes('elxocas');
    const hasPlaceholder = response.html.includes('Edit with ×');
    
    console.log(`✅ Title found: ${hasTitle}`);
    console.log(`✅ Content found: ${hasContent}`);  
    console.log(`❌ Placeholder found: ${hasPlaceholder}`);
    
    if (hasTitle && hasContent && !hasPlaceholder) {
      console.log('🎉 Production deployment test PASSED');
    } else {
      console.log('❌ Production deployment test FAILED');
      console.log('First 500 chars of HTML:');
      console.log(response.html.substring(0, 500));
    }

  } catch (error) {
    console.error('❌ Test failed:', error.message);
  } finally {
    server.kill();
  }
}

testProduction().catch(console.error);