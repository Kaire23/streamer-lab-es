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

// Spanish streamers data for setup content generation
const spanishStreamers = [
  { name: "Ibai", followers: "19.7M", specialty: "variety, events" },
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

// High-priority SEO-optimized post templates focusing on Spanish streamers
const postTemplates: PostTemplate[] = [
  // Streamer Setup Analysis (High Priority)
  {
    title: "Setup de [STREAMER]: Análisis Completo de Equipamiento 2025",
    category: "Configuración y Setup Técnico",
    keywords: ["setup [STREAMER]", "equipamiento [STREAMER]", "configuración streaming", "setup streaming profesional"],
    priority: "high",
    readingTime: 9,
    contentTemplate: `## Setup de [STREAMER]: Equipamiento y Configuración Profesional

El **setup de [STREAMER]** representa uno de los ejemplos más exitosos de configuración streaming en España. Con [FOLLOWERS] seguidores, [STREAMER] ha perfeccionado su equipamiento para ofrecer la máxima calidad en streams de [SPECIALTY].

### Hardware Principal del Setup de [STREAMER]

#### Micrófono y Audio Profesional
El setup de **[STREAMER]** prioriza la calidad de audio, utilizando equipamiento similar al **setup de Ibai** pero adaptado a su estilo único:
- **Micrófono principal**: **[Shure SM7B](https://www.amazon.es/s?k=Shure+SM7B&tag=yostreamer-21)** o **[Electro-Voice RE20](https://www.amazon.es/s?k=Electro-Voice+RE20&tag=yostreamer-21)**
- **Interfaz de audio**: **[GoXLR](https://www.amazon.es/s?k=GoXLR&tag=yostreamer-21)** para control total
- **Auriculares monitoring**: **[Beyerdynamic DT 770 Pro](https://www.amazon.es/s?k=Beyerdynamic+DT+770+Pro&tag=yostreamer-21)**

#### PC Gaming y Streaming
Como otros grandes streamers españoles como **TheGrefg** y **ElXokas**, [STREAMER] utiliza hardware de gama alta:
- **CPU**: **[AMD Ryzen 9 7950X](https://www.amazon.es/s?k=AMD+Ryzen+9+7950X&tag=yostreamer-21)** para multitasking extremo
- **GPU**: **[RTX 4090](https://www.amazon.es/s?k=RTX+4090&tag=yostreamer-21)** para gaming 4K + streaming
- **RAM**: **[64GB DDR5](https://www.amazon.es/s?k=64GB+DDR5+gaming&tag=yostreamer-21)** para navegadores + OBS + gaming

### Configuración de Cámara y Video

#### Setup Visual Profesional
Siguiendo la tendencia de streamers como **IlloJuan** y **AuronPlay**, [STREAMER] enfoca en calidad visual:
- **Cámara principal**: **[Sony Alpha A7S III](https://www.amazon.es/s?k=Sony+Alpha+A7S+III&tag=yostreamer-21)** para calidad cinematográfica
- **Capturadora**: **[Elgato Cam Link 4K](https://www.amazon.es/s?k=Elgato+Cam+Link+4K&tag=yostreamer-21)** 
- **Iluminación**: **[Elgato Key Light Air](https://www.amazon.es/s?k=Elgato+Key+Light+Air&tag=yostreamer-21)** setup dual

### Comparación con Otros Setups de Streamers Españoles

#### vs Setup de Ibai
Mientras que el **setup de Ibai** prioriza la confiabilidad para eventos masivos, el setup de [STREAMER] enfoca en [especialidad específica]:
- **Similitudes**: Mismo nivel de calidad audio (SM7B + GoXLR)
- **Diferencias**: [STREAMER] utiliza más elementos gaming-focused
- **Resultado**: Adaptado perfecto para contenido de [SPECIALTY]

#### vs Setup de ElXokas
Comparado con el **setup de ElXokas**, [STREAMER] implementa:
- **Audio processing más avanzado**: Efectos de voz en tiempo real
- **Iluminación RGB**: Ambiente más dinámico para [SPECIALTY]
- **Multi-camera setup**: Diferentes ángulos para variedad visual

### Configuración OBS Studio Profesional

#### Settings Optimizados
El setup de [STREAMER] utiliza configuración OBS similar a streamers profesionales:
\`\`\`
Encoding:
- Encoder: NVENC H.264 (GPU)
- Rate Control: CBR
- Bitrate: 6000 kbps
- Keyframe: 2s

Video:
- Base Resolution: 1920x1080
- Output Resolution: 1920x1080  
- FPS: 60 (gaming) / 30 (just chatting)
\`\`\`

#### Scenes y Transiciones
- **Gaming Scene**: Game capture + webcam overlay + chat
- **Just Chatting**: Webcam principal + background elements
- **Starting/Ending**: Branded graphics + música
- **BRB Scene**: Animated background + countdown

### Peripherals y Accesorios

#### Gaming Peripherals
Para gaming competitivo similar a **TheGrefg**:
- **Teclado**: **[Corsair K100 RGB](https://www.amazon.es/s?k=Corsair+K100+RGB&tag=yostreamer-21)** con switches speed
- **Mouse**: **[Logitech G Pro X Superlight](https://www.amazon.es/s?k=Logitech+G+Pro+X+Superlight&tag=yostreamer-21)**
- **Mousepad**: **[SteelSeries QcK+](https://www.amazon.es/s?k=SteelSeries+QcK+XXL&tag=yostreamer-21)**

#### Streaming Controls
- **Stream Deck XL**: **[Elgato Stream Deck XL](https://www.amazon.es/s?k=Elgato+Stream+Deck+XL&tag=yostreamer-21)** para control total
- **Macros personalizados**: Scene switching, audio control, alerts
- **Integración Discord**: Control de canales y estados

### Presupuesto Total del Setup

#### Inversión Profesional
El setup completo de [STREAMER] representa una inversión de:
- **Hardware core**: ~8000€ (PC + periféricos principales)
- **Audio profesional**: ~1500€ (micrófono + interfaz + tratamiento)
- **Video/Iluminación**: ~2000€ (cámara + capturadora + luces)
- **Accesorios**: ~1000€ (Stream Deck + cables + mounting)
- **Total**: ~12500€

### Alternativas por Presupuesto

#### Versión Intermedia (~3000€)
Para replicar el estilo con presupuesto menor:
- **PC**: **[PC Build RTX 4060 Ti](https://www.amazon.es/s?k=PC+gaming+RTX+4060+Ti&tag=yostreamer-21)** (~1500€)
- **Audio**: **[Audio-Technica AT2020USB+](https://www.amazon.es/s?k=Audio-Technica+AT2020USB&tag=yostreamer-21)** (~150€)
- **Webcam**: **[Logitech StreamCam](https://www.amazon.es/s?k=Logitech+StreamCam&tag=yostreamer-21)** (~150€)

#### Versión Budget (~800€)
Setup inicial inspirado en [STREAMER]:
- **PC básico**: **[PC gaming entrada](https://www.amazon.es/s?k=PC+gaming+entrada+streaming&tag=yostreamer-21)** (~600€)
- **Micrófono**: **[Blue Yeti](https://www.amazon.es/s?k=Blue+Yeti&tag=yostreamer-21)** (~100€)
- **Iluminación**: **[Ring light](https://www.amazon.es/s?k=ring+light+streaming&tag=yostreamer-21)** (~50€)

### Evolución y Upgrades

#### Cronología del Setup
1. **Fase inicial**: Setup básico similar a streamers pequeños
2. **Crecimiento**: Upgrade audio profesional (como **ElRubius**)
3. **Profesionalización**: Setup actual con elementos únicos
4. **Futuro**: Expansión studio con green screen profesional

### Consejos para Replicar el Setup

#### Empezar Gradual
1. **Prioridad audio**: Micrófono decente primero
2. **Estabilidad**: PC que maneje streaming + gaming
3. **Iluminación básica**: Ring light o panel LED  
4. **Upgrade progresivo**: Añadir elementos según crecimiento

#### Adaptación Personal
- **Analiza tu contenido**: Gaming vs Just Chatting vs Variety
- **Presupuesto realista**: No copies todo de una vez
- **Personalización**: Añade elementos únicos como [STREAMER]

*El setup de [STREAMER] demuestra que la calidad profesional viene de la consistencia y optimización gradual, no de comprar todo el equipamiento caro de una vez.*`
  },
  
  // OBS Configuration (High Priority)
  {
    title: "Mejor Configuración OBS 2025: Guía Completa para Streaming",
    category: "Configuración y Setup Técnico",
    keywords: ["configuración OBS", "OBS Studio configuración", "mejor configuración OBS 2025", "OBS streaming Twitch"],
    priority: "high",
    readingTime: 10,
    contentTemplate: `## La Mejor Configuración OBS para Streaming 2025

**OBS Studio** es el software de streaming más utilizado por streamers profesionales como **Ibai**, **TheGrefg** y **ElXokas**. Esta guía cubre la configuración óptima para streaming en 2025.

### Configuración Video Óptima

#### Settings Recomendados 2025
\\\`\\\`\\\`
Base (Canvas) Resolution: 1920x1080
Output (Scaled) Resolution: 1920x1080
Downscale Filter: Lanczos (Sharpened scaling, 36 samples)
Common FPS Values: 60 (si tu PC aguanta) o 30 (más estable)
\\\`\\\`\\\`

#### Por Tipo de Hardware
**PC High-End (RTX 4070+)**:
- **Resolution**: 1080p 60fps
- **Encoder**: NVENC H.264 (new)
- **Bitrate**: 6000 kbps

**PC Mid-Range (RTX 3060-4060)**:
- **Resolution**: 1080p 60fps
- **Encoder**: NVENC H.264
- **Bitrate**: 4500 kbps

**PC Budget (GTX 1660-RTX 3050)**:
- **Resolution**: 720p 60fps o 1080p 30fps
- **Encoder**: x264 Fast
- **Bitrate**: 3500 kbps

### Configuración Audio Profesional

#### Settings de Audio como los Pros
Los streamers exitosos priorizan audio sobre video:
\\\`\\\`\\\`
Sample Rate: 48kHz
Channels: Stereo
Desktop Audio Device: Default
Mic/Auxiliary Device: Tu micrófono principal
\\\`\\\`\\\`

#### Filtros Audio Esenciales
1. **Noise Suppression**: RNNoise (-60dB)
2. **Gain**: Ajustar a -12dB peak
3. **Compressor**: Ratio 3:1, Threshold -18dB
4. **Limiter**: -3dB ceiling

### Encoder Settings Avanzados

#### NVENC (GPU) - Recomendado 2025
Utilizado por **TheGrefg** y streamers profesionales:
\\\`\\\`\\\`
Rate Control: CBR
Bitrate: 6000 kbps (Twitch max)
Keyframe Interval: 2 seconds
Preset: Quality (P5) o Max Quality (P7)
Profile: high
Look-ahead: Enabled
Psycho Visual Tuning: Enabled
GPU: 0
Max B-frames: 2
\\\`\\\`\\\`

#### x264 (CPU) - Para PCs Potentes
Configuración similar al setup de **ElXokas**:
\\\`\\\`\\\`
Rate Control: CBR
Bitrate: 6000 kbps
CPU Usage Preset: Medium (o Fast si lag)
Profile: high
Tune: zerolatency
\\\`\\\`\\\`

### Scenes Profesionales Setup

#### Scene Collection como Ibai
**Estructura recomendada**:
1. **Starting Soon**: Pre-stream screen
2. **Main Gaming**: Game + webcam overlay
3. **Just Chatting**: Webcam focus + background
4. **BRB**: Break screen con timer
5. **Ending**: Thanks + social media

#### Sources Optimization
- **Game Capture**: Mejor performance que Display
- **Window Capture**: Para aplicaciones específicas
- **Browser Source**: Para overlays y alerts
- **Image Source**: Para logos y graphics estáticos

### Streaming a Twitch/YouTube

#### Platform-Specific Settings
**Twitch**:
- Server: Auto (mejor latencia)
- Bitrate: Max 8000 kbps (6000 recomendado)
- Keyframe: 2 segundos exactos

**YouTube**:
- Server: Primary YouTube ingest
- Bitrate: Hasta 20000 kbps posible
- Latency: Low-latency activado

### Filtros de Video Profesionales

#### Webcam Enhancement
Como el setup visual de **AuronPlay**:
1. **Color Correction**: Ajustar contrast/brightness
2. **Sharpen**: Sutilmente para más definición
3. **Chroma Key**: Si usas green screen
4. **Crop/Pad**: Para aspect ratio perfecto

### Optimización Performance

#### Reduce Lag y Dropped Frames
**Process Priority**: Above Normal para OBS
**GPU Scheduling**: Hardware-accelerated GPU scheduling ON
**Game Mode**: Windows Game Mode OFF mientras streameas
**Background Apps**: Cerrar Discord overlay, browsers innecesarios

#### Monitoring Performance
Stats to Watch:
- **Rendering Lag**: <5%
- **Encoding Lag**: 0%
- **Dropped Frames**: <0.1%
- **CPU Usage**: <80%

### Plugins Esenciales 2025

#### Must-Have Plugins
- **StreamElements**: Overlays y alerts
- **Advanced Scene Switcher**: Automatización
- **Source Record**: Grabar sources separados
- **Move Transition**: Smooth scene changes

### Configuración Dual PC

#### Setup como TheGrefg
**Gaming PC**: Solo juega
**Streaming PC**: Solo OBS + overlays
**Conexión**: Capture card (Elgato 4K60 Pro)
**Audio**: Mix via GoXLR o similar

### Troubleshooting Común

#### High CPU/GPU Usage
1. **Lower preset**: Medium → Fast
2. **Reduce resolution**: 1080p → 720p
3. **Frame rate**: 60fps → 30fps
4. **Close unnecessary**: Browser tabs, Discord

#### Black Screen Issues
1. **Run as Administrator**: OBS
2. **Graphics drivers**: Update
3. **Game capture mode**: Auto → Specific
4. **Compatibility**: Disable fullscreen optimizations

### Backup y Recovery

#### Settings Backup
- **Export Profile**: Settings → Profile → Export
- **Scene Collection**: Export scenes regularmente
- **Cloud backup**: Google Drive para settings
- **Multiple profiles**: Gaming, Just Chatting, IRL

### Configuración Mobile/IRL

#### Para Streams Fuera del PC
- **OBS Camera**: Phone como webcam
- **Streamlabs Mobile**: All-in-one solution
- **Hardware encoder**: Para reduce CPU load
- **Hotspot**: 4G/5G backup internet

### Conclusión: Setup Profesional

La **mejor configuración OBS** combina:
1. **Hardware adecuado**: CPU/GPU balanced
2. **Settings optimizados**: Según tu setup específico  
3. **Audio prioritario**: Nunca comprometer calidad sonido
4. **Monitoring constante**: Stats y performance
5. **Backup regular**: Settings y scenes

**Quick Start Checklist**:
✓ NVENC encoder (si tienes GPU compatible)
✓ 6000 kbps bitrate
✓ Audio filters: Noise suppression + compressor
✓ Scene structure clara
✓ Performance monitoring activo

*Esta configuración replicará la calidad profesional que ves en streams de Ibai, TheGrefg y otros streamers exitosos.*`
  },

  // Streamlabs vs OBS
  {
    title: "Streamlabs OBS vs OBS Studio 2025: ¿Cuál Elegir?",
    category: "Configuración y Setup Técnico", 
    keywords: ["Streamlabs OBS", "OBS Studio", "Streamlabs vs OBS", "mejor software streaming"],
    priority: "high",
    readingTime: 8,
    contentTemplate: `## Streamlabs OBS vs OBS Studio: Comparación Definitiva 2025

La elección entre **Streamlabs OBS** y **OBS Studio** define tu experiencia de streaming. Analizamos ambas opciones para ayudarte a decidir.

### OBS Studio: La Elección de los Profesionales

#### Por qué los Pros Eligen OBS
Streamers como **Ibai**, **TheGrefg** y **ElXokas** utilizan **OBS Studio** por:
- **Performance superior**: Menor uso de recursos
- **Estabilidad**: Menos crashes durante streams largos
- **Flexibilidad total**: Control granular de todo
- **Plugins infinitos**: Extensibilidad máxima
- **Gratis 100%**: Sin limitaciones premium

#### Ventajas OBS Studio
**Performance**:
- **20-30% menos CPU**: Comparado con Streamlabs
- **Menor RAM usage**: Más memory para juegos
- **Estabilidad superior**: Especialmente en streams largos

**Personalización**:
- **Control total**: Cada setting configurable
- **Plugin ecosystem**: Cientos de plugins gratuitos
- **Custom scripts**: Automatización avanzada

### Streamlabs OBS: All-in-One Solution

#### Para Quién es Ideal
**Beginners** que buscan simplicity:
- **Setup rápido**: Wizard de configuración
- **Widgets integrados**: Alerts, chat, donations
- **Templates**: Overlays pre-diseñados
- **Cloud backup**: Settings sync automático

#### Ventajas Streamlabs
**Convenience**:
- **One-click setup**: Para principiantes
- **Integrated alerts**: No need external tools
- **Prime benefits**: Con Amazon Prime
- **Support**: Chat support disponible

### Comparación Performance 2025

#### Benchmarks Reales
**Sistema Test**: Ryzen 7 5800X + RTX 3070
**Streaming 1080p60**:

**OBS Studio**:
- CPU Usage: 15-20%
- RAM Usage: 800MB
- Dropped Frames: 0.02%

**Streamlabs OBS**:
- CPU Usage: 25-30%
- RAM Usage: 1.2GB  
- Dropped Frames: 0.08%

### Features Comparison

#### Streaming Core
| Feature | OBS Studio | Streamlabs |
|---------|------------|------------|
| Multi-platform | ✅ | ✅ |
| Custom bitrate | ✅ | ✅ |
| Scene collections | ✅ | ✅ |
| Advanced filters | ✅ | Limited |
| Plugin support | ✅ | Limited |

#### Integrated Tools
| Feature | OBS Studio | Streamlabs |
|---------|------------|------------|
| Alerts | Plugin needed | ✅ Built-in |
| Chat overlay | Plugin needed | ✅ Built-in |
| Donations | External | ✅ Built-in |
| Analytics | External | ✅ Built-in |

### Setup Específico por Uso

#### Para Gaming Competitivo
**OBS Studio** preferred:
- **Lower latency**: Menos input lag
- **Better performance**: Más FPS en juegos
- **Stability**: Crítico para competitive

**Configuración**:
- **Process priority**: High para OBS
- **Dedicated cores**: CPU affinity
- **Minimal overlays**: Performance focus

#### Para Content Creation
**Streamlabs** puede funcionar:
- **Easy overlays**: Quick setup
- **Integrated tools**: All-in-one
- **Templates**: Professional look instantly

### Migration Guide

#### De Streamlabs a OBS
**Why Switch**:
- **Performance issues**: Lag durante streams
- **More control needed**: Advanced configuration
- **Plugin requirements**: Specific functionality

**Migration Steps**:
1. **Export scenes**: Streamlabs settings
2. **Install OBS**: Latest version
3. **Recreate scenes**: Manually o import parcial
4. **Add plugins**: StreamElements, alerts
5. **Test setup**: Completamente antes de go live

#### Setup Equivalente
**Streamlabs Features → OBS Alternatives**:
- **Alerts**: StreamElements/StreamLabs (web)
- **Chat overlay**: OBS Browser source
- **Donations**: Ko-fi, Streamlabs (web)
- **Analytics**: Twitch Dashboard + third-party

### Hardware Requirements

#### Minimum Specs OBS Studio
- **CPU**: Quad-core 2.5GHz+
- **RAM**: 8GB
- **GPU**: GTX 1050 / RX 560+
- **Storage**: 500MB

#### Minimum Specs Streamlabs
- **CPU**: Quad-core 3.0GHz+
- **RAM**: 16GB recommended
- **GPU**: GTX 1060 / RX 580+
- **Storage**: 2GB

### Plugin Ecosystem

#### Essential OBS Plugins
**Performance**:
- **Advanced Scene Switcher**: Automatización
- **OBS NDI**: Network streaming
- **GPU-assisted encoding**: Performance boost

**Content**:
- **Browser Source**: Web overlays
- **VLC Video Source**: Media playback
- **Image Slideshow**: Rotating content

### Cost Analysis

#### OBS Studio
- **Software**: Free
- **Alerts service**: $0-10/month
- **Additional tools**: Varies
- **Total**: $0-50/month

#### Streamlabs
- **Software**: Free (limited) / $19/month (Prime)
- **Built-in tools**: Included
- **Advanced features**: $49/month (Pro)
- **Total**: $0-49/month

### Real Streamer Opinions

#### Pro Streamers (OBS)
**"Performance es crítico para mi contenido competitivo"** - Competitive gaming streamer
**"Necesito control total de mi setup"** - Variety streamer
**"Plugins específicos para mi workflow"** - Content creator

#### Growing Streamers (Streamlabs)
**"Empecé con Streamlabs, simple setup"** - 1K follower streamer
**"All-in-one me ahorra tiempo"** - Part-time streamer
**"Migré a OBS cuando crecí"** - Mid-tier streamer

### Decision Framework

#### Choose OBS Studio If:
- **Performance crítico**: Gaming competitivo
- **Advanced user**: Technical comfort
- **Custom workflow**: Specific requirements
- **Budget conscious**: Free preference
- **Plugin dependent**: Specific functionality

#### Choose Streamlabs If:
- **Complete beginner**: First time streaming
- **Quick setup**: Go live today
- **All-in-one**: Prefer integrated
- **Support needed**: Chat/email support
- **Premium features**: Worth the cost

### Transition Timeline

#### Streamlabs → OBS (Recommended)
**Month 1**: Learn OBS basics
**Month 2**: Setup equivalent workflow  
**Month 3**: Add advanced plugins
**Month 4**: Full migration

### 2025 Recommendation

**Start with**: Streamlabs (if complete beginner)
**Transition to**: OBS Studio (when comfortable)
**Stay with**: OBS for professional streaming

**Why this approach**:
- **Learning curve**: Gradual progression
- **Performance**: Better long-term
- **Cost**: Free upgrade path
- **Future-proof**: Industry standard

*La mayoría de streamers exitosos eventualmente migran a OBS Studio por performance y control. Empieza donde te sientas cómodo, pero planifica la transición.*`
  },
  
  // Webcam content
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
  }
];

