import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage-new";
import { getSEOData, injectSEOToHTML } from "./seo";
import { schedulePostPlan } from "./seo-content-generator";
import { MailService } from '@sendgrid/mail';
import { lagPredictor, type StreamConfig } from "./ai/lagPredictor";
import fs from "fs";
import path from "path";

// Initialize SendGrid
const mailService = new MailService();
if (process.env.SENDGRID_API_KEY) {
  mailService.setApiKey(process.env.SENDGRID_API_KEY);
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

  // Additional canonical URL redirects for problematic Google indexing issues
  app.get('/setup/ari-gameplays-setup', (req, res) => {
    res.redirect(301, '/setup/arigameplays');
  });

  app.get('/setup/elxocas-setup', (req, res) => {
    res.redirect(301, '/setup/elxokas');
  });

  app.get('/setup/luzu', (req, res) => {
    res.redirect(301, '/setup/setup-de-streaming-de-luzu-2025-guia-completa');
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

      // Send welcome email with SendGrid
      const emailData = {
        to: email,
        from: {
          email: 'hola@yostreamer.com',
          name: 'Setups de Streamers'
        },
        subject: '🎮 ¡Bienvenido a Setups de Streamers!',
        html: `
          <h2 style="color: #667eea;">¡Gracias por suscribirte! 🎮</h2>
          <p>Hola,</p>
          <p>¡Te has suscrito exitosamente a <strong>Setups de Streamers</strong>!</p>
          <p>Ahora recibirás:</p>
          <ul>
            <li>📧 <strong>Nuevas guías y tutoriales</strong> cada semana</li>
            <li>💡 <strong>Trucos exclusivos</strong> para optimizar tu setup</li>
            <li>🛒 <strong>Ofertas especiales</strong> en equipamiento de streaming</li>
            <li>🎁 <strong>PDFs gratuitos</strong> con configuraciones paso a paso</li>
          </ul>
          <p><strong>Para empezar</strong>, te recomendamos visitar:</p>
          <ul>
            <li><a href="https://yostreamer.com/setup/setup-streaming-por-menos-de-100-euros-actualizado-septiembre-2025">Setup completo por menos de 100€</a></li>
            <li><a href="https://yostreamer.com/setup/mi-pc-no-puede-con-obs-10-trucos-bajar-cpu-instante-actualizado-septiembre-2025">10 trucos para optimizar OBS</a></li>
            <li><a href="https://yostreamer.com/setup/obs-vs-streamlabs-2025-ganador-definitivo-tras-100-horas-pruebas-actualizado-septiembre-2025">OBS vs Streamlabs: comparativa completa</a></li>
          </ul>
          <p>¡Nos vemos en el próximo email!</p>
          <p>Un saludo,<br><strong>Equipo Setups de Streamers</strong></p>
          <hr>
          <p style="font-size: 12px; color: #666;">Para darte de baja, responde a este email con "UNSUBSCRIBE"</p>
        `
      };
      
      await mailService.send(emailData);
      console.log(`[EMAIL] Welcome email sent to: ${email}`);
      
      res.json({ success: true, message: "Suscripción exitosa - revisa tu email" });
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

  // Email subscription endpoint for PDF delivery
  app.post('/api/subscribe-pdf', async (req, res) => {
    try {
      const { email, pdfType } = req.body;
      
      if (!email) {
        return res.status(400).json({ error: 'Email is required' });
      }
      
      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({ error: 'Invalid email format' });
      }
      
      let pdfPath, subject, emailContent;
      
      if (pdfType === 'obs-cpu') {
        pdfPath = path.join(import.meta.dirname, '..', 'client', 'public', 'obs-cpu-10-trucos.pdf');
        subject = '🎁 Tu PDF: 10 Trucos para Bajar CPU de OBS al Instante';
        emailContent = `
          <h2 style="color: #667eea;">¡Aquí tienes tu PDF con los 10 trucos!</h2>
          <p>Hola,</p>
          <p>Como prometimos, aquí tienes tu PDF <strong>GRATUITO</strong> con todos los trucos para bajar el CPU de OBS del 90% al 30-40%.</p>
          <p>📎 <strong>Archivo adjunto:</strong> obs-cpu-10-trucos.pdf</p>
          <h3>Los 3 trucos más efectivos:</h3>
          <ol>
            <li><strong>Encoder preset a ultrafast</strong> → -60% CPU</li>
            <li><strong>Hardware encoding</strong> (si tienes GPU) → -70% CPU</li>
            <li><strong>Output resolution a 720p</strong> → -40% CPU</li>
          </ol>
          <p>Si tienes dudas, responde este email. ¡Estamos aquí para ayudarte!</p>
          <p>Un saludo,<br><strong>Equipo Setups de Streamers</strong></p>
          <hr>
          <p style="font-size: 12px; color: #666;">Para más guías como esta, visita <a href="https://yostreamer.com">yostreamer.com</a></p>
        `;
      } else if (pdfType === 'setup') {
        pdfPath = path.join(import.meta.dirname, '..', 'client', 'public', 'setup-streaming-100-euros.pdf');
        subject = '🎁 Tu PDF: Setup Streaming Completo por 100€';
        emailContent = `
          <h2 style="color: #667eea;">¡Tu setup de 100€ está aquí!</h2>
          <p>Hola,</p>
          <p>Como prometimos, aquí tienes tu <strong>setup completo</strong> con todos los enlaces, precios actualizados y configuraciones paso a paso.</p>
          <p>📎 <strong>Archivo adjunto:</strong> setup-streaming-100-euros.pdf</p>
          <h3>Lo que incluye tu PDF:</h3>
          <ul>
            <li>✅ <strong>Lista de compras completa</strong> con enlaces directos a Amazon</li>
            <li>✅ <strong>Configuraciones de OBS</strong> paso a paso</li>
            <li>✅ <strong>Posicionamiento de equipo</strong> para máxima calidad</li>
            <li>✅ <strong>Troubleshooting</strong> de problemas comunes</li>
            <li>✅ <strong>Path de upgrade</strong> cuando tu canal crezca</li>
          </ul>
          <p>¡Con este setup ya puedes empezar a generar tus primeros ingresos streaming!</p>
          <p>Un saludo,<br><strong>Equipo Setups de Streamers</strong></p>
          <hr>
          <p style="font-size: 12px; color: #666;">Para más guías como esta, visita <a href="https://yostreamer.com">yostreamer.com</a></p>
        `;
      } else {
        pdfPath = path.join(import.meta.dirname, '..', 'client', 'public', 'streaming-2mb-internet-checklist.pdf');
        subject = '🎁 Tu PDF: Guía Completa Streaming con 2MB Internet';
        emailContent = `
          <h2 style="color: #667eea;">¡Tu PDF está aquí!</h2>
          <p>Hola,</p>
          <p>Como prometimos, aquí tienes tu <strong>checklist completo</strong> para hacer streaming profesional con solo 2MB de internet.</p>
          <p>📎 <strong>Archivo adjunto:</strong> streaming-2mb-internet-checklist.pdf</p>
          <p>Este PDF incluye todas las configuraciones, trucos y optimizaciones que necesitas para convertir tu conexión lenta en una herramienta de streaming viable.</p>
          <p>Un saludo,<br><strong>Equipo Setups de Streamers</strong></p>
          <hr>
          <p style="font-size: 12px; color: #666;">Para más guías como esta, visita <a href="https://yostreamer.com">yostreamer.com</a></p>
        `;
      }
      
      // Check if PDF exists
      if (!fs.existsSync(pdfPath)) {
        return res.status(404).json({ error: 'PDF not found' });
      }
      
      // Read PDF file
      const pdfBuffer = await fs.promises.readFile(pdfPath);
      
      // Prepare email
      const emailData = {
        to: email,
        from: {
          email: 'hola@yostreamer.com',
          name: 'Setups de Streamers'
        },
        subject: subject,
        html: emailContent,
        attachments: [
          {
            content: pdfBuffer.toString('base64'),
            filename: path.basename(pdfPath),
            type: 'application/pdf',
            disposition: 'attachment'
          }
        ]
      };
      
      // Send email
      await mailService.send(emailData);
      
      console.log(`[EMAIL] PDF sent successfully to: ${email}`);
      res.json({ success: true, message: 'PDF enviado a tu email correctamente' });
      
    } catch (error) {
      console.error('[EMAIL] Error sending PDF:', error);
      res.status(500).json({ error: 'Error al enviar el PDF. Inténtalo de nuevo.' });
    }
  });

  // AI Lag Prediction API endpoints
  app.post('/api/analyze-lag-risk', async (req, res) => {
    try {
      const streamConfig: StreamConfig = req.body;
      
      // Validate required fields
      if (!streamConfig.resolution || !streamConfig.fps || !streamConfig.bitrate) {
        return res.status(400).json({ 
          error: 'Configuración incompleta. Resolución, FPS y bitrate son requeridos.' 
        });
      }

      const prediction = await lagPredictor.analyzeLagRisk(streamConfig);
      res.json(prediction);
      
    } catch (error) {
      console.error('Error analyzing lag risk:', error);
      res.status(500).json({ 
        error: 'Error al analizar el riesgo de lag. Inténtalo de nuevo.' 
      });
    }
  });

  app.post('/api/get-personalized-tips', async (req, res) => {
    try {
      const { streamConfig, userGoals } = req.body;
      
      if (!streamConfig) {
        return res.status(400).json({ 
          error: 'Configuración de stream requerida.' 
        });
      }

      const tips = await lagPredictor.generatePersonalizedTips(
        streamConfig, 
        userGoals || 'Mejorar calidad de stream sin lag'
      );
      
      res.json({ tips });
      
    } catch (error) {
      console.error('Error generating personalized tips:', error);
      res.status(500).json({ 
        error: 'Error al generar consejos personalizados.' 
      });
    }
  });

  app.post('/api/predict-optimal-settings', async (req, res) => {
    try {
      const streamConfig: StreamConfig = req.body;
      
      if (!streamConfig.cpuModel || !streamConfig.uploadSpeedMbps) {
        return res.status(400).json({ 
          error: 'Información de CPU y velocidad de internet requerida.' 
        });
      }

      const optimalSettings = await lagPredictor.predictOptimalSettings(streamConfig);
      res.json({ optimalSettings });
      
    } catch (error) {
      console.error('Error predicting optimal settings:', error);
      res.status(500).json({ 
        error: 'Error al predecir configuraciones óptimas.' 
      });
    }
  });

  // Serve static PDF files directly
  app.get('/obs-cpu-10-trucos.pdf', (req, res) => {
    const filePath = path.join(import.meta.dirname, '..', 'client', 'public', 'obs-cpu-10-trucos.pdf');
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="obs-cpu-10-trucos.pdf"');
    res.sendFile(filePath);
  });

  const httpServer = createServer(app);

  return httpServer;
}
