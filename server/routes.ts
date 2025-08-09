import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { getSEOData, injectSEOToHTML } from "./seo";
import fs from "fs";
import path from "path";

export async function registerRoutes(app: Express): Promise<Server> {
  // SEO redirects: redirect legacy /post/ URLs to canonical /setup/ URLs
  app.get('/post/:slug', (req, res) => {
    res.redirect(301, `/setup/${req.params.slug}`);
  });

  // Redirect old elxocas URL to new elxokas URL
  app.get('/setup/elxocas', (req, res) => {
    res.redirect(301, '/setup/elxokas');
  });

  // SEO-optimized HTML for homepage
  app.get('/', async (req, res, next) => {
    try {
      const seoData = getSEOData('/');
      
      // Read the base HTML template
      const templatePath = path.resolve(import.meta.dirname, '..', 'client', 'index.html');
      let html = await fs.promises.readFile(templatePath, 'utf-8');
      
      // Inject SEO data for homepage
      html = injectSEOToHTML(html, seoData);
      
      // Replace script paths to make them work properly
      html = html.replace('src="/src/main.tsx"', `src="/src/main.tsx?t=${Date.now()}"`);
      
      // Add cache headers for SEO crawlers
      res.set({
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'public, max-age=3600',
        'X-Custom-SEO': 'true'
      });
      
      console.log(`[SEO] Serving custom HTML for homepage with title: ${seoData.title}`);
      res.send(html);
    } catch (error) {
      console.error('[SEO] Error serving custom HTML for homepage:', error);
      next();
    }
  });

  // SEO-optimized HTML for individual setup pages
  app.get('/setup/:slug', async (req, res, next) => {
    const validSlugs = ['ibai-llanos', 'elxokas', 'illojuan', 'thegrefg', 'coscu'];
    const slug = req.params.slug;
    
    // Only handle valid streamer slugs
    if (!validSlugs.includes(slug)) {
      return next();
    }
    
    try {
      const seoData = getSEOData(`/setup/${slug}`);
      
      // Read the base HTML template
      const templatePath = path.resolve(import.meta.dirname, '..', 'client', 'index.html');
      let html = await fs.promises.readFile(templatePath, 'utf-8');
      
      // Inject SEO data for this specific page
      html = injectSEOToHTML(html, seoData);
      
      // Replace script paths to make them work properly
      html = html.replace('src="/src/main.tsx"', `src="/src/main.tsx?t=${Date.now()}"`);
      
      // Add cache headers for SEO crawlers
      res.set({
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'public, max-age=3600',
        'X-Custom-SEO': 'true'
      });
      
      console.log(`[SEO] Serving custom HTML for /setup/${slug} with title: ${seoData.title}`);
      res.send(html);
    } catch (error) {
      console.error('[SEO] Error serving custom HTML:', error);
      next();
    }
  });

  // put application routes here
  // prefix all routes with /api

  // use storage to perform CRUD operations on the storage interface
  // e.g. storage.insertUser(user) or storage.getUserByUsername(username)

  const httpServer = createServer(app);

  return httpServer;
}
