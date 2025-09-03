import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage-new";
import { getSEOData, injectSEOToHTML } from "./seo";
import { schedulePostPlan } from "./seo-content-generator";
import fs from "fs";
import path from "path";

// PDF helper functions
function getPdfInfo(pdfType: string) {
  const pdfMap: Record<string, { name: string; description: string; fileExists: boolean }> = {
    'obs-studio-2025-checklist': {
      name: 'Checklist Completo OBS Studio 2025',
      description: 'Guía paso a paso con todas las configuraciones óptimas, atajos de teclado y troubleshooting para OBS Studio. Perfecto para tener a mano mientras configuras.',
      fileExists: false
    },
    'obs-cpu-optimization-checklist': {
      name: 'Checklist Optimización CPU OBS',
      description: 'Configuraciones específicas para reducir el uso de CPU en OBS Studio y mejorar el rendimiento de streaming.',
      fileExists: false
    },
    'streaming-equipment-guide': {
      name: 'Guía Completa de Equipos de Streaming',
      description: 'Todo lo que necesitas saber sobre micrófonos, cámaras, capturadoras y más para crear un setup profesional.',
      fileExists: false
    }
  };

  return pdfMap[pdfType] || {
    name: 'Guía de Streaming',
    description: 'Contenido exclusivo para mejorar tu setup de streaming.',
    fileExists: false
  };
}

