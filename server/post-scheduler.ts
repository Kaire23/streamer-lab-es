import { storage } from "./storage-new";
import { nanoid } from "nanoid";
import sgMail from "@sendgrid/mail";

// Initialize SendGrid if API key is available
if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
}

interface PostTemplate {
  title: string;
  category: string;
  keywords: string[];
  priority: "high" | "medium" | "low";
  readingTime: number;
  contentTemplate: string;
}

// SEO-optimized post templates based on commercial intent keywords
const postTemplates: PostTemplate[] = [
  {
    title: "Mejor Webcam para Streaming 2025: Guía Completa de Compra",
    category: "Hardware y Equipamiento", 
    keywords: ["mejor webcam streaming", "webcam Twitch", "cámara streaming 2025", "webcam gaming"],
    priority: "high",
    readingTime: 8,
    contentTemplate: `## Las Mejores Webcams para Streaming en 2025

Una **webcam para streaming** de calidad es esencial para crear contenido profesional. Los streamers más exitosos como **Ibai Llanos** y **TheGrefg** utilizan cámaras que van más allá de las webcams tradicionales, pero existen opciones excelentes para todos los presupuestos.

### Top 5 Mejores Webcams para Streaming

#### 1. Logitech C920s Pro HD - El Estándar de la Industria
La **[Logitech C920s Pro HD](https://www.amazon.es/s?k=Logitech+C920s+Pro+HD&tag=yostreamer-21)** sigue siendo la referencia en webcams para streaming:
- **Resolución 1080p 30fps**: Calidad sharp para streaming
- **Autofoco automático**: Siempre enfocado perfectamente  
- **Micrófono dual integrado**: Audio backup decente
- **Precio**: ~80€ - Excelente relación calidad-precio

#### 2. Logitech StreamCam - Para Creadores de Contenido
La **[Logitech StreamCam](https://www.amazon.es/s?k=Logitech+StreamCam&tag=yostreamer-21)** está diseñada específicamente para streaming:
- **1080p 60fps**: Fluidez superior en movimientos
- **Conexión USB-C**: Futuro-proof connectivity
- **Vertical y horizontal**: Versatilidad para diferentes plataformas
- **Software Logitech Capture**: Control avanzado de la imagen

### Comparación por Tipo de Contenido

#### Gaming Streamers
Para contenido gaming como **ElXokas**:
- **Prioridad en framerate**: 60fps para gaming fluido
- **Autofoco rápido**: Para movimientos durante gaming
- **Low light performance**: Gaming nocturno
- **Campo de visión**: No demasiado amplio para focus en streamer

**Recomendadas**: Logitech StreamCam, Razer Kiyo Pro

#### Just Chatting y Contenido Variado  
Para streams como **IlloJuan**:
- **Calidad de imagen**: Colores naturales y skin tones
- **Estabilidad**: Imagen consistente en sesiones largas
- **Audio integrado**: Backup microphone useful
- **Ease of use**: Plug and play simplicity

**Recomendadas**: Logitech C920s Pro, Elgato Facecam

### Configuración y Optimización

#### Software Configuration
- **OBS Settings**: 1080p, bitrate óptimo para webcam
- **Iluminación**: Key light evita grain en low light
- **Posicionamiento**: Eye level para ángulo natural
- **Background**: Clean o virtual background según content

#### Upgrade Path hacia Cámaras DSLR
Muchos streamers eventualmente migran a cámaras mirrorless:
- **Sony A6400**: Popular choice entre streamers
- **Canon M50**: Excellent autofocus para streaming
- **Capturadora necesaria**: **[Elgato Cam Link 4K](https://www.amazon.es/s?k=Elgato+Cam+Link+4K&tag=yostreamer-21)**

### Presupuestos y Recomendaciones

#### Setup Básico (~100€)
- **Webcam**: Logitech C920s Pro (~80€)
- **Iluminación básica**: **[Ring light USB](https://www.amazon.es/s?k=ring+light+USB&tag=yostreamer-21)** (~20€)

#### Setup Intermedio (~200€)  
- **Webcam**: Logitech StreamCam (~150€)
- **Iluminación**: **[Panel LED adjustable](https://www.amazon.es/s?k=panel+LED+streaming&tag=yostreamer-21)** (~50€)

#### Setup Avanzado (~500€+)
- **Cámara mirrorless**: Sony A6400 (~600€)
- **Capturadora**: Elgato Cam Link 4K (~130€)  
- **Iluminación profesional**: **[Elgato Key Light](https://www.amazon.es/s?k=Elgato+Key+Light&tag=yostreamer-21)** (~200€)

### Errores Comunes al Elegir Webcam

1. **Ignorar la iluminación**: La mejor webcam falla con mala luz
2. **Solo mirar resolución**: Framerate y low light importan más
3. **No considerar el upgrade path**: Mejor invertir gradualmente
4. **Olvidar el audio**: Webcam mic como backup, no primary
5. **Positioning incorrecto**: Eye level crucial para connection

### Conclusión

La **mejor webcam para streaming** equilibra calidad, precio y facilidad de uso. Para la mayoría, la **[Logitech C920s Pro](https://www.amazon.es/s?k=Logitech+C920s+Pro+HD&tag=yostreamer-21)** ofrece excellent value, mientras que la **[StreamCam](https://www.amazon.es/s?k=Logitech+StreamCam&tag=yostreamer-21)** es ideal para 60fps content.

*¿Listo para mejorar tu video quality? Consulta nuestras guías sobre **iluminación para streaming** y **configuración OBS** para completar tu setup.*`
  },
  
  {
    title: "Setup de Streaming Barato 2025: Guía Completa Menos de 500€",
    category: "Guías y Tutoriales",
    keywords: ["setup streaming barato", "streaming económico", "equipo streaming bajo presupuesto", "como empezar streaming"],
    priority: "high", 
    readingTime: 10,
    contentTemplate: `## Cómo Crear un Setup de Streaming Barato en 2025

Crear un **setup de streaming barato** no significa sacrificar calidad. Muchos streamers exitosos empezaron con equipamiento básico y fueron upgradeando gradualmente. Esta guía te mostrará cómo empezar con menos de 500€.

### Filosofía del Setup Económico

Antes de comprar nada, entiende estos principios:
1. **Audio primero**: Un micrófono decente supera una cámara cara
2. **Iluminación sobre resolución**: Buena luz mejora cualquier cámara  
3. **Upgrade gradual**: Mejor empezar simple y mejorar con tiempo
4. **Consistencia sobre perfección**: Regular content > perfect setup

### Build Completo: Setup de Streaming por 500€

#### Micrófono: Audio-Technica ATR2100x-USB (~150€)
El **[Audio-Technica ATR2100x-USB](https://www.amazon.es/s?k=Audio-Technica+ATR2100x-USB&tag=yostreamer-21)** ofrece versatilidad única:
- **XLR + USB**: Conexión directa ahora, upgrade a interfaz después
- **Micrófono dinámico**: Rechaza ruido de fondo natural
- **Calidad broadcast**: Comparable a mics 3x más caros
- **Robusto**: Construcción que dura años

#### Webcam: Logitech C920s Pro (~80€)
La **[Logitech C920s Pro](https://www.amazon.es/s?k=Logitech+C920s+Pro+HD&tag=yostreamer-21)** sigue siendo el sweet spot:
- **1080p confiable**: Calidad consistente
- **Autofoco automático**: Una cosa menos de la que preocuparse
- **Soporte universal**: Compatible con todo software de streaming
- **Usado por pros**: Muchos streamers establecidos aún la usan

#### Iluminación: Neewer Ring Light (~40€)
La **[Neewer Ring Light 18"](https://www.amazon.es/s?k=Neewer+Ring+Light+18&tag=yostreamer-21)** transforma cualquier webcam:
- **Luz uniforme**: Elimina sombras en la cara
- **Ajustable**: Temperatura de color y brightness
- **Soporte para phone**: Versatilidad extra
- **Plug and play**: Setup en minutos

#### PC Gaming: Build Presupuesto (~1200€)
Para streaming necesitas balance entre gaming y encoding:

**CPU**: **[AMD Ryzen 5 5600](https://www.amazon.es/s?k=AMD+Ryzen+5+5600&tag=yostreamer-21)** (~150€)
- 6 cores suficientes para gaming + streaming simultáneo
- Excellent single-core para gaming performance
- Upgrade path a más cores si necesario

**GPU**: **[RTX 3060](https://www.amazon.es/s?k=RTX+3060&tag=yostreamer-21)** (~300€)  
- NVENC encoding preserve CPU para gaming
- 1080p gaming en high settings mayoría de juegos
- DLSS para extra performance cuando available

**RAM**: **[16GB DDR4-3200](https://www.amazon.es/s?k=16GB+DDR4-3200+gaming&tag=yostreamer-21)** (~60€)
- Suficiente para gaming + streaming + browser tabs
- Upgrade fácil a 32GB cuando budget permite

#### Periféricos Económicos (~100€)
- **Teclado**: **[Redragon K552](https://www.amazon.es/s?k=Redragon+K552&tag=yostreamer-21)** (~40€) - Mecánico barato
- **Mouse**: **[Logitech G203](https://www.amazon.es/s?k=Logitech+G203&tag=yostreamer-21)** (~25€) - Sensor reliable  
- **Auriculares**: **[HyperX Cloud Stinger](https://www.amazon.es/s?k=HyperX+Cloud+Stinger&tag=yostreamer-21)** (~35€) - Gaming básico

### Software Gratuito para Empezar

#### OBS Studio: Tu Mejor Amigo
**[OBS Studio](https://obsproject.com/)** es completamente gratis y profesional:
- **Configuración básica**: 1080p 30fps, bitrate 3500 para empezar
- **Escenas simples**: Gaming + webcam overlay
- **Filtros de audio**: Noise suppression, compressor basic
- **Hotkeys**: Scene switching durante gaming

#### Configuración OBS Económica

**Video Settings:**
- Output Resolution: 1920x1080
- Downscale Filter: Lanczos
- FPS: 30 (más estable que 60 con hardware limitado)

**Encoder Settings:**
- Encoder: NVENC H.264 (si tienes RTX)
- Rate Control: CBR
- Bitrate: 3500 kbps (Twitch affiliate)
- Keyframe: 2 seconds

### Maximizando el Hardware Limitado

#### Optimización Windows para Streaming
1. **Game Mode**: Activated en Settings > Gaming
2. **Power Plan**: High Performance mode
3. **Background Apps**: Disable unnecessary apps
4. **Windows Updates**: Set active hours para avoid interruptions

#### Smart Gaming Choices
- **Settings balanceados**: Medium-High en lugar de Ultra
- **DLSS/FSR**: Free performance cuando available  
- **Monitor resolution**: 1080p gaming, 1080p streaming
- **Game capture**: Más eficiente que display capture

### Upgrade Path Inteligente

#### Primera Upgrade (6 meses): Micrófono Setup (~100€)
- **Brazo articulado**: **[InnoGear Microphone Arm](https://www.amazon.es/s?k=InnoGear+Microphone+Arm&tag=yostreamer-21)** (~25€)
- **Pop filter**: **[Aokeo Professional](https://www.amazon.es/s?k=Aokeo+Professional+pop+filter&tag=yostreamer-21)** (~15€)
- **Foam windscreen**: Better audio quality (~10€)

#### Segunda Upgrade (1 año): Iluminación (~150€)
- **Key light**: **[Elgato Key Light Air](https://www.amazon.es/s?k=Elgato+Key+Light+Air&tag=yostreamer-21)** (~130€)
- **Background lighting**: **[Govee Immersion](https://www.amazon.es/s?k=Govee+Immersion&tag=yostreamer-21)** (~50€)

#### Tercera Upgrade (18 meses): Audio Interface (~200€)
- **Interface**: **[Focusrite Scarlett Solo](https://www.amazon.es/s?k=Focusrite+Scarlett+Solo&tag=yostreamer-21)** (~120€)
- **XLR Cable**: **[Cable XLR profesional](https://www.amazon.es/s?k=cable+XLR+profesional&tag=yostreamer-21)** (~20€)
- **Monitor headphones**: **[Audio-Technica ATH-M40x](https://www.amazon.es/s?k=Audio-Technica+ATH-M40x&tag=yostreamer-21)** (~100€)

### Errores Costosos a Evitar

1. **Comprar todo a la vez**: Mejor gradual upgrade based on needs
2. **Seguir trends**: RGB y aesthetics no mejoran content quality  
3. **Ignorar acoustics**: Room treatment más importante que expensive mic
4. **Overcomplicate setup**: Simple setups son más reliable
5. **No considerar used market**: Graphics cards y monitors good used

### Monetización Temprana

#### Affiliate Marketing desde Día 1
- **Amazon Associates**: Recomienda tu equipment usado
- **Disclosure transparente**: "Links de afiliado" en description
- **Honest reviews**: Long-term trust > short-term sales

#### Twitch Affiliate Requirements
- **50 followers**: Achievable en primeros 2-3 meses
- **Average 3 viewers**: Consistency más importante que peak numbers
- **500 minutos streamed**: ~8 horas weekly por 2 meses
- **7 unique broadcast days**: Regular schedule crucial

### Conclusión: La Mentalidad Correcta

Un **setup de streaming barato** exitoso viene de entender que content quality supera equipment quality. Streamers como **ElXokas** e **IlloJuan** built audiences con equipment basic, upgradeando según growth.

**Key Takeaways**:
- Empieza con audio solid y video decent
- Consistency en streaming schedule > perfect equipment
- Upgrade gradual based on actual needs, no wants
- Learn equipment antes de buying expensive gear
- Community building más importante que tech specs

**Budget Total**: ~470€ para complete starter setup
- Audio: ATR2100x-USB (150€)
- Video: Logitech C920s Pro (80€)  
- Lighting: Neewer Ring Light (40€)
- Peripherals: Keyboard + mouse + headphones (100€)
- Accessories: Boom arm, pop filter, cables (50€)
- PC: Separate budget, pero build económico possible

*¿Listo para empezar tu streaming journey? Consulta nuestras guías sobre **configuración OBS** y **cómo conseguir tus primeros seguidores** para maximizar tu nuevo setup.*`
  }
];

