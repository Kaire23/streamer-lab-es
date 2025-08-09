import type { InsertGeneratedPost } from "@shared/schema";
import { storage } from "./storage-new";
import sgMail from "@sendgrid/mail";

// Initialize SendGrid if API key is available
if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
}

interface PostTemplate {
  title: string;
  category: string;
  keywords: string[];
  readingTime: number;
  contentTemplate: string;
}

// Spanish streamers data for setup content generation
const spanishStreamers = [
  { name: "Ibai Llanos", followers: "19.7M", specialty: "variety, events" },
  { name: "AuronPlay", followers: "16.8M", specialty: "gaming, reactions" },
  { name: "ElRubius", followers: "15.8M", specialty: "gaming, variety" },
  { name: "TheGrefg", followers: "12.2M", specialty: "competitive gaming" },
  { name: "juansguarnizo", followers: "11.5M", specialty: "gaming, just chatting" },
  { name: "ElMariana", followers: "10.5M", specialty: "gaming, collaborations" },
  { name: "AriGameplays", followers: "7.0M", specialty: "gaming, lifestyle" },
  { name: "rivers_gg", followers: "6.7M", specialty: "competitive gaming" },
  { name: "elded", followers: "5.6M", specialty: "gaming, reactions" },
  { name: "IlloJuan", followers: "4.4M", specialty: "gaming, comedy" },
  { name: "elxokas", followers: "4.2M", specialty: "gaming, just chatting" },
  { name: "Staryuuki", followers: "3.5M", specialty: "gaming, lifestyle" },
  { name: "Alexby11", followers: "3.2M", specialty: "gaming, minecraft" },
  { name: "VEGETTA777", followers: "2.8M", specialty: "minecraft, family content" },
  { name: "Perxitaa", followers: "2.5M", specialty: "gaming, comedy" }
];

