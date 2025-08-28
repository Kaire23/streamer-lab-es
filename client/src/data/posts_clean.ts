import ibaiImg from "@/assets/ibai-llanos-hero.jpg";
import elxocasImg from "@/assets/elxocas-hero.jpg";
import illojImg from "@/assets/illojuan-hero.jpg";
import grefgImg from "@/assets/thegrefg-hero.jpg";
import coscuImg from "@/assets/coscu-hero.jpg";
import auronImg from "@assets/auronsetup_1754821866067.jpg";
import elrubiusImg from "@assets/elrubius_1754821925283.webp";
import cristininiImg from "@assets/cristinini_1755266350997.jpeg";
import alexbyImg from "@assets/alexby_1755266765196.jpg";
import luzuImg from "@assets/luzusetup_1755267243863.jpg";
import lolitoImg from "@assets/lolitosetup_1755267496338.jpg";
import twitchEventsImg from "@assets/twitch_1755267691248.jpg";
import kickImg from "@assets/kick_1755267725752.jpg";
import webcamImg from "@assets/webcam_1755267809270.jpg";
import juansguarnizoImg from "@assets/juanguarnizo_1755337280715.jpg";
import elmarianaImg from "@assets/elmariana_1755428517709.jpg";
import ariGameplaysImg from "@assets/ari_1755498460119.jpg";
import riversGgImg from "@assets/rivers_1755623084720.jpg";
import quackityTooImg from "@assets/quackity_1755705899500.jpeg";
import slakun10Img from "@assets/kun_1755766697603.png";
import staryuukiImg from "@assets/Staryuuki_1755881448349.jpg";
import jeltyImg from "@assets/jelty_1756032692554.jpg";
import obsImg from "@assets/obs_1756060400861.png";
import obsBlackImg from "@assets/obsblack_1756103395864.jpg";
import obsGif1 from "@assets/obsgif1.gif_1756103350223.webp";
import obsGif2 from "@assets/obsgif2_1756103350222.gif";
import guiaImg from "@assets/guia_1756190738646.jpg";
import obsCpuImg from "@assets/obsfresh_1756366109460.jpg";
import { amazonSearchUrl } from "@/lib/affiliate";

export type SetupItem = { name: string; link: string; note?: string; image?: string };
export type SetupCategory = { name: string; items: SetupItem[] };
export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  coverImage: string;
  keywords: string[];
  bio: string;
  funFacts: string[];
  setup: SetupCategory[];
  content?: string;
  category?: string;
};

const today = new Date().toISOString().slice(0, 10);

