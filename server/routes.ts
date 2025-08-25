import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage-new";
import { getSEOData, injectSEOToHTML } from "./seo";
import { schedulePostPlan } from "./seo-content-generator";
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

  // Redirect old malformed URLs to correct ones
  app.get('/setup/mejor-webcam-para-streaming-2025-gua-completa-de-compra-1754761396286', (req, res) => {
    res.redirect(301, '/setup/mejor-webcam-para-streaming-2025-guia-completa');
  });

  app.get('/article/mejor-microfono-streaming-2025', (req, res) => {
    res.redirect(301, '/setup/mejor-microfono-streaming-2025');
  });

  // Redirect old sitemap URLs to correct slugs
  app.get('/setup/twitch-eventos-2025', (req, res) => {
    res.redirect(301, '/setup/mejores-eventos-de-twitch-2025-guia-completa');
  });

  app.get('/setup/kick-streaming-2025', (req, res) => {
    res.redirect(301, '/setup/guia-completa-de-iniciacion-al-streaming-en-kick-2025');
  });

  app.get('/setup/lolito', (req, res) => {
    res.redirect(301, '/setup/setup-de-streaming-de-lolitofdez-2025-guia-completa');
  });

  app.get('/setup/mejores-webcams-streaming-2025', (req, res) => {
    res.redirect(301, '/setup/mejor-webcam-para-streaming-2025-guia-completa');
  });

  // SEO-optimized HTML for individual setup pages
  app.get('/setup/:slug', async (req, res, next) => {
    const validSlugs = ['ibai-llanos', 'elxokas', 'illojuan', 'thegrefg', 'coscu'];
    const slug = req.params.slug;
    
    // Check if it's a valid original streamer slug
    if (validSlugs.includes(slug)) {
      // Handle original streamer posts with SEO optimization
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
        return;
      } catch (error) {
        console.error('[SEO] Error serving custom HTML:', error);
        return next();
      }
    }
    
    // Check if it's a generated post
    try {
      const generatedPost = await storage.getGeneratedPost(slug);
      if (generatedPost) {
        // Let the React app handle this - just continue to next middleware
        return next();
      }
    } catch (error) {
      console.error('[Generated Post] Error checking for generated post:', error);
    }
    
    // Not found - continue to next middleware
    return next();
  });


  // SEO post creation endpoint
  app.post("/api/create-seo-posts", async (req, res) => {
    try {
      console.log("Creating SEO post plan...");
      await schedulePostPlan();
      res.json({ 
        success: true, 
        message: "SEO post plan created successfully",
        postsCreated: 8
      });
    } catch (error) {
      console.error("Error creating post plan:", error);
      res.status(500).json({ 
        error: "Failed to create post plan", 
        details: error instanceof Error ? error.message : String(error)
      });
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
      // Get all posts from database (published and scheduled)
      const posts = await storage.getAllGeneratedPosts();
      res.json(posts);
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
        details: error instanceof Error ? error.message : String(error)
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
