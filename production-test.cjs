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
    stdio: 'inherit'
  });

  // Wait for server to start
  await new Promise(resolve => setTimeout(resolve, 4000));

  try {
    // Test HTTP response
    const response = await new Promise((resolve, reject) => {
      const req = http.get('http://localhost:3002/', (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => resolve({ status: res.statusCode, html: data }));
      });
      req.on('error', reject);
      req.setTimeout(10000, () => reject(new Error('Request timeout')));
    });

    console.log(`📊 Response Status: ${response.status}`);
    console.log(`📄 HTML Length: ${response.html.length} bytes`);
    
    // Check for content
    const hasTitle = response.html.includes('Setups de Streamers');
    const hasContent = response.html.includes('ibai-llanos') || response.html.includes('elxocas');
    const hasPlaceholder = response.html.includes('Edit with ×');
    
    console.log(`✅ Title found: ${hasTitle}`);
    console.log(`✅ Content found: ${hasContent}`);  
    console.log(`❌ Placeholder found: ${hasPlaceholder}`);
    
    if (hasTitle && hasContent && !hasPlaceholder) {
      console.log('🎉 Production deployment test PASSED');
      return true;
    } else {
      console.log('❌ Production deployment test FAILED');
      console.log('First 1000 chars of HTML:');
      console.log(response.html.substring(0, 1000));
      return false;
    }

  } catch (error) {
    console.error('❌ Test failed:', error.message);
    return false;
  } finally {
    server.kill();
  }
}

testProduction().then(success => {
  process.exit(success ? 0 : 1);
}).catch(err => {
  console.error(err);
  process.exit(1);
});