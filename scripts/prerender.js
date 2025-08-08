const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Get the list of post slugs for prerendering
const postsPath = path.join(__dirname, '../client/src/data/posts.ts');
const postsContent = fs.readFileSync(postsPath, 'utf-8');

// Extract slugs from the posts file
const slugMatches = postsContent.match(/slug:\s*["']([^"']+)["']/g);
const slugs = slugMatches ? slugMatches.map(match => match.match(/["']([^"']+)["']/)[1]) : [];

console.log('Found slugs:', slugs);

// Routes to prerender
const routes = [
  '/',
  ...slugs.map(slug => `/setup/${slug}`)
];

console.log('Routes to prerender:', routes);

// This script would be used to generate static HTML files
// For now, we'll document the approach for when the build system supports it
console.log('SSG preparation complete. Routes identified for static generation.');