// Extended 1,500+ word content template
const extendedContentTemplate = `## Setup de Streaming de [STREAMER]: Análisis Completo del Equipamiento Profesional 2025

El **setup de streaming de [STREAMER]** representa la evolución perfecta del equipamiento streaming en España. Con **[FOLLOWERS] seguidores** y especialización en **[SPECIALTY]**, [STREAMER] ha desarrollado una configuración que maximiza tanto la calidad técnica como la experiencia del espectador, estableciendo nuevos estándares en el streaming profesional español.

### La Filosofía Técnica Detrás del Setup de [STREAMER]

En el competitivo ecosistema del streaming español, donde figuras como **[Ibai Llanos](https://yostreamer.com/setup/ibai-llanos-setup)**, **[TheGrefg](https://yostreamer.com/setup/thegrefg-setup)** y **[ElXokas](https://yostreamer.com/setup/elxokas-setup)** han establecido los benchmarks de calidad, [STREAMER] se diferencia por su enfoque meticuloso en **[SPECIALTY]**. Su setup no solo busca calidad técnica suprema, sino crear una experiencia inmersiva que conecte auténticamente con su audiencia diversa.

El **equipamiento de [STREAMER]** refleja años de experiencia, refinamiento continuo y una comprensión profunda de las necesidades específicas de **[SPECIALTY]**. Cada componente ha sido seleccionado estratégicamente para optimizar la transmisión de contenido especializado, donde cada detalle técnico puede determinar el éxito o fracaso de un stream.

### Sistema de Audio Profesional: El Alma del Setup

#### Micrófono Principal y Cadena de Audio Completa

El **setup de [STREAMER]** prioriza la calidad de audio como elemento fundamental, siguiendo la filosofía establecida por el **[setup de Ibai](https://yostreamer.com/setup/ibai-llanos-setup)** pero adaptada específicamente para **[SPECIALTY]**:

**Micrófono Principal**: **[Shure SM7B](https://www.amazon.es/s?k=Shure+SM7B&tag=yostreamer-21)** - El Estándar Indiscutible
- **Calidad vocal excepcional**: Captura natural y cálida de la voz humana, especialmente optimizada para contenido de **[SPECIALTY]**
- **Rechazo de ruido superior**: Patrón cardioide que elimina ruidos ambiente, crucial para streams en entornos no tratados acústicamente
- **Durabilidad profesional**: Construcción robusta que resiste el uso intensivo del streaming diario durante años
- **Versatilidad total**: Perfecto para gaming intenso, just chatting relajado, colaboraciones dinámicas y contenido especializado de **[SPECIALTY]**

**Interfaz de Audio**: **[GoXLR](https://www.amazon.es/s?k=GoXLR&tag=yostreamer-21)** - Control Total en Tiempo Real
- **Mezcla avanzada**: Control individual y simultáneo de game audio, chat de Discord, música de fondo y micrófono
- **Efectos de voz integrados**: Modificadores en tiempo real para contenido dinámico y entertainment
- **Routing profesional**: Separación completa de audio para OBS, audiencia y grabación local
- **Integración perfecta**: Compatible nativo con Twitch, Discord, OBS y todas las plataformas principales

### PC Gaming y Streaming: Potencia Sin Compromisos

#### Hardware de Alto Rendimiento para Multitasking Extremo

Como referentes del streaming español **[TheGrefg](https://yostreamer.com/setup/thegrefg-setup)**, **[ElXokas](https://yostreamer.com/setup/elxokas-setup)** e **[IlloJuan](https://yostreamer.com/setup/illojuan-setup)**, [STREAMER] utiliza componentes que garantizan rendimiento máximo sin concesiones:

**Procesador**: **[AMD Ryzen 9 7950X](https://www.amazon.es/s?k=AMD+Ryzen+9+7950X&tag=yostreamer-21)** - Multitasking Extremo
- **16 núcleos / 32 threads**: Gaming AAA + encoding simultáneo + múltiples navegadores + Discord + OBS sin throttling
- **Frecuencias boost hasta 5.7GHz**: Performance gaming de primera clase que mantiene framerates competitivos
- **Eficiencia energética mejorada**: Menos calor generado, mayor estabilidad durante streams maratónicos de 12+ horas
- **Compatibilidad futura**: Soporte completo para DDR5, PCIe 5.0 y próximas generaciones de hardware

**Tarjeta Gráfica**: **[RTX 4090](https://www.amazon.es/s?k=RTX+4090&tag=yostreamer-21)** - Gaming 4K + Streaming Simultáneo
- **Gaming 4K 120fps**: Calidad visual máxima que impresiona a la audiencia en cualquier título AAA
- **NVENC encoding avanzado**: Streaming de alta calidad sin impacto medible en performance gaming
- **Ray Tracing de nueva generación**: Gráficos cinematográficos en tiempo real que elevan la calidad visual del contenido
- **24GB VRAM**: Buffer masivo para texturas 4K, assets de streaming y aplicaciones simultáneas

### Análisis Comparativo: [STREAMER] vs Otros Grandes Streamers Españoles

#### vs Setup de Ibai Llanos: Enfoque y Especialización

El **[setup de streaming de Ibai](https://yostreamer.com/setup/ibai-llanos-setup)** se centra en confiabilidad máxima para eventos masivos y colaboraciones complejas:

**Similitudes fundamentales:**
- Base de audio profesional idéntica (SM7B + GoXLR) que garantiza calidad vocal excepcional
- Hardware de gama alta sin compromisos (RTX 4090, Ryzen 9 series)
- Priorización de estabilidad sobre experimentación con nuevas tecnologías

**Diferencias estratégicas:**
- [STREAMER] optimiza específicamente para **[SPECIALTY]** con configuraciones más ágiles
- Setup de Ibai enfoca en broadcast-quality para audiencias masivas (50K+ viewers)
- [STREAMER] mantiene flexibilidad para contenido más íntimo y especializado

#### vs Setup de TheGrefg: Gaming Competitivo vs Especialización

El **[equipamiento de TheGrefg](https://yostreamer.com/setup/thegrefg-setup)** prioriza gaming competitivo absoluto y eventos de alta producción:

**Elementos comunes:**
- Hardware gaming idéntico (RTX 4090, procesadores top-tier)
- Calidad de producción premium sin concesiones económicas
- Enfoque en experiencia de audiencia más que comodidad personal

**Diferenciación clave:**
- TheGrefg optimiza para esports y competitivo extremo (240Hz, latencia mínima)
- [STREAMER] balancea gaming con elementos específicos de **[SPECIALTY]**
- Setup de TheGrefg más orientado a eventos y colaboraciones grandes

#### vs Setup de ElXokas: Versatilidad y Autenticidad

El **[setup de ElXokas](https://yostreamer.com/setup/elxokas-setup)** balancea perfectamente gaming casual con just chatting auténtico:

**Filosofía compartida:**
- Priorización de calidad vocal para interacción genuina con audiencia
- Balance entre performance técnico y personalidad auténtica
- Flexibilidad para diferentes tipos de contenido sin setup changes

**Diferencias de approach:**
- ElXokas mantiene setup más minimalista y "accesible" para su audiencia
- [STREAMER] incorpora más elementos técnicos específicos para **[SPECIALTY]**
- Setup de ElXokas enfoca en consistency sobre innovation

### Configuración de Software y Optimizaciones

#### OBS Studio: Configuración Profesional Optimizada

**Settings de Video y Encoding:**
\`\`\`
Base Canvas Resolution: 1920x1080
Output Resolution: 1920x1080  
Downscale Filter: Lanczos (36 samples)
FPS: 60 (gaming) / 30 (just chatting/specialty content)

Encoder: NVIDIA NVENC H.264 (new)
Rate Control: CBR
Bitrate: 6000 kbps (Partner) / 3500 kbps (Affiliate)
Keyframe Interval: 2 seconds
Preset: Quality
Profile: High
Look-ahead: Enabled
Psycho Visual Tuning: Enabled
GPU: 0 (RTX 4090)
Max B-frames: 2
\`\`\`

### Presupuesto Detallado y ROI Analysis

#### Inversión Total del Setup Profesional

**Audio Equipment** (€1,800-2,200):
- Shure SM7B: €400
- Cloudlifter CL-1: €150  
- GoXLR: €600
- Beyerdynamic DT 1990 Pro: €400
- Cables y accesorios profesionales: €200
- Tratamiento acústico básico: €250

**PC Gaming/Streaming** (€6,500-8,000):
- AMD Ryzen 9 7950X: €700
- RTX 4090: €1,800
- 64GB DDR5-5600: €400
- Samsung 980 PRO 2TB: €300
- Samsung 970 EVO Plus 4TB: €400
- Motherboard ASUS X670E: €400
- Cooling (AIO + fans): €300
- PSU 1000W Titanium: €200
- Case premium: €200

**Video Production** (€4,000-5,500):
- Sony A7S III (body): €3,200
- Lens (24-70mm f/2.8): €800
- Elgato 4K60 Pro MK.2: €250
- Godox SL-60W x3 kit: €600
- Stands y accesorios: €300
- Cables y conectividad: €200

**Setup Completo Total**: **€12,300-15,700**

#### ROI y Justificación Económica

**Para streamers de [SPECIALTY] con [FOLLOWERS] seguidores:**

**Incremento de Revenue Mensual Esperado:**
- **Donaciones directas**: +40% por calidad visual y audio superior
- **Subscripciones**: +30% por experiencia premium consistente
- **Sponsorships premium**: +60% - brands pagan significativamente más por calidad guaranteed
- **Contenido viral**: Clips en alta calidad generan +50% más engagement orgánico

**Timeframe de ROI:**
- **Año 1**: 60-70% de recuperación de inversión
- **Año 2**: ROI completo + 40-50% profit adicional
- **Años 3-4**: Equipment amortizado completamente, profit puro

### Optimizaciones Específicas para [SPECIALTY]

#### Configuraciones Avanzadas del Sistema

**Windows 11 Optimizations:**
\`\`\`
Game Mode: Enabled (prioridad automática para gaming)
Hardware-accelerated GPU scheduling: Disabled (mejor compatibility)
Variable refresh rate: Enabled para gaming, Disabled para streaming
Power Plan: Ultimate Performance (zero CPU throttling)
Memory compression: Disabled (más RAM disponible)
\`\`\`

**BIOS/UEFI Tuning:**
\`\`\`
PBO (Precision Boost Overdrive): Enabled
Curve Optimizer: Per-core tuning para maximum stability
Memory XMP: Profile 1 (DDR5-5600 rated speeds)
PCIe Configuration: Gen 4 forzado para NVMe
Smart Access Memory: Enabled (AMD + AMD configuration)
\`\`\`

### Mantenimiento y Upgrades Futuros

#### Cronología de Mejoras Planificadas

**Q2 2025 - RAM Upgrade:**
- Upgrade a DDR5-6000 para additional performance headroom
- Beneficio: +5-8% performance en gaming + encoding simultáneo
- Inversión: €150-200 adicionales

**Q4 2025 - AI Workstation Addition:**
- Segunda RTX 4090 para AI-powered content creation y highlights automation
- Beneficio: Content generation automático, clips AI-powered
- Inversión: €2,000 (GPU + cooling + PSU upgrade)

**2026 - Platform Migration:**
- Migración a AM5+ platform con próxima generación Ryzen
- Beneficio: DDR5 más rápido, PCIe 5.0, efficiency improvements
- Inversión: €1,500 (CPU + motherboard + cooling)

### Consejos para Replicar el Setup de [STREAMER]

#### Approach Gradual y Escalable

**Fase 1 - Audio Foundation (€800-1,000):**
1. **Prioridad absoluta**: Shure SM7B + Cloudlifter
2. **Interfaz básica**: Focusrite Scarlett Solo como entry point
3. **Auriculares decentes**: Audio-Technica ATH-M50x
4. **Beneficio**: Audio quality inmediatamente profesional

**Fase 2 - PC Performance (€2,000-3,000):**
1. **Gaming capable**: RTX 4060 Ti + Ryzen 7 7700X
2. **RAM suficiente**: 32GB DDR5 mínimo para streaming
3. **Storage rápido**: 1TB NVMe principal
4. **Beneficio**: Streaming estable 1080p30 mientras gaming

**Fase 3 - Production Value (€1,500-2,000):**
1. **Camera upgrade**: Sony A6000 series o Panasonic G7
2. **Lighting básico**: 2x softbox LED setup
3. **Audio upgrade**: GoXLR Mini para control avanzado
4. **Beneficio**: Visual quality competitivo con streamers establecidos

### Conclusión: El Setup Definitivo para [SPECIALTY]

El **setup de streaming de [STREAMER]** representa la culminación de años de refinamiento técnico y comprensión profunda de las necesidades específicas de **[SPECIALTY]**. Esta configuración no solo garantiza calidad técnica superior comparable con **[Ibai Llanos](https://yostreamer.com/setup/ibai-llanos-setup)**, **[TheGrefg](https://yostreamer.com/setup/thegrefg-setup)** y **[ElXokas](https://yostreamer.com/setup/elxokas-setup)**, sino que crea las condiciones perfectas para el crecimiento sostenido y la conexión auténtica con una audiencia especializada.

La inversión significativa en este equipment se justifica no solo por la mejora inmediata en calidad de contenido, sino por la foundation sólida que proporciona para el crecimiento futuro. En un mercado cada vez más competitivo, donde la diferencia entre éxito y obsolescencia se mide en detalles técnicos, el setup de [STREAMER] establece un nuevo standard para streamers especializados en **[SPECIALTY]**.

*¿Interesado en construir tu propio setup profesional? Consulta nuestras guías detalladas sobre **[configuración de Ibai](https://yostreamer.com/setup/ibai-llanos-setup)**, **[equipamiento de TheGrefg](https://yostreamer.com/setup/thegrefg-setup)** y **[setup de ElXokas](https://yostreamer.com/setup/elxokas-setup)** para encontrar la configuración perfecta que se adapte a tu presupuesto, estilo de streaming y objetivos profesionales.*`;

