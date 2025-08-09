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

  // API routes for subscription system
  app.post("/api/subscribe", async (req, res) => {
    try {
      const { email } = req.body;
      
      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return res.status(400).json({ error: "Email inválido" });
      }

      // For now, just return success - we'll implement full subscription later
      res.json({ success: true, message: "Suscripción exitosa" });
    } catch (error) {
      console.error("Subscribe error:", error);
      res.status(500).json({ error: "Error al procesar suscripción" });
    }
  });

  app.get("/api/generated-posts", async (req, res) => {
    try {
      // Return the SEO articles as posts for now
      const seoArticles = await import("../client/src/data/seo-articles");
      res.json(seoArticles.seoArticles || []);
    } catch (error) {
      console.error("Get posts error:", error);
      res.status(500).json({ error: "Error al obtener posts" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