// Generate content for a new post
export function generatePostContent(template: PostTemplate): string {
  const today = new Date().toISOString().split('T')[0];
  const currentYear = new Date().getFullYear();
  
  // Replace template variables
  let content = template.contentTemplate;
  content = content.replace(/2025/g, currentYear.toString());
  content = content.replace(/\[CURRENT_DATE\]/g, today);
  
  return content;
}

// Schedule new post creation
export async function createScheduledPost() {
  try {
    // Get next template to use (rotate through available templates)
    const templateIndex = Math.floor(Math.random() * postTemplates.length);
    const template = postTemplates[templateIndex];
    
    // Calculate next publish date (3 days from now at 8am Spanish time)
    const publishDate = new Date();
    publishDate.setDate(publishDate.getDate() + 3);
    publishDate.setHours(8, 0, 0, 0); // 8am Spanish time
    
    // Generate unique slug
    const baseSlug = template.title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
    
    const slug = `${baseSlug}-${Date.now()}`;
    
    // Generate content
    const content = generatePostContent(template);
    
    // Create post in database
    const post = await storage.createGeneratedPost({
      slug,
      title: template.title,
      excerpt: content.substring(0, 200) + "...",
      content,
      coverImage: "/api/placeholder/600/400",
      keywords: template.keywords,
      category: template.category,
      author: "Equipo Setups de Streamers",
      publishedAt: publishDate,
      isPublished: false,
      readingTime: template.readingTime,
      priority: template.priority
    });
    
    console.log(`Scheduled new post: ${template.title} for ${publishDate.toISOString()}`);
    return post;
  } catch (error) {
    console.error("Error creating scheduled post:", error);
    throw error;
  }
}