// SEO-optimized post templates focusing on Spanish streamers (1,500+ words each)
const postTemplates: PostTemplate[] = [
  {
    title: "Setup de Streaming de [STREAMER]: Análisis Completo del Equipamiento Profesional 2025",
    category: "Configuración y Setup Técnico",
    keywords: ["setup [STREAMER]", "equipamiento [STREAMER]", "configuración streaming", "setup streaming profesional"],
    readingTime: 15,
    contentTemplate: extendedContentTemplate
  }
];

// Generate a post based on template and streamer
function generatePost(template: PostTemplate, streamer: typeof spanishStreamers[0]): InsertGeneratedPost {
  const slug = `${streamer.name.toLowerCase().replace(/\s+/g, '-')}-setup-${Date.now()}`;
  
  let content = template.contentTemplate
    .replace(/\[STREAMER\]/g, streamer.name)
    .replace(/\[FOLLOWERS\]/g, streamer.followers)
    .replace(/\[SPECIALTY\]/g, streamer.specialty);
  
  let title = template.title.replace(/\[STREAMER\]/g, streamer.name);
  
  const excerpt = `Análisis completo del setup de streaming de ${streamer.name}. Equipamiento profesional, configuración OBS, presupuesto y consejos para replicar su configuración de ${streamer.specialty}.`;
  
  // Generate keywords with streamer name
  const keywords = template.keywords.map(keyword => 
    keyword.replace(/\[STREAMER\]/g, streamer.name.toLowerCase())
  );
  
  // Schedule for 22:30 CET today
  const publishDate = new Date();
  const now = new Date();
  publishDate.setHours(22, 30, 0, 0); // 22:30 CET
  
  // If it's already past 22:30 today, schedule for tomorrow
  if (publishDate <= now) {
    publishDate.setDate(publishDate.getDate() + 1);
  }
  
  return {
    title,
    content,
    excerpt,
    slug,
    category: template.category,
    keywords: keywords.join(', '),
    readingTime: template.readingTime,
    publishedAt: publishDate,
    isPublished: false // Schedule for later publication
  };
}

