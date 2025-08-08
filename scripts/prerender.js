#!/usr/bin/env node

/**
 * Pre-render script for generating static HTML pages
 * This ensures search engines can see full content without JavaScript
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read the base HTML template
const distPath = path.join(__dirname, '../dist/public');
const indexPath = path.join(distPath, 'index.html');

if (!fs.existsSync(indexPath)) {
  console.error('❌ Build the project first with: npm run build');
  process.exit(1);
}

const baseHTML = fs.readFileSync(indexPath, 'utf-8');

// Posts data (matching the actual posts)
const posts = [
  {
    slug: 'ibai-llanos',
    title: 'Setup de streaming de Ibai Llanos',
    excerpt: 'Descubre el impresionante setup de Ibai Llanos, uno de los streamers más influyentes de habla hispana.',
    keywords: 'Ibai Llanos setup, equipo streaming Ibai, micrófono Shure SM7B, cámara Sony A7 III, Stream Deck XL Ibai'
  },
  {
    slug: 'elxocas',
    title: 'Setup de streaming de ElXocas',
    excerpt: 'Explora el setup profesional de ElXocas, desde su micrófono hasta su configuración de streaming.',
    keywords: 'ElXocas setup, equipo streaming ElXocas, configuración ElXocas, micrófono streaming, Stream Deck'
  },
  {
    slug: 'illojuan',
    title: 'Setup de streaming de illoJuan',
    excerpt: 'Conoce todos los detalles del setup de illoJuan y cómo ha construido su espacio de streaming perfecto.',
    keywords: 'illoJuan setup, equipo illoJuan, Elgato Key Light, streaming setup español, configuración illoJuan'
  },
  {
    slug: 'thegrefg',
    title: 'Setup de streaming de TheGrefg',
    excerpt: 'Descubre el increíble setup gaming de TheGrefg con su PC personalizado y sistema de iluminación RGB.',
    keywords: 'TheGrefg setup, PC gaming RTX 4090, setup RGB, equipo TheGrefg, streaming profesional'
  },
  {
    slug: 'coscu',
    title: 'Setup de streaming de Coscu',
    excerpt: 'Explora el completo setup del legendario streamer argentino Coscu y su equipamiento profesional.',
    keywords: 'Coscu setup, equipo streaming Argentina, Coscu Army, configuración Coscu, streaming profesional'
  }
];

// Generate static HTML for each post
posts.forEach(post => {
  const postHTML = baseHTML
    // Update title
    .replace(
      /<title>.*?<\/title>/,
      `<title>${post.title} - Setups de Streamers</title>`
    )
    // Update description
    .replace(
      /<meta name="description" content=".*?"/,
      `<meta name="description" content="${post.excerpt}"`
    )
    // Update keywords
    .replace(
      /<meta name="keywords" content=".*?"/,
      `<meta name="keywords" content="${post.keywords}"`
    )
    // Update canonical
    .replace(
      /<link rel="canonical" href=".*?"/,
      `<link rel="canonical" href="https://yostreamer.com/setup/${post.slug}"`
    )
    // Update Open Graph URL
    .replace(
      /<meta property="og:url" content=".*?"/,
      `<meta property="og:url" content="https://yostreamer.com/setup/${post.slug}"`
    )
    // Update Open Graph title
    .replace(
      /<meta property="og:title" content=".*?"/,
      `<meta property="og:title" content="${post.title}"`
    )
    // Update Open Graph description
    .replace(
      /<meta property="og:description" content=".*?"/,
      `<meta property="og:description" content="${post.excerpt}"`
    )
    // Update Twitter URL
    .replace(
      /<meta property="twitter:url" content=".*?"/,
      `<meta property="twitter:url" content="https://yostreamer.com/setup/${post.slug}"`
    )
    // Update Twitter title
    .replace(
      /<meta property="twitter:title" content=".*?"/,
      `<meta property="twitter:title" content="${post.title}"`
    )
    // Update Twitter description
    .replace(
      /<meta property="twitter:description" content=".*?"/,
      `<meta property="twitter:description" content="${post.excerpt}"`
    )
    // Add specific structured data for the post
    .replace(
      /<script type="application\/ld\+json">[\s\S]*?<\/script>/,
      `<script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": "${post.title}",
      "description": "${post.excerpt}",
      "url": "https://yostreamer.com/setup/${post.slug}",
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": "https://yostreamer.com/setup/${post.slug}"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Setups de Streamers",
        "url": "https://yostreamer.com"
      }
    }
    </script>`
    );

  // Create directory structure
  const postDir = path.join(distPath, 'setup', post.slug);
  fs.mkdirSync(postDir, { recursive: true });
  
  // Write the file
  fs.writeFileSync(path.join(postDir, 'index.html'), postHTML);
  console.log(`✅ Pre-rendered: /setup/${post.slug}`);
});

console.log('✨ Pre-rendering complete! All pages have static HTML for SEO.');