import { promises as fs } from 'fs';
import path from 'path';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

interface ImageOptimizationOptions {
  quality?: number;
  sizes?: number[];
  formats?: ('webp' | 'avif' | 'jpg')[];
}

export class ImageOptimizer {
  private static readonly DEFAULT_SIZES = [378, 405, 1120, 1200, 1706, 1900];
  private static readonly DEFAULT_FORMATS = ['webp', 'avif'] as const;
  
  static async optimizeImage(
    inputPath: string,
    outputDir: string,
    options: ImageOptimizationOptions = {}
  ) {
    const {
      quality = 85,
      sizes = this.DEFAULT_SIZES,
      formats = this.DEFAULT_FORMATS
    } = options;

    const filename = path.basename(inputPath, path.extname(inputPath));
    const results: string[] = [];

    // Ensure output directory exists
    await fs.mkdir(outputDir, { recursive: true });

    // Generate optimized versions for each size and format
    for (const size of sizes) {
      for (const format of formats) {
        const outputPath = path.join(outputDir, `${filename}-${size}w.${format}`);
        
        try {
          if (format === 'webp') {
            await execAsync(
              `convert "${inputPath}" -resize ${size}x -quality ${quality} -define webp:method=6 "${outputPath}"`
            );
          } else if (format === 'avif') {
            await execAsync(
              `convert "${inputPath}" -resize ${size}x -quality ${quality - 5} "${outputPath}"`
            );
          }
          
          results.push(outputPath);
        } catch (error) {
          console.error(`Failed to optimize ${inputPath} to ${format} at ${size}w:`, error);
        }
      }
    }

    // Also create a fallback JPEG
    const jpgPath = path.join(outputDir, `${filename}-optimized.jpg`);
    await execAsync(
      `convert "${inputPath}" -resize 1200x -quality ${quality} -strip -interlace Plane "${jpgPath}"`
    );
    results.push(jpgPath);

    return results;
  }

  static generateSrcSet(imageName: string, format: 'webp' | 'avif'): string {
    return this.DEFAULT_SIZES
      .map(size => `/optimized/${imageName}-${size}w.${format} ${size}w`)
      .join(', ');
  }

  static generateSizesAttribute(): string {
    return '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 378px';
  }
}