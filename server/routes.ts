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

  // Test email endpoint
  app.post("/api/test-email", async (req, res) => {
    try {
      const sgMail = (await import("@sendgrid/mail")).default;
      
      if (!process.env.SENDGRID_API_KEY) {
        return res.status(500).json({ error: "SendGrid API key not configured" });
      }
      
      sgMail.setApiKey(process.env.SENDGRID_API_KEY);
      
      const { to, from } = req.body;
      
      if (!to || !from) {
        return res.status(400).json({ error: "Both 'to' and 'from' email addresses are required" });
      }
      
      const msg = {
        to: to,
        from: from,
        subject: 'Test Email from Setups de Streamers',
        text: 'This is a test email from your streaming equipment guide website!',
        html: '<strong>This is a test email from your streaming equipment guide website!</strong><br><br>SendGrid integration is working perfectly! 🎮',
      };
      
      await sgMail.send(msg);
      
      console.log(`Test email sent to ${to} from ${from}`);
      res.json({ success: true, message: "Email sent successfully!" });
      
    } catch (error) {
      console.error("Test email error:", error);
      res.status(500).json({ 
        error: "Failed to send email", 
        details: error.message || error
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