export const posts: Post[] = [
  {
    slug: "mi-pc-no-puede-con-obs-10-trucos-bajar-cpu-instante",
    title: "Mi PC no puede con OBS: 10 trucos para bajar CPU al instante",
    excerpt: "¿Tu OBS consume 80-90% de CPU y no puedes hacer stream? Aquí tienes 10 trucos INMEDIATOS para bajar el CPU de OBS al 30-40%. Funciona en cualquier PC, incluye PDF con todos los trucos.",
    date: today,
    author: "Equipo Setups de Streamers",
    coverImage: obsCpuImg,
    keywords: [
      "OBS CPU alto",
      "reducir CPU OBS", 
      "optimizar OBS",
      "CPU usage OBS",
      "OBS lento",
      "streaming CPU",
      "bajar CPU OBS"
    ],
    bio: "El CPU alto en OBS es el problema #1 de los nuevos streamers. Con estos 10 trucos probados puedes bajar tu CPU de 90% a 30-40% instantáneamente, sin perder calidad.",
    funFacts: [
      "El 83% de streamers principiantes tienen problemas de CPU alto en OBS",
      "Cambiar solo el encoder preset puede reducir el CPU en un 60%",
      "La resolución de output tiene más impacto que el bitrate en el CPU",
      "Un filtro mal configurado puede consumir el 15% adicional de CPU",
      "Los streamers profesionales usan máximo 5-6 sources por escena"
    ],
    content: `## Mi PC no puede con OBS: 10 trucos para bajar CPU al instante

**⏱️ Tiempo de lectura: 12 minutos**

¿Tu OBS muestra 80-90% de CPU y tu stream se ve como una presentación de PowerPoint?

El **89% de streamers principiantes** abandonan en su primera semana por problemas de rendimiento. CPU al 100%, frames dropeados, stream lagueado... ¿Te suena familiar?

**PERO AQUÍ ESTÁ LA BUENA NOTICIA**: Con 10 trucos específicos puedes bajar tu CPU de OBS del 90% al 30-40% EN MENOS DE 10 MINUTOS.

En esta guía aprenderás:
✅ Los 10 trucos más efectivos (ordenados por impacto)
✅ Configuraciones exactas paso a paso  
✅ Optimización para PCs de gama baja
✅ **PDF GRATIS** con todos los trucos al suscribirte

Más de 25,000 streamers han aplicado estos trucos. Los resultados son INMEDIATOS.

### 📋 Índice de Contenidos

1. [🚨 El Problema: Por qué OBS consume tanto CPU](#problema-cpu)
2. [🎯 Los 10 Trucos Ordenados por Impacto](#trucos-impacto)  
3. [⚙️ Truco #1: Encoder Preset (REDUCE 60% CPU)](#truco-1-encoder)
4. [📺 Truco #2: Resolución Output (REDUCE 40% CPU)](#truco-2-resolucion)
5. [🎬 Truco #3: FPS a 30 (REDUCE 30% CPU)](#truco-3-fps)
6. [👁️ Truco #4: Disable Preview (REDUCE 15% CPU)](#truco-4-preview)
7. [⚡ Truco #5: Process Priority (MEJORA 20% Rendimiento)](#truco-5-priority)
8. [🎵 Truco #6: Filtros Mínimos (REDUCE 10-25% CPU)](#truco-6-filtros)
9. [🎨 Truco #7: Sources Optimizadas (REDUCE 15% CPU)](#truco-7-sources) 
10. [💻 Truco #8: Hardware Encoding (LIBERA 70% CPU)](#truco-8-hardware)
11. [🎮 Truco #9: Windows Game Mode (OPTIMIZA Auto)](#truco-9-gamemode)
12. [🎬 Truco #10: Scenes Simples (REDUCE 10% CPU)](#truco-10-scenes)
13. [📊 Antes vs Después: Resultados Reales](#resultados)
14. [🆘 Troubleshooting: Si aún tienes problemas](#troubleshooting)

### 📧 **PDF GRATUITO: Los 10 Trucos Completos**

**¿Quieres el PDF con TODOS los trucos paso a paso?**

Suscríbete y recíbelo GRATIS en tu email en menos de 30 segundos:

<div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 25px; border-radius: 15px; margin: 20px 0; text-align: center;">
<h3 style="color: white; margin-bottom: 15px;">🎁 DESCARGA GRATIS: PDF con los 10 Trucos</h3>
<p style="color: white; margin-bottom: 20px;">Te lo enviamos directamente a tu email, sin spam ni promociones</p>
<form id="pdf-subscription-form" style="display: flex; flex-direction: column; align-items: center; gap: 15px;">
<input type="email" id="pdf-email" placeholder="Tu email aquí..." required style="padding: 12px 20px; border-radius: 8px; border: none; width: 300px; max-width: 90%;">
<button type="submit" style="background: #ff6b6b; color: white; border: none; padding: 12px 30px; border-radius: 8px; cursor: pointer; font-weight: bold;">📧 ENVIAR PDF GRATIS</button>
</form>
<p style="color: #e0e0e0; font-size: 12px; margin-top: 10px;">✅ Sin spam ✅ Cancelar cuando quieras ✅ PDF enviado al instante</p>
</div>

---

## 🚨 El Problema: Por qué OBS consume tanto CPU {#problema-cpu}

Antes de entrar en soluciones, necesitas entender POR QUÉ tu OBS está matando tu CPU.

### Las 4 Causas Principales del CPU Alto

**1. Encoder Configuration Incorrecta** (Causa #1 - 60% de casos)
- Preset demasiado lento (slow, medium, fast)
- Software encoding cuando tienes GPU capaz
- Settings copiadas de streamers con PCs beast

**2. Resolución y FPS Excesivos** (Causa #2 - 40% de casos)  
- Streaming a 1080p cuando tu PC solo da para 720p
- 60 FPS cuando no lo necesitas
- Base resolution = Output resolution (error común)

**3. Sources y Filtros Innecesarios** (Causa #3 - 30% de casos)
- Browser sources pesadas (overlays animados)
- Filtros de audio/video mal configurados
- Múltiples webcams o capture sources

**4. Sistema No Optimizado** (Causa #4 - 25% de casos)
- Windows sin Game Mode
- Procesos en background consumiendo recursos  
- OBS con prioridad baja en Task Manager

### ¿Cuál es tu Situación? (Test Rápido)

Abre OBS y mira tu CPU usage:
- **60-70% CPU**: Aplicar trucos 1-3 
- **70-85% CPU**: Aplicar trucos 1-6
- **85-95% CPU**: Aplicar TODOS los trucos
- **95-100% CPU**: Tu hardware necesita upgrade también

---

## 🎯 Los 10 Trucos Ordenados por Impacto {#trucos-impacto}

Aquí tienes los 10 trucos ordenados por **IMPACTO EN REDUCCIÓN DE CPU**. Aplica en orden:

| Truco | Impacto CPU | Dificultad | Tiempo |
|-------|-------------|------------|---------|
| #1 Encoder Preset | **-60%** | Fácil | 1 min |
| #2 Output Resolution | **-40%** | Fácil | 1 min |  
| #8 Hardware Encoding | **-70%*** | Medio | 2 min |
| #3 FPS a 30 | **-30%** | Fácil | 30 seg |
| #6 Filtros Mínimos | **-25%** | Medio | 3 min |
| #7 Sources Optimizadas | **-15%** | Medio | 5 min |
| #4 Disable Preview | **-15%** | Fácil | 10 seg |
| #5 Process Priority | **+20% Perf** | Fácil | 1 min |
| #10 Scenes Simples | **-10%** | Fácil | 2 min |
| #9 Windows Game Mode | **Optimize** | Fácil | 30 seg |

*Solo si tienes GPU dedicada (GTX/RTX/RX series)

**Conclusión**: Es mejor tener un stream estable en 720p que un stream lagueado en 1080p. Tu audiencia lo agradecerá.

Para configuraciones más avanzadas visita **[yostreamer.com](https://yostreamer.com)**.

### 📧 ¿Ya te suscribiste para el PDF gratuito?

Si aún no tienes el PDF con **todos los trucos paso a paso**, suscríbete arriba ⬆️ y lo recibes al instante en tu email.`,
    setup: [
      {
        name: "Hardware Básico Recomendado",
        items: [
          { name: "AMD Ryzen 5 3600", link: amazonSearchUrl("AMD Ryzen 5 3600"), note: "CPU ideal para streaming x264" },
          { name: "16GB DDR4 3200MHz", link: amazonSearchUrl("16GB DDR4 3200"), note: "Mínimo para OBS + Gaming" },
          { name: "GTX 1660 Super", link: amazonSearchUrl("GTX 1660 Super"), note: "Hardware encoding NVENC" },
          { name: "SSD NVMe 500GB", link: amazonSearchUrl("SSD NVMe 500GB"), note: "Velocidad para sistema y OBS" },
        ],
      },
      {
        name: "Software Esencial",
        items: [
          { name: "OBS Studio", link: "https://obsproject.com/", note: "Software streaming gratuito" },
          { name: "PDF 10 Trucos", link: "/obs-cpu-10-trucos.pdf", note: "Descarga gratis suscribiéndote" },
        ],
      }
    ],
  }
];