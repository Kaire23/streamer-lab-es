#!/usr/bin/env tsx
import { promises as fs } from 'fs';
import path from 'path';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

const SIZES = [378, 405, 1120, 1200, 1706, 1900];
const QUALITY = 85;

async function optimizeImage(inputPath: string, outputDir: string, baseName: string) {
  console.log(`Optimizing ${baseName}...`);
  
  // Create WebP versions
  for (const size of SIZES) {
    const webpPath = path.join(outputDir, `${baseName}-${size}w.webp`);
    try {
      await execAsync(
        `convert "${inputPath}" -resize ${size}x> -quality ${QUALITY} -define webp:method=6 "${webpPath}"`
      );
      console.log(`  ✓ Created ${baseName}-${size}w.webp`);
    } catch (err) {
      console.error(`  ✗ Failed to create WebP at ${size}w:`, err);
    }
  }
  
  // Create AVIF versions (higher compression)
  for (const size of SIZES) {
    const avifPath = path.join(outputDir, `${baseName}-${size}w.avif`);
    try {
      await execAsync(
        `convert "${inputPath}" -resize ${size}x> -quality ${QUALITY - 10} "${avifPath}"`
      );
      console.log(`  ✓ Created ${baseName}-${size}w.avif`);
    } catch (err) {
      console.error(`  ✗ Failed to create AVIF at ${size}w:`, err);
    }
  }
  
  // Create optimized JPEG fallback
  const jpgPath = path.join(outputDir, `${baseName}-optimized.jpg`);
  try {
    await execAsync(
      `convert "${inputPath}" -resize 1200x> -quality ${QUALITY} -strip -interlace Plane -sampling-factor 4:2:0 "${jpgPath}"`
    );
    console.log(`  ✓ Created optimized JPEG fallback`);
  } catch (err) {
    console.error(`  ✗ Failed to create optimized JPEG:`, err);
  }
}

async function main() {
  const outputDir = path.join(process.cwd(), 'public', 'optimized');
  await fs.mkdir(outputDir, { recursive: true });
  
  // Map of original images to optimize
  const images = [
    { input: 'attached_assets/ibai.png_1754694152583.webp', name: 'ibai-llanos-hero' },
    { input: 'attached_assets/elxocas.jpg_1754694152583.webp', name: 'elxocas-hero' },
    { input: 'attached_assets/illojuan.jpg_1754694152583.webp', name: 'illojuan-hero' },
    { input: 'attached_assets/thegrefg_1754694152583.avif', name: 'thegrefg-hero' },
    { input: 'attached_assets/coscu_1754694152583.jpg', name: 'coscu-hero' }
  ];
  
  for (const img of images) {
    const inputPath = path.join(process.cwd(), img.input);
    try {
      await fs.access(inputPath);
      await optimizeImage(inputPath, outputDir, img.name);
    } catch (err) {
      console.error(`Could not process ${img.input}:`, err);
    }
  }
  
  console.log('\n✅ Image optimization complete!');
  
  // Show file sizes
  const files = await fs.readdir(outputDir);
  let totalSize = 0;
  for (const file of files) {
    const stats = await fs.stat(path.join(outputDir, file));
    totalSize += stats.size;
  }
  console.log(`Total optimized images size: ${(totalSize / 1024 / 1024).toFixed(2)} MB`);
}

main().catch(console.error);