async function getPdfContent(pdfType: string): Promise<Buffer> {
  // For now, return a placeholder since we don't have actual PDF files
  // In production, you would read the actual PDF file from storage
  const placeholderPdf = Buffer.from(`%PDF-1.4
1 0 obj
<<
/Type /Catalog
/Pages 2 0 R
>>
endobj
2 0 obj
<<
/Type /Pages
/Kids [3 0 R]
/Count 1
>>
endobj
3 0 obj
<<
/Type /Page
/Parent 2 0 R
/MediaBox [0 0 612 792]
/Contents 4 0 R
>>
endobj
4 0 obj
<<
/Length 44
>>
stream
BT
/F1 12 Tf
100 700 Td
(${getPdfInfo(pdfType).name}) Tj
ET
endstream
endobj
xref
0 5
0000000000 65535 f 
0000000009 00000 n 
0000000058 00000 n 
0000000115 00000 n 
0000000191 00000 n 
trailer
<<
/Size 5
/Root 1 0 R
>>
startxref
285
%%EOF`);

  return placeholderPdf;
}

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

      const sgMail = (await import("@sendgrid/mail")).default;
      
      if (!process.env.SENDGRID_API_KEY) {
        console.error("SendGrid API key not configured");
        return res.status(500).json({ error: "Configuración de email pendiente" });
      }
      
      sgMail.setApiKey(process.env.SENDGRID_API_KEY);

      const msg = {
        to: email,
        from: 'noreply@yostreamer.com', // Replace with your verified sender
        subject: '¡Bienvenido a Setups de Streamers! 🎮',
        text: `¡Hola!

Gracias por suscribirte a Setups de Streamers, la guía más completa de equipos de streaming en español.

Te mantendremos al día con:
• Nuevas guías de streamers famosos
• Reviews de equipos gaming
• Tips de configuración
• Ofertas exclusivas en equipos

¡Prepárate para llevar tu stream al siguiente nivel!

Saludos,
Equipo Setups de Streamers`,
        html: `
          <h2>¡Bienvenido a Setups de Streamers! 🎮</h2>
          <p>¡Hola!</p>
          
          <p>Gracias por suscribirte a <strong>Setups de Streamers</strong>, la guía más completa de equipos de streaming en español.</p>
          
          <h3>Te mantendremos al día con:</h3>
          <ul>
            <li>✅ Nuevas guías de streamers famosos</li>
            <li>🎧 Reviews de equipos gaming</li>
            <li>⚙️ Tips de configuración</li>
            <li>💰 Ofertas exclusivas en equipos</li>
          </ul>
          
          <p><strong>¡Prepárate para llevar tu stream al siguiente nivel!</strong></p>
          
          <p>Saludos,<br>
          <strong>Equipo Setups de Streamers</strong></p>
        `,
      };

      await sgMail.send(msg);
      console.log(`Welcome email sent to ${email}`);
      
      res.json({ success: true, message: "Suscripción exitosa" });
    } catch (error) {
      console.error("Subscribe error:", error);
      res.status(500).json({ error: "Error al procesar suscripción" });
    }
  });

  // PDF subscription endpoint with email delivery
  app.post("/api/subscribe-pdf", async (req, res) => {
    try {
      const { email, pdfType, pdfUrl } = req.body;
      
      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return res.status(400).json({ error: "Email inválido" });
      }

      if (!pdfType) {
        return res.status(400).json({ error: "Tipo de PDF requerido" });
      }

      const sgMail = (await import("@sendgrid/mail")).default;
      
      if (!process.env.SENDGRID_API_KEY) {
        console.error("SendGrid API key not configured");
        return res.status(500).json({ error: "Configuración de email pendiente" });
      }
      
      sgMail.setApiKey(process.env.SENDGRID_API_KEY);

      // Map PDF types to friendly names and descriptions
      const pdfInfo = getPdfInfo(pdfType);

      const msg = {
        to: email,
        from: 'noreply@yostreamer.com', // Replace with your verified sender
        subject: `📥 Tu ${pdfInfo.name} está aquí - Setups de Streamers`,
        text: `¡Hola!

Aquí tienes tu ${pdfInfo.name} que solicitaste de Setups de Streamers.

${pdfInfo.description}

Próximamente te enviaremos:
• Nuevas guías de streamers famosos
• Tips de configuración avanzados
• Reviews de equipos gaming
• Ofertas exclusivas

¡Prepárate para llevar tu stream al siguiente nivel!

Saludos,
Equipo Setups de Streamers

PD: Si no encuentras el email, revisa tu carpeta de spam.`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #4F46E5;">📥 Tu ${pdfInfo.name} está aquí</h2>
            
            <p>¡Hola!</p>
            
            <p>Aquí tienes tu <strong>${pdfInfo.name}</strong> que solicitaste de Setups de Streamers.</p>
            
            <div style="background: #F3F4F6; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <p style="margin: 0;"><strong>📋 ${pdfInfo.name}</strong></p>
              <p style="margin: 10px 0 0 0; color: #6B7280;">${pdfInfo.description}</p>
            </div>
            
            <div style="background: #EEF2FF; border: 1px solid #C7D2FE; padding: 15px; border-radius: 8px; margin: 20px 0;">
              <p style="margin: 0; color: #4338CA;"><strong>📧 Próximamente te enviaremos:</strong></p>
              <ul style="color: #4338CA; margin: 10px 0 0 0;">
                <li>✅ Nuevas guías de streamers famosos</li>
                <li>⚙️ Tips de configuración avanzados</li>
                <li>🎧 Reviews de equipos gaming</li>
                <li>💰 Ofertas exclusivas</li>
              </ul>
            </div>
            
            <p><strong>¡Prepárate para llevar tu stream al siguiente nivel!</strong></p>
            
            <hr style="border: 1px solid #E5E7EB; margin: 30px 0;">
            
            <p style="color: #6B7280; font-size: 14px;">
              Saludos,<br>
              <strong>Equipo Setups de Streamers</strong><br><br>
              <em>PD: Si no encuentras el email, revisa tu carpeta de spam.</em>
            </p>
          </div>
        `,
        attachments: pdfInfo.fileExists ? [{
          filename: `${pdfInfo.name}.pdf`,
          content: await getPdfContent(pdfType),
          type: 'application/pdf',
          disposition: 'attachment'
        }] : []
      };

      await sgMail.send(msg);
      console.log(`PDF email sent to ${email} for ${pdfType}`);
      
      res.json({ 
        success: true, 
        message: "PDF enviado exitosamente a tu email",
        pdfType: pdfType
      });
    } catch (error) {
      console.error("PDF subscribe error:", error);
      res.status(500).json({ 
        error: "Error al enviar PDF", 
        details: error instanceof Error ? error.message : String(error)
      });
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