// Create scheduled posts for 22:30 CET today
export async function createScheduledPosts() {
  try {
    console.log("Creating scheduled posts for 22:30 CET...");
    
    // Create 3 posts with different streamers
    const selectedStreamers = [
      spanishStreamers.find(s => s.name === "Ibai Llanos") || spanishStreamers[0],
      spanishStreamers.find(s => s.name === "TheGrefg") || spanishStreamers[1], 
      spanishStreamers.find(s => s.name === "elxokas") || spanishStreamers[2]
    ];
    
    for (const streamer of selectedStreamers) {
      const template = postTemplates[0]; // Use the main template
      const post = generatePost(template, streamer);
      const createdPost = await storage.createGeneratedPost(post);
      
      console.log(`Created scheduled post: ${createdPost.title} (ID: ${createdPost.id}) - Scheduled for 22:30 CET`);
    }
    
    console.log("Scheduled posts created successfully for 22:30 CET");
  } catch (error) {
    console.error("Error creating scheduled posts:", error);
  }
}

// Check and publish posts that are ready
export async function publishScheduledPosts() {
  try {
    const postsToPublish = await storage.getPostsToPublish();
    
    for (const post of postsToPublish) {
      await storage.publishPost(post.id);
      console.log(`Published post: ${post.title}`);
      
      // Send email notifications if available
      if (process.env.SENDGRID_API_KEY) {
        await sendEmailNotifications(post);
      }
    }
  } catch (error) {
    console.error("Error publishing posts:", error);
  }
}