// Generate content for posts with dynamic streamer replacement
function generatePostContent(template: PostTemplate): string {
  const currentYear = new Date().getFullYear();
  const today = new Date().toISOString().slice(0, 10);
  
  // For streamer-specific templates, select a random streamer
  let content = template.contentTemplate;
  
  if (template.title.includes('[STREAMER]')) {
    const randomStreamer = spanishStreamers[Math.floor(Math.random() * spanishStreamers.length)];
    
    // Replace all template variables
    content = content
      .replace(/\[STREAMER\]/g, randomStreamer.name)
      .replace(/\[FOLLOWERS\]/g, randomStreamer.followers)
      .replace(/\[SPECIALTY\]/g, randomStreamer.specialty);
    
    // Update title and keywords with actual streamer name
    template.title = template.title.replace('[STREAMER]', randomStreamer.name);
    template.keywords = template.keywords.map(keyword => 
      keyword.replace('[STREAMER]', randomStreamer.name.toLowerCase())
    );
  }
  
  // Replace other template variables
  content = content.replace(/2025/g, currentYear.toString());
  content = content.replace(/\[CURRENT_DATE\]/g, today);
  
  return content;
}

// Initialize post scheduling system
export async function initializePostSchedule() {
  console.log("Post scheduling system initialized");
  // Basic initialization - can be expanded later for database setup, migrations etc.
}

// Schedule new post creation
export async function createScheduledPost() {
  try {
    // Prioritize streamer setup content 70% of the time
    let templateIndex: number;
    if (Math.random() < 0.7) {
      // Select streamer setup or OBS configuration templates (high priority)
      const highPriorityTemplates = postTemplates.filter(t => 
        t.category === "Configuración y Setup Técnico" || 
        t.title.includes('[STREAMER]') || 
        t.keywords.includes("configuración OBS")
      );
      templateIndex = Math.floor(Math.random() * highPriorityTemplates.length);
      // Get index in original array
      templateIndex = postTemplates.findIndex(t => t === highPriorityTemplates[templateIndex]);
    } else {
      // Regular template selection
      templateIndex = Math.floor(Math.random() * postTemplates.length);
    }
    
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
      const subscriber = await storage.getSubscriber(emailEntry.subscriberId.toString());
      const post = await storage.getGeneratedPost(emailEntry.postId.toString());
      
      if (!subscriber || !post) continue;
      
      const emailContent = {
        to: subscriber.email,
        from: "noreply@yostreamer.com",
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
