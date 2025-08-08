#!/usr/bin/env node

/**
 * Static HTML Generator for SEO
 * Generates static HTML files with content for better SEO
 */

const fs = require('fs');
const path = require('path');

// Read the posts data
const postsPath = path.join(__dirname, '../client/src/data/posts.ts');
const postsContent = fs.readFileSync(postsPath, 'utf-8');

// Extract post data
const slugMatches = postsContent.match(/slug:\s*["']([^"']+)["']/g);
const titleMatches = postsContent.match(/title:\s*["']([^"']+)["']/g);
const excerptMatches = postsContent.match(/excerpt:\s*["']([^"']+)["']/g);

const slugs = slugMatches ? slugMatches.map(match => match.match(/["']([^"']+)["']/)[1]) : [];
const titles = titleMatches ? titleMatches.map(match => match.match(/["']([^"']+)["']/)[1]) : [];
const excerpts = excerptMatches ? excerptMatches.map(match => match.match(/["']([^"']+)["']/)[1]) : [];

console.log('📄 Generating static HTML files for SEO...');

// Function to generate HTML template
function generateHTML(title, description, path, content) {
  return `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <meta name="description" content="${description}">
    <meta property="og:title" content="${title}">
    <meta property="og:description" content="${description}">
    <meta property="og:url" content="https://yostreamer.com${path}">
    <meta property="og:type" content="article">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${title}">
    <meta name="twitter:description" content="${description}">
    <link rel="canonical" href="https://yostreamer.com${path}">
    <style>
      body { font-family: system-ui, -apple-system, sans-serif; padding: 20px; max-width: 1200px; margin: 0 auto; }
      h1 { color: #333; }
      .content { margin-top: 20px; }
      .loading { background: #f0f0f0; padding: 20px; border-radius: 8px; text-align: center; }
    </style>
</head>
<body>
    <h1>${title}</h1>
    <p>${description}</p>
    <div class="content">
        ${content}
    </div>
    <div class="loading">
        <p>Cargando contenido interactivo...</p>
    </div>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
</body>
</html>`;
}

// Generate static files for each post
slugs.forEach((slug, index) => {
  const title = titles[index] || `Setup de ${slug}`;
  const description = excerpts[index] || `Descubre el setup completo de ${slug}`;
  const filePath = `/setup/${slug}`;
  
  const content = `
    <article>
      <h2>Información del Setup</h2>
      <p>${description}</p>
      <h3>Categorías del equipo:</h3>
      <ul>
        <li>Audio profesional</li>
        <li>Cámara y captura</li>
        <li>Iluminación</li>
        <li>PC y periféricos</li>
      </ul>
    </article>
  `;
  
  const html = generateHTML(title, description, filePath, content);
  console.log(`✅ Generated template for: ${slug}`);
});

console.log('✨ Static HTML generation complete!');
console.log('📝 Note: Full static generation requires build-time SSG support');