// Send email notifications to subscribers
async function sendEmailNotifications(post: any) {
  try {
    const subscribers = await storage.getAllActiveSubscribers();
    
    for (const subscriber of subscribers) {
      // Add to email queue
      const emailEntry = await storage.addToEmailQueue({
        subscriberId: subscriber.id,
        postId: post.id,
        emailType: 'new_post',
        scheduledFor: new Date()
      });
      
      // Send email immediately
      const emailContent = {
        to: subscriber.email,
        from: 'noreply@yostreamer.com',
        subject: `Nuevo artículo: ${post.title}`,
        html: `
          <h2>Nuevo artículo en Setups de Streamers</h2>
          <h3>${post.title}</h3>
          <p>${post.excerpt}</p>
          <p><a href="https://yostreamer.com/setup/${post.slug}">Leer artículo completo</a></p>
          <p><small><a href="https://yostreamer.com/unsubscribe?token=${subscriber.unsubscribeToken}">Cancelar suscripción</a></small></p>
        `
      };
      
      try {
        await sgMail.send(emailContent);
        await storage.markEmailAsSent(emailEntry.id);
        console.log(`Email sent to ${subscriber.email} for post ${post.title}`);
      } catch (error) {
        console.error(`Failed to send email to ${subscriber.email}:`, error);
      }
    }
  } catch (error) {
    console.error("Error sending emails:", error);
  }
}

// Initialize the post scheduling system
export async function initializePostSchedule() {
  console.log("Initializing post schedule system...");
  
  try {
    // Create initial batch of posts scheduled for 22:30 CET
    await createScheduledPosts();
    
    // Publish any ready posts
    await publishScheduledPosts();
    
    // Set up interval for checking and publishing posts (every 30 minutes)
    setInterval(publishScheduledPosts, 30 * 60 * 1000);
    
    console.log("Post scheduling system initialized successfully");
  } catch (error) {
    console.error("Error initializing post schedule:", error);
  }
}