// Check for posts to publish and send emails
export async function processPostPublishing() {
  try {
    const postsToPublish = await storage.getPostsToPublish();
    
    for (const post of postsToPublish) {
      // Publish the post
      await storage.publishPost(post.id);
      
      // Get all active subscribers
      const subscribers = await storage.getAllActiveSubscribers();
      
      // Queue email notifications
      for (const subscriber of subscribers) {
        await storage.addToEmailQueue({
          subscriberId: subscriber.id,
          postId: post.id,
          sentAt: null
        });
      }
      
      console.log(`Published post: ${post.title} and queued ${subscribers.length} email notifications`);
    }
    
    // Process email queue
    await sendPendingEmails();
    
  } catch (error) {
    console.error("Error processing post publishing:", error);
  }
}

// Send pending email notifications
export async function sendPendingEmails() {
  if (!process.env.SENDGRID_API_KEY) {
    console.log("SendGrid not configured, skipping email sending");
    return;
  }

  try {
    const pendingEmails = await storage.getPendingEmails();
    
    for (const emailEntry of pendingEmails) {
      // This would need proper joins - simplified for now
      // In a real implementation, you'd fetch the subscriber and post details
      
      const msg = {
        to: 'subscriber@email.com', // Would come from joined subscriber data
        from: 'noreply@yostreamer.com',
        subject: 'Nuevo artículo en Setups de Streamers',
        html: `
          <h2>¡Nuevo artículo publicado!</h2>
          <p>Hemos publicado un nuevo artículo que te puede interesar.</p>
          <p><a href="https://yostreamer.com/article/${emailEntry.postId}">Leer artículo</a></p>
          <br/>
          <p>Si deseas cancelar tu suscripción, <a href="https://yostreamer.com/unsubscribe">haz clic aquí</a>.</p>
        `,
      };
      
      try {
        await sgMail.send(msg);
        await storage.markEmailAsSent(emailEntry.id);
        console.log(`Sent email notification for post ${emailEntry.postId}`);
      } catch (emailError) {
        console.error(`Error sending email for post ${emailEntry.postId}:`, emailError);
      }
    }
  } catch (error) {
    console.error("Error sending pending emails:", error);
  }
}

// Initialize first post schedule (call this once when starting the system)
export async function initializePostSchedule() {
  try {
    // Create first post scheduled for 2 hours from now
    const firstPost = await createFirstScheduledPost();
    console.log("Initialized post schedule with first post");
    return firstPost;
  } catch (error) {
    console.error("Error initializing post schedule:", error);
  }
}

async function createFirstScheduledPost() {
  const template = postTemplates[0]; // Use first template for initial post
  
  // Schedule for 2 hours from now
  const publishDate = new Date();
  publishDate.setHours(publishDate.getHours() + 2);
  
  const slug = `${template.title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')}-${Date.now()}`;
  
  const content = generatePostContent(template);
  
  return await storage.createGeneratedPost({
    slug,
    title: template.title,
    excerpt: content.substring(0, 200) + "...",
    content,
    coverImage: "/api/placeholder/600/400",
    keywords: template.keywords,
    category: template.category,
    author: "Equipo Setups de Streamers",
    publishedAt: publishDate,
    isPublished: false,
    readingTime: template.readingTime,
    priority: template.priority
  });
}