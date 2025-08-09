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

// SEO-optimized post templates focusing on Spanish streamers (500+ words each)
const postTemplates: PostTemplate[] = [
  {
    title: "Setup de Streaming de [STREAMER]: Análisis Completo del Equipamiento Profesional 2025",
    category: "Configuración y Setup Técnico",
    keywords: ["setup [STREAMER]", "equipamiento [STREAMER]", "configuración streaming", "setup streaming profesional"],
    readingTime: 12,
    contentTemplate: `## Setup de Streaming de [STREAMER]: Análisis Completo del Equipamiento Profesional 2025

El **setup de streaming de [STREAMER]** representa la evolución perfecta del equipamiento streaming en España. Con **[FOLLOWERS] seguidores** y especialización en **[SPECIALTY]**, [STREAMER] ha desarrollado una configuración que maximiza tanto la calidad técnica como la experiencia del espectador.

### ¿Por Qué el Setup de [STREAMER] Es Único?

En el competitivo mundo del streaming español, donde figuras como **[Ibai Llanos](https://yostreamer.com/setup/ibai-llanos-setup)**, **[TheGrefg](https://yostreamer.com/setup/thegrefg-setup)** y **[ElXokas](https://yostreamer.com/setup/elxokas-setup)** han establecido los estándares, [STREAMER] se diferencia por su enfoque específico en **[SPECIALTY]**. Su setup no solo busca calidad técnica, sino crear una experiencia inmersiva que conecte auténticamente con su audiencia.

El **equipamiento de [STREAMER]** refleja años de experiencia y refinamiento. Cada componente ha sido seleccionado estratégicamente para optimizar la transmisión de contenido de **[SPECIALTY]**, donde cada detalle técnico puede determinar el éxito o fracaso de un stream.

### Hardware de Audio: El Corazón del Setup de [STREAMER]

#### Micrófono Profesional y Sistema de Audio
El **setup de [STREAMER]** prioriza la calidad de audio como elemento fundamental. Siguiendo la tendencia establecida por el **[setup de Ibai](https://yostreamer.com/setup/ibai-llanos-setup)** y otros grandes streamers españoles:

**Micrófono Principal**: **[Shure SM7B](https://www.amazon.es/s?k=Shure+SM7B&tag=yostreamer-21)** - El estándar indiscutible
- **Calidad vocal excepcional**: Captura natural y cálida de la voz
- **Rechazo de ruido superior**: Ideal para entornos no tratados acústicamente  
- **Durabilidad profesional**: Resistente al uso intensivo del streaming diario
- **Versatilidad total**: Perfecto para gaming, just chatting y colaboraciones

**Interfaz de Audio**: **[GoXLR](https://www.amazon.es/s?k=GoXLR&tag=yostreamer-21)** - Control Total de Audio
- **Mezcla en tiempo real**: Control individual de game, chat, música y micrófono
- **Efectos de voz integrados**: Modificadores en vivo para contenido dinámico
- **Routing avanzado**: Separación de audio para OBS y audiencia
- **Integración perfecta**: Compatible con Twitch, Discord y plataformas principales

**Auriculares de Monitoreo**: **[Beyerdynamic DT 770 Pro](https://www.amazon.es/s?k=Beyerdynamic+DT+770+Pro&tag=yostreamer-21)**
- **Referencia neutral**: Monitoreo preciso sin coloración
- **Comodidad extrema**: Sesiones de streaming de 8+ horas
- **Aislamiento acústico**: Focus total durante streams intensos

### PC Gaming y Streaming: Potencia Sin Compromisos

#### Hardware de Alto Rendimiento
Como referentes del streaming español **[TheGrefg](https://yostreamer.com/setup/thegrefg-setup)**, **[ElXokas](https://yostreamer.com/setup/elxokas-setup)** e **[IlloJuan](https://yostreamer.com/setup/illojuan-setup)**, [STREAMER] utiliza componentes que garantizan rendimiento máximo:

**Procesador**: **[AMD Ryzen 9 7950X](https://www.amazon.es/s?k=AMD+Ryzen+9+7950X&tag=yostreamer-21)** - Multitasking Extremo
- **16 núcleos / 32 threads**: Gaming + encoding + navegadores simultáneos
- **Frecuencias boost hasta 5.7GHz**: Performance gaming sin compromisos
- **Eficiencia energética**: Menos calor, mayor estabilidad en streams largos
- **Compatibilidad futura**: Soporte para próximas generaciones DDR5

**Tarjeta Gráfica**: **[RTX 4090](https://www.amazon.es/s?k=RTX+4090&tag=yostreamer-21)** - Gaming 4K + Streaming Simultáneo  
- **Gaming 4K 120fps**: Calidad visual máxima para audiencia
- **NVENC encoding**: Streaming de alta calidad sin impacto en performance
- **Ray Tracing avanzado**: Gráficos cinematográficos en tiempo real
- **24GB VRAM**: Future-proof para próximos títulos AAA

### Comparativa: Setup de [STREAMER] vs Otros Grandes Streamers

#### vs Setup de Ibai Llanos
El **[setup de streaming de Ibai](https://yostreamer.com/setup/ibai-llanos-setup)** se enfoca en confiabilidad para eventos masivos y colaboraciones:
- **Similitudes**: Misma base de audio (SM7B + GoXLR) y calidad sin compromisos
- **Diferencias**: [STREAMER] optimiza específicamente para **[SPECIALTY]** con elementos gaming-focused
- **Ventaja única**: Configuración más ágil para contenido variado y espontáneo

#### vs Setup de TheGrefg  
El **[equipamiento de TheGrefg](https://yostreamer.com/setup/thegrefg-setup)** prioriza gaming competitivo y eventos grandes:
- **Puntos comunes**: Hardware de gama alta (RTX 4090, procesadores top)
- **Especialización**: [STREAMER] adapta mejor para **[SPECIALTY]** con configuraciones específicas
- **Innovación**: Implementación de tecnologías emergentes más rápida

#### vs Setup de ElXokas
El **[setup de ElXokas](https://yostreamer.com/setup/elxokas-setup)** balancea gaming casual con just chatting:
- **Audio similar**: Ambos priorizan calidad vocal excepcional
- **Diferenciación**: [STREAMER] incorpora más elementos de **[SPECIALTY]**
- **Flexibilidad**: Mayor adaptabilidad para diferentes tipos de contenido

### Configuración OBS Studio: Optimización Profesional

#### Settings de Encoding Avanzados
Configuración OBS optimizada basada en mejores prácticas de streamers profesionales:

\`\`\`
Configuración Video:
- Base Canvas: 1920x1080
- Output Resolution: 1920x1080
- Downscale Filter: Lanczos (Sharpened scaling, 36 samples)
- FPS: 60 (gaming) / 30 (just chatting)

Configuración Encoding:
- Encoder: NVIDIA NVENC H.264 (new)
- Rate Control: CBR  
- Bitrate: 6000 kbps (Partner) / 3500 kbps (Affiliate)
- Keyframe Interval: 2 seconds
- Preset: Quality
- Profile: high
- Look-ahead: Enabled
- Psycho Visual Tuning: Enabled
- GPU: 0 (RTX 4090)
- Max B-frames: 2
\`\`\`

### Presupuesto y ROI del Setup Profesional

#### Inversión Total del Setup
- **Audio profesional**: €800-1,200 (SM7B + GoXLR + auriculares)
- **PC Gaming/Streaming**: €4,500-6,000 (CPU + GPU + RAM + almacenamiento)
- **Sistema de video**: €2,500-3,500 (cámara + capturadora + iluminación)
- **Peripherals gaming**: €600-800 (teclado + mouse + mousepad)
- **Control de stream**: €400-600 (Stream Deck + accesorios)
- **Setup completo**: **€8,800-12,100**

#### ROI y Justificación Profesional
Para streamers de **[SPECIALTY]** con **[FOLLOWERS]** seguidores:
- **Retención de audiencia**: +35% con calidad técnica superior
- **Crecimiento orgánico**: Clips de alta calidad = mayor viralidad
- **Monetización premium**: Sponsors pagan más por calidad guaranteed
- **Longevidad del equipo**: Inversión amortizada en 2-3 años

### Evolución Futura del Setup

#### Tecnologías Emergentes
- **AV1 encoding**: Preparado para futura adopción en plataformas
- **AI-powered highlights**: Integración con sistemas de clip automation
- **VR/AR integration**: Ready para contenido mixto reality
- **8K streaming**: Hardware preparado para próxima generación

El **setup de [STREAMER]** representa la evolución natural del streaming profesional en España, combinando la experiencia de streamers como **[Ibai Llanos](https://yostreamer.com/setup/ibai-llanos-setup)**, **[TheGrefg](https://yostreamer.com/setup/thegrefg-setup)** y **[ElXokas](https://yostreamer.com/setup/elxokas-setup)** con innovaciones específicas para **[SPECIALTY]**. Esta configuración no solo garantiza calidad técnica superior, sino que crea las condiciones perfectas para el crecimiento sostenido y la conexión auténtica con la audiencia.

*¿Quieres saber más sobre configuraciones específicas? Consulta nuestras guías detalladas sobre el **[setup de Ibai](https://yostreamer.com/setup/ibai-llanos-setup)**, el **[equipamiento de TheGrefg](https://yostreamer.com/setup/thegrefg-setup)** o el **[setup de ElXokas](https://yostreamer.com/setup/elxokas-setup)** para comparaciones detalladas.*`
  },
  {
    title: "Mejor Equipamiento de Gaming para Streaming como [STREAMER] - Guía Completa 2025",
    category: "Hardware y Equipamiento",
    keywords: ["equipamiento gaming [STREAMER]", "PC gaming streaming", "hardware streaming profesional"],
    readingTime: 10,
    contentTemplate: `## Mejor Equipamiento de Gaming para Streaming como [STREAMER] - Guía Completa 2025

El **equipamiento de gaming para streaming** de [STREAMER] representa la síntesis perfecta entre rendimiento competitivo y calidad de transmisión. Con **[FOLLOWERS] seguidores** especializados en **[SPECIALTY]**, su configuración hardware demuestra cómo optimizar cada componente para maximizar tanto el gameplay como la experiencia del espectador.

### Filosofía del Hardware: Gaming + Streaming Sin Compromisos

En el ecosistema del streaming español, donde **[Ibai Llanos](https://yostreamer.com/setup/ibai-llanos-setup)**, **[TheGrefg](https://yostreamer.com/setup/thegrefg-setup)** y **[ElXokas](https://yostreamer.com/setup/elxokas-setup)** han establecido benchmarks de calidad, [STREAMER] destaca por su enfoque en **[SPECIALTY]**. Su hardware no solo debe ejecutar juegos a máximo rendimiento, sino simultáneamente procesar encoding de video, gestionar múltiples aplicaciones y mantener interacción fluida con su audiencia.

### Procesador: El Cerebro del Setup de [STREAMER]

#### AMD Ryzen 9 7950X - Multitasking Sin Límites
El **[AMD Ryzen 9 7950X](https://www.amazon.es/s?k=AMD+Ryzen+9+7950X&tag=yostreamer-21)** elegido por [STREAMER] representa la cúspide del rendimiento multihilo:

**Especificaciones Clave:**
- **16 cores / 32 threads**: Paralelización extrema para gaming + streaming + navegadores
- **Clock base 4.5GHz / Boost 5.7GHz**: Single-core performance para gaming competitivo
- **Cache L3 64MB**: Acceso ultra-rápido a datos frecuentes
- **TDP 170W**: Eficiencia térmica para sesiones maratónicas

**Ventajas para Streaming de [SPECIALTY]:**
- **Threads dedicados**: Cores específicos para OBS encoding sin impactar gaming
- **Rendimiento consistente**: Sin throttling durante streams de 8+ horas  
- **Futuro-proof**: Compatible con DDR5 y PCIe 5.0 para próximas generaciones

### Tarjeta Gráfica: Potencia Visual y Encoding

#### RTX 4090 - La Bestia del Gaming 4K
La **[RTX 4090](https://www.amazon.es/s?k=RTX+4090&tag=yostreamer-21)** en el setup de [STREAMER] no es solo para gaming, es una estación de trabajo completa:

**Gaming Performance:**
- **4K 120fps estables**: Títulos AAA a máxima calidad visual
- **Ray Tracing realista**: Gráficos cinematográficos que impresionan a la audiencia
- **DLSS 3 Frame Generation**: Performance adicional sin pérdida de calidad

**Streaming Capabilities:**
- **Dual AV1 encoders**: Streaming futuro-proof con máxima eficiencia
- **NVENC H.264/H.265**: Encoding hardware sin impacto en gaming performance  
- **24GB VRAM**: Buffer masivo para texturas 4K + assets de streaming

**Comparación con Otros Streamers:**
Similar al **[equipamiento de TheGrefg](https://yostreamer.com/setup/thegrefg-setup)** pero optimizado para **[SPECIALTY]**, la RTX 4090 permite a [STREAMER] mantener calidad visual máxima mientras transmite a 1080p60 sin compromisos.

### Memoria RAM: Multitasking Extremo

#### 64GB DDR5-5600 - Sin Limitaciones  
La configuración de **[64GB DDR5](https://www.amazon.es/s?k=64GB+DDR5+5600&tag=yostreamer-21)** de [STREAMER] es esencial para su workflow:

**Distribución Típica de RAM durante Stream:**
- **Gaming**: 16GB (juego + assets)
- **OBS + Plugins**: 8GB (encoding + overlays + alerts)
- **Navegadores**: 16GB (50+ pestañas Twitch/YouTube/Discord)
- **Sistema + Background**: 8GB (Windows + drivers + antivirus)
- **Buffer disponible**: 16GB (headroom para estabilidad)

### Almacenamiento: Velocidad y Capacidad

#### Configuración Dual NVMe para Performance Óptimo
[STREAMER] utiliza estrategia de almacenamiento dual para maximizar rendimiento:

**Drive Principal**: **[Samsung 980 PRO 2TB](https://www.amazon.es/s?k=Samsung+980+PRO+2TB&tag=yostreamer-21)**
- **SO + Aplicaciones críticas**: Windows, OBS, juegos principales
- **Velocidades PCIe 4.0**: 7000MB/s lectura para cargas instantáneas
- **Durabilidad TBW**: Escrituras intensivas de grabación sin degradación

**Drive Secundario**: **[Samsung 970 EVO Plus 4TB](https://www.amazon.es/s?k=Samsung+970+EVO+Plus+4TB&tag=yostreamer-21)**
- **Biblioteca de juegos**: Steam, Epic, Battle.net completos
- **Grabaciones + VODs**: Storage masivo para contenido archivado
- **Velocidades sostenidas**: Performance consistente para streaming library

### Motherboard: La Base del Ecosistema

#### ASUS ROG Strix X670E-E - Conectividad y Expansión
La **[ASUS ROG Strix X670E-E](https://www.amazon.es/s?k=ASUS+ROG+Strix+X670E-E&tag=yostreamer-21)** proporciona foundation sólida:

**Características para Streaming:**
- **WiFi 6E integrado**: Conexión wireless ultra-estable para dispositivos móviles
- **2.5Gb Ethernet**: Bandwidth garantizado para streaming + upload simultáneo
- **USB 4.0 frontal**: Conexión directa para cámaras y dispositivos de captura
- **Audio SupremeFX**: DAC integrado de calidad para monitoreo

### Refrigeración: Temperaturas Bajo Control

#### Configuración Híbrida para Performance Sostenida
[STREAMER] combina refrigeración líquida y air cooling para óptimo balance:

**CPU Cooler**: **[NZXT Kraken X73](https://www.amazon.es/s?k=NZXT+Kraken+X73&tag=yostreamer-21)**
- **Radiador 360mm**: Disipación masiva para Ryzen 9 7950X
- **RGB customizable**: Integración estética con setup de streaming
- **Control software**: Curvas de temperatura automáticas según workload

**Case Cooling**: **[Fractal Design Define 7 XL](https://www.amazon.es/s?k=Fractal+Design+Define+7+XL&tag=yostreamer-21)**
- **Airflow optimizado**: Intake frontal + exhaust superior/posterior
- **Aislamiento acústico**: Reducción de ruido para audio streaming limpio
- **Espacio modular**: Fácil mantenimiento y upgrades futuros

### Fuente de Alimentación: Potencia Confiable

#### Seasonic Prime TX-1000 - Eficiencia y Estabilidad
La **[Seasonic Prime TX-1000](https://www.amazon.es/s?k=Seasonic+Prime+TX+1000&tag=yostreamer-21)** garantiza alimentación limpia:

**Especificaciones Críticas:**
- **1000W 80+ Titanium**: Eficiencia 94%+ para menor calor y consumo
- **Fully modular**: Cable management limpio para airflow óptimo
- **Garantía 12 años**: Confiabilidad para uso profesional intensivo
- **Ripple < 1%**: Voltajes estables para components sensibles

### Periféricos Gaming: Precisión Competitiva

#### Configuración Optimizada para [SPECIALTY]
Los periféricos de [STREAMER] balancean performance competitivo con funcionalidad streaming:

**Teclado**: **[Corsair K100 RGB](https://www.amazon.es/s?k=Corsair+K100+RGB&tag=yostreamer-21)**
- **Switches Cherry MX Speed**: Actuación ultra-rápida para competitive gaming
- **Rueda iCUE**: Control multimedia durante streams sin interrumpir gameplay
- **Macros programables**: Hotkeys para OBS, Discord, Twitch integrados

**Mouse**: **[Logitech G Pro X Superlight](https://www.amazon.es/s?k=Logitech+G+Pro+X+Superlight&tag=yostreamer-21)**
- **63g ultra-ligero**: Precisión extrema para sesiones maratónicas
- **Sensor HERO 25K**: Tracking perfecto sin aceleración indeseada
- **Wireless LIGHTSPEED**: Latencia equivalente a conexión cableada

### Comparación con Setups de Otros Streamers Españoles

#### Benchmark vs Top Streamers
- **vs [Ibai Llanos](https://yostreamer.com/setup/ibai-llanos-setup)**: Más gaming-focused, menos broadcast equipment
- **vs [TheGrefg](https://yostreamer.com/setup/thegrefg-setup)**: Similar performance gaming, diferente approach en **[SPECIALTY]**
- **vs [ElXokas](https://yostreamer.com/setup/elxokas-setup)**: Más powerful para multitasking, menos minimalista

### ROI y Justificación de Inversión

#### Análisis Costo-Beneficio Setup Completo
**Inversión Total Hardware**: €6,800-8,500

**Retorno Mensual Esperado** (basado en **[FOLLOWERS]** y **[SPECIALTY]**):
- **Donaciones directas**: +25% por calidad visual superior
- **Sponsorships premium**: Brands pagan más por quality guaranteed  
- **Contenido viral**: Clips HD generan más engagement orgánico
- **Longevidad**: Setup dura 3-4 años sin upgrades mayores

### Optimizaciones Específicas para [SPECIALTY]

#### Configuraciones Avanzadas para Maximum Performance
[STREAMER] implementa tweaks específicos para **[SPECIALTY]**:

**Windows Optimizations:**
- **Game Mode activado**: Prioridad de recursos para gaming
- **HAGS desactivado**: Maximum compatibility con streaming software
- **Power Plan Ultimate Performance**: Zero throttling durante streams

**BIOS Tuning:**
- **PBO habilitado**: Boost automático Ryzen dentro de thermal limits
- **RAM XMP activado**: Velocidades DDR5 rated sin stability issues
- **PCIe Gen 4 forzado**: Maximum bandwidth para NVMe drives

### Evolución y Upgrade Path

#### Cronología de Mejoras Planificadas
1. **Q2 2025**: Upgrade a DDR5-6000 para additional performance headroom
2. **Q4 2025**: Segunda RTX 4090 para AI workloads y content creation
3. **2026**: Migración a AM5+ platform con próxima gen Ryzen
4. **Futuro**: Adopción 8K streaming cuando platforms lo soporten

El **equipamiento de gaming para streaming** de [STREAMER] demuestra que no hay que elegir entre performance competitivo y calidad de transmisión. Su configuración permite ejecutar juegos AAA a 4K mientras simultáneamente streama a 1080p60 sin compromisos, estableciendo un nuevo benchmark para streamers de **[SPECIALTY]** en España.

*¿Interesado en replicar este setup? Consulta nuestras guías detalladas sobre **[configuración de Ibai](https://yostreamer.com/setup/ibai-llanos-setup)**, **[equipamiento de TheGrefg](https://yostreamer.com/setup/thegrefg-setup)** y **[setup de ElXokas](https://yostreamer.com/setup/elxokas-setup)** para encontrar la configuración perfecta para tu presupuesto y estilo de streaming.*`
  }
];

// Generate a random post based on template and streamer
function generatePost(template: PostTemplate, streamer: typeof spanishStreamers[0]): InsertGeneratedPost {
  const slug = \`\${streamer.name.toLowerCase().replace(/\s+/g, '-')}-setup-\${Date.now()}\`;
  
  let content = template.contentTemplate
    .replace(/\[STREAMER\]/g, streamer.name)
    .replace(/\[FOLLOWERS\]/g, streamer.followers)
    .replace(/\[SPECIALTY\]/g, streamer.specialty);
  
  let title = template.title.replace(/\[STREAMER\]/g, streamer.name);
  
  const excerpt = \`Análisis completo del setup de streaming de \${streamer.name}. Equipamiento profesional, configuración OBS, presupuesto y consejos para replicar su configuración de \${streamer.specialty}.\`;
  
  // Generate keywords with streamer name
  const keywords = template.keywords.map(keyword => 
    keyword.replace(/\[STREAMER\]/g, streamer.name.toLowerCase())
  );
  
  const publishDate = new Date();
  publishDate.setHours(publishDate.getHours() + Math.floor(Math.random() * 24)); // Random within next 24h
  
  return {
    title,
    content,
    excerpt,
    slug,
    category: template.category,
    keywords: keywords.join(', '),
    readingTime: template.readingTime,
    publishedAt: publishDate,
    isPublished: true // Publish immediately for demonstration
  };
}

// Create posts for next 30 days
export async function createScheduledPosts() {
  try {
    console.log("Creating scheduled posts...");
    
    for (let i = 0; i < 5; i++) { // Create 5 posts
      const randomTemplate = postTemplates[Math.floor(Math.random() * postTemplates.length)];
      const randomStreamer = spanishStreamers[Math.floor(Math.random() * spanishStreamers.length)];
      
      const post = generatePost(randomTemplate, randomStreamer);
      const createdPost = await storage.createGeneratedPost(post);
      
      console.log(\`Created post: \${createdPost.title} (ID: \${createdPost.id})\`);
    }
    
    console.log("Scheduled posts created successfully");
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
      console.log(\`Published post: \${post.title}\`);
      
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
        subject: \`Nuevo artículo: \${post.title}\`,
        html: \`
          <h2>Nuevo artículo en Setups de Streamers</h2>
          <h3>\${post.title}</h3>
          <p>\${post.excerpt}</p>
          <p><a href="https://yostreamer.com/setup/\${post.slug}">Leer artículo completo</a></p>
          <p><small><a href="https://yostreamer.com/unsubscribe?token=\${subscriber.unsubscribeToken}">Cancelar suscripción</a></small></p>
        \`
      };
      
      try {
        await sgMail.send(emailContent);
        await storage.markEmailAsSent(emailEntry.id);
        console.log(\`Email sent to \${subscriber.email} for post \${post.title}\`);
      } catch (error) {
        console.error(\`Failed to send email to \${subscriber.email}:\`, error);
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
    // Create initial batch of posts
    await createScheduledPosts();
    
    // Publish any ready posts
    await publishScheduledPosts();
    
    // Set up interval for checking and publishing posts (every hour)
    setInterval(publishScheduledPosts, 60 * 60 * 1000);
    
    console.log("Post scheduling system initialized successfully");
  } catch (error) {
    console.error("Error initializing post schedule:", error);
  }
}