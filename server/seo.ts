// SEO data for server-side rendering
// This file provides SEO meta tags for each route to improve initial HTML response

export interface SEOData {
  title: string;
  description: string;
  keywords: string;
  canonical: string;
  ogImage: string;
  type: 'website' | 'article';
  author?: string;
  datePublished?: string;
  dateModified?: string;
  wordCount?: number;
}

// Post data for SEO (synchronized with client/src/data/posts.ts)
const postSEOData: Record<string, SEOData> = {
  'ibai-llanos': {
    title: 'Setup de streaming de Ibai Llanos (2025): Guía completa | Setups de Streamers',
    description: 'Descubre el setup completo de Ibai Llanos: micrófono Shure SM7B, cámara Sony, PC gaming de alta gama e iluminación profesional para streaming de máxima calidad.',
    keywords: 'setup de streaming, Ibai Llanos, equipo streamer, micrófono Shure SM7B, cámara Sony',
    canonical: 'https://yostreamer.com/setup/ibai-llanos',
    ogImage: 'https://yostreamer.com/assets/ibai-llanos-hero.jpg',
    type: 'article',
    author: 'Equipo Setups de Streamers',
    datePublished: '2025-01-14',
    dateModified: '2025-01-14',
    wordCount: 1847
  },
  'elxokas': {
    title: 'Setup de streaming de ElXokas (2025): Potencia y estilo | Setups de Streamers',
    description: 'Análisis detallado del setup gaming de ElXokas: Stream Deck profesional, micrófono dinámico, cámara de alta definición y PC potente para gaming competitivo de élite.',
    keywords: 'ElXokas, setup streamer, audio profesional, stream deck',
    canonical: 'https://yostreamer.com/setup/elxokas',
    ogImage: 'https://yostreamer.com/assets/elxocas-hero.jpg',
    type: 'article',
    author: 'Equipo Setups de Streamers',
    datePublished: '2025-01-14',
    dateModified: '2025-01-14',
    wordCount: 1652
  },
  'illojuan': {
    title: 'Setup de streaming de illoJuan (2025): Calidez y calidad | Setups de Streamers',
    description: 'El setup único de IlloJuan: ambiente acogedor con iluminación cálida, micrófono de condensador profesional, cámara Sony y configuración optimizada para just chatting y gaming.',
    keywords: 'illoJuan, setup de streaming, Elgato, Sony',
    canonical: 'https://yostreamer.com/setup/illojuan',
    ogImage: 'https://yostreamer.com/assets/illojuan-hero.jpg',
    type: 'article',
    author: 'Equipo Setups de Streamers',
    datePublished: '2025-01-14',
    dateModified: '2025-01-14',
    wordCount: 1534
  },
  'thegrefg': {
    title: 'Setup de streaming de TheGrefg (2025): Estética y rendimiento | Setups de Streamers',
    description: 'Setup extremo de TheGrefg: iluminación LED roja espectacular, múltiples cámaras 4K, micrófono broadcast, PC gaming RTX de última generación y periféricos de competición profesional.',
    keywords: 'TheGrefg, setup gamer, RTX, cámara 4K',
    canonical: 'https://yostreamer.com/setup/thegrefg',
    ogImage: 'https://yostreamer.com/assets/thegrefg-hero.jpg',
    type: 'article',
    author: 'Equipo Setups de Streamers',
    datePublished: '2025-01-14',
    dateModified: '2025-01-14',
    wordCount: 1687
  },
  'coscu': {
    title: 'Setup de streaming de Coscu (2025): Energía y presencia | Setups de Streamers',
    description: 'El setup carismático de Coscu: micrófono Shure SM7B, iluminación RGB multicolor dinámica, cámara profesional y equipo gaming argentino optimizado para variety content y entretenimiento.',
    keywords: 'Coscu, setup streaming, micrófono, iluminación RGB',
    canonical: 'https://yostreamer.com/setup/coscu',
    ogImage: 'https://yostreamer.com/assets/coscu-hero.jpg',
    type: 'article',
    author: 'Equipo Setups de Streamers',
    datePublished: '2025-01-14',
    dateModified: '2025-01-14',
    wordCount: 1952
  },
  'ibai-llanos-setup-actualizado-septiembre-2025': {
    title: 'Setup de streaming de Ibai Llanos (2025): Guía completa [Actualizado] (Septiembre 2025) | Setups de Streamers',
    description: 'Descubre el setup completo de Ibai Llanos: micrófono Shure SM7B, cámara Sony, PC gaming de alta gama e iluminación profesional para streaming de máxima calidad.',
    keywords: 'setup de streaming, Ibai Llanos, equipo streamer, micrófono Shure SM7B, cámara Sony',
    canonical: 'https://yostreamer.com/setup/ibai-llanos-setup-actualizado-septiembre-2025',
    ogImage: 'https://yostreamer.com/assets/ibai-llanos-hero.jpg',
    type: 'article',
    author: 'Equipo Setups de Streamers',
    datePublished: '2025-01-14',
    dateModified: '2025-01-14',
    wordCount: 1847
  },
  'elxokas-setup-actualizado-septiembre-2025': {
    title: 'Setup de streaming de ElXokas (2025): Potencia y estilo [Actualizado] (Septiembre 2025) | Setups de Streamers',
    description: 'Análisis detallado del setup gaming de ElXokas: Stream Deck profesional, micrófono dinámico, cámara de alta definición y PC potente para gaming competitivo de élite.',
    keywords: 'ElXokas, setup streamer, audio profesional, stream deck',
    canonical: 'https://yostreamer.com/setup/elxokas-setup-actualizado-septiembre-2025',
    ogImage: 'https://yostreamer.com/assets/elxocas-hero.jpg',
    type: 'article',
    author: 'Equipo Setups de Streamers',
    datePublished: '2025-01-14',
    dateModified: '2025-01-14',
    wordCount: 1652
  },
  'auronplay-setup-actualizado-septiembre-2025': {
    title: 'Setup de streaming de AuronPlay (2025): Guía completa [Actualizado] (Septiembre 2025) | Setups de Streamers',
    description: 'Conoce el setup profesional de AuronPlay: micrófono broadcast, iluminación profesional, cámara 4K y PC gaming de alta gama para content creation de nivel mundial.',
    keywords: 'AuronPlay, setup streaming, micrófono broadcast, gaming setup',
    canonical: 'https://yostreamer.com/setup/auronplay-setup-actualizado-septiembre-2025',
    ogImage: 'https://yostreamer.com/assets/auronsetup_1754821866067.jpg',
    type: 'article',
    author: 'Equipo Setups de Streamers',
    datePublished: '2025-01-14',
    dateModified: '2025-01-14',
    wordCount: 1847
  },
  'elrubius-setup-actualizado-septiembre-2025': {
    title: 'Setup de streaming de ElRubius (2025): Guía completa [Actualizado] (Septiembre 2025) | Setups de Streamers',
    description: 'Descubre el setup icónico de ElRubius: equipamiento gaming de última generación, micrófono profesional, iluminación RGB y configuración optimizada para variety streaming.',
    keywords: 'ElRubius, setup gaming, streaming profesional, RGB lighting',
    canonical: 'https://yostreamer.com/setup/elrubius-setup-actualizado-septiembre-2025',
    ogImage: 'https://yostreamer.com/assets/elrubius_1754821925283.webp',
    type: 'article',
    author: 'Equipo Setups de Streamers',
    datePublished: '2025-01-14',
    dateModified: '2025-01-14',
    wordCount: 1956
  },
  'setup-streaming-menos-100-euros-actualizado-septiembre-2025': {
    title: 'Setup streaming por menos de 100€ (Probado y funcionando) [Actualizado] (Septiembre 2025) | Setups de Streamers',
    description: '¿Quieres empezar a hacer streaming con presupuesto limitado? Te mostramos cómo montar un setup completo por menos de 100€. Equipos probados, enlaces directos y configuración paso a paso.',
    keywords: 'setup streaming barato, streaming presupuesto limitado, equipos streaming 100 euros, streaming setup económico',
    canonical: 'https://yostreamer.com/setup/setup-streaming-menos-100-euros-actualizado-septiembre-2025',
    ogImage: 'https://yostreamer.com/assets/IMG_0022_1756897666663.jpeg',
    type: 'article',
    author: 'Equipo Setups de Streamers',
    datePublished: '2025-01-14',
    dateModified: '2025-01-14',
    wordCount: 1654
  },
  'obs-vs-streamlabs-2025-ganador-definitivo-100-horas-pruebas': {
    title: 'OBS vs Streamlabs 2025: Ganador definitivo tras 100 horas de pruebas [Actualizado] (Septiembre 2025) | Setups de Streamers',
    description: 'Comparativa definitiva OBS Studio vs Streamlabs OBS en 2025. Análisis completo de rendimiento, CPU usage, características y cuál es mejor para tu setup de streaming.',
    keywords: 'OBS vs Streamlabs, comparativa streaming software, OBS Studio vs Streamlabs OBS, mejor software streaming',
    canonical: 'https://yostreamer.com/setup/obs-vs-streamlabs-2025-ganador-definitivo-100-horas-pruebas',
    ogImage: 'https://yostreamer.com/assets/IMG_0021_1756897339110.webp',
    type: 'article',
    author: 'Equipo Setups de Streamers',
    datePublished: '2025-01-14',
    dateModified: '2025-01-14',
    wordCount: 2143
  },
  'por-que-tu-stream-va-tirones-como-arreglarlo-ya': {
    title: 'Por qué tu stream va a tirones (y cómo arreglarlo YA) [Actualizado] (Septiembre 2025) | Setups de Streamers',
    description: '¿Tu stream va lag, entrecortado o a tirones? Aquí tienes las 8 soluciones definitivas para arreglar el streaming lag, OBS drops y problemas de conexión AHORA MISMO.',
    keywords: 'stream va a tirones, streaming lag, OBS lag, stream entrecortado, arreglar lag streaming',
    canonical: 'https://yostreamer.com/setup/por-que-tu-stream-va-tirones-como-arreglarlo-ya',
    ogImage: 'https://yostreamer.com/assets/IMG_0004_1756896329986.jpeg',
    type: 'article',
    author: 'Equipo Setups de Streamers',
    datePublished: '2025-01-14',
    dateModified: '2025-01-14',
    wordCount: 1789
  },
  'audio-desincronizado-obs-solucion-3-clicks': {
    title: 'Audio desincronizado en OBS: Solución en 3 clicks [Actualizado] (Septiembre 2025) | Setups de Streamers',
    description: '¿El audio no va sincronizado con el video en tu stream? Aquí tienes la solución inmediata para arreglar el audio desincronizado en OBS Studio en solo 3 clicks.',
    keywords: 'audio desincronizado OBS, sincronizar audio OBS, audio desync streaming, arreglar audio OBS',
    canonical: 'https://yostreamer.com/setup/audio-desincronizado-obs-solucion-3-clicks',
    ogImage: 'https://yostreamer.com/assets/IMG_0020_1756896079127.png',
    type: 'article',
    author: 'Equipo Setups de Streamers',
    datePublished: '2025-01-14',
    dateModified: '2025-01-14',
    wordCount: 1547
  },
  'capturadora-o-sin-capturadora-la-verdad-que-nadie-te-cuenta': {
    title: 'Capturadora o sin capturadora: La verdad que nadie te cuenta [Actualizado] (Septiembre 2025) | Setups de Streamers',
    description: '¿Necesitas capturadora para streaming? Aquí la verdad completa sobre cuándo SÍ necesitas capturadora, cuándo NO, y qué opciones tienes. Guía definitiva 2025.',
    keywords: 'capturadora streaming, necesito capturadora, streaming sin capturadora, Elgato capture card',
    canonical: 'https://yostreamer.com/setup/capturadora-o-sin-capturadora-la-verdad-que-nadie-te-cuenta',
    ogImage: 'https://yostreamer.com/assets/IMG_0009_1756895475055.jpeg',
    type: 'article',
    author: 'Equipo Setups de Streamers',
    datePublished: '2025-01-14',
    dateModified: '2025-01-14',
    wordCount: 1623
  },
  'mi-pc-no-puede-con-obs-10-trucos-bajar-cpu-instante': {
    title: 'Mi PC no puede con OBS: 10 trucos para bajar CPU al instante [Actualizado] (Septiembre 2025) | Setups de Streamers',
    description: '¿Tu PC se queda sin recursos con OBS? Aquí tienes 10 trucos inmediatos para reducir el uso de CPU en OBS Studio y hacer streaming fluido incluso con PC básico.',
    keywords: 'OBS consume mucha CPU, reducir CPU OBS, optimizar OBS, PC lento OBS',
    canonical: 'https://yostreamer.com/setup/mi-pc-no-puede-con-obs-10-trucos-bajar-cpu-instante',
    ogImage: 'https://yostreamer.com/assets/IMG_0010_1756894994782.webp',
    type: 'article',
    author: 'Equipo Setups de Streamers',
    datePublished: '2025-01-14',
    dateModified: '2025-01-14',
    wordCount: 1534
  },
  'guia-streaming-kick-2025-actualizado-septiembre': {
    title: 'Guía Completa de Iniciación al Streaming en Kick 2025 [Actualizado] (Septiembre 2025) | Setups de Streamers',
    description: 'Descubre todo sobre Kick.com, la nueva plataforma de streaming. Cómo empezar, monetización, diferencias con Twitch y por qué streamers migran a Kick.',
    keywords: 'Kick streaming, Kick.com, streaming Kick vs Twitch, monetización Kick',
    canonical: 'https://yostreamer.com/setup/guia-streaming-kick-2025-actualizado-septiembre',
    ogImage: 'https://yostreamer.com/assets/kick_1755267725752.jpg',
    type: 'article',
    author: 'Equipo Setups de Streamers',
    datePublished: '2025-01-14',
    dateModified: '2025-01-14',
    wordCount: 1789
  },
  'mejor-webcam-streaming-2025-actualizado-septiembre': {
    title: 'Mejor webcam para streaming 2025: Guía completa de compra [Actualizado] (Septiembre 2025) | Setups de Streamers',
    description: 'Descubre las mejores webcams para streaming en 2025. Comparativa completa: Logitech C920, C922, Brio 4K, Sony ZV-1 y alternativas económicas.',
    keywords: 'mejor webcam streaming, webcam para streaming, Logitech C920, cámara streaming',
    canonical: 'https://yostreamer.com/setup/mejor-webcam-streaming-2025-actualizado-septiembre',
    ogImage: 'https://yostreamer.com/assets/webcam_1755267809270.jpg',
    type: 'article',
    author: 'Equipo Setups de Streamers',
    datePublished: '2025-01-14',
    dateModified: '2025-01-14',
    wordCount: 2147
  },
  'como-configurar-stream-perfecto-con-0-euros-inversion-actualizado-septiembre-2025': {
    title: 'Cómo Configurar el Stream Perfecto con 0€ de Inversión [Actualizado] (Septiembre 2025) | Setups de Streamers',
    description: '¿Stream profesional sin gastar un euro? Te mostramos cómo configurar un setup de streaming perfecto utilizando solo software gratuito, optimización de hardware existente, overlays gratis y música sin copyright.',
    keywords: 'software gratuito streaming, optimización hardware existente, overlays gratis, música sin copyright, streaming gratis, setup streaming 0 euros',
    canonical: 'https://yostreamer.com/setup/como-configurar-stream-perfecto-con-0-euros-inversion-actualizado-septiembre-2025',
    ogImage: 'https://yostreamer.com/assets/IMG_0027_1756973079331.png',
    type: 'article',
    author: 'Equipo Setups de Streamers',
    datePublished: '2025-01-15',
    dateModified: '2025-01-15',
    wordCount: 4987
  },
  'la-biblia-del-audio-para-streamers-microfonos-configuracion-procesamiento-septiembre-2025': {
    title: 'La Biblia del Audio para Streamers: Micrófonos, Configuración y Procesamiento [Actualizado] (Septiembre 2025) | Setups de Streamers',
    description: 'Guía definitiva de audio para streaming: comparativa completa de micrófonos por precio, configuración avanzada de filtros OBS, VoiceMeeter, RTX Voice/Krisp y procesamiento profesional de audio.',
    keywords: 'comparativa micrófonos precio, configuración filtros audio, OBS Audio, VoiceMeeter, RTX Voice, Krisp, audio streaming profesional',
    canonical: 'https://yostreamer.com/setup/la-biblia-del-audio-para-streamers-microfonos-configuracion-procesamiento-septiembre-2025',
    ogImage: 'https://yostreamer.com/assets/IMG_0029_1757063482117.jpeg',
    type: 'article',
    author: 'Equipo Setups de Streamers',
    datePublished: '2025-01-15',
    dateModified: '2025-01-15',
    wordCount: 5248
  },
  'streaming-desde-consola-ps5-xbox-series-switch-guia-maestra-septiembre-2025': {
    title: 'Streaming desde Consola: PS5/Xbox Series/Switch - Guía Maestra [Actualizado] (Septiembre 2025) | Setups de Streamers',
    description: 'Guía completa para streaming desde PS5, Xbox Series X/S y Nintendo Switch. Configuración paso a paso, capturadoras recomendadas, setup completo y optimizaciones específicas por consola.',
    keywords: 'streaming PS5, streaming Xbox Series, streaming Nintendo Switch, capturadora gaming, streaming consola, setup streaming PS5',
    canonical: 'https://yostreamer.com/setup/streaming-desde-consola-ps5-xbox-series-switch-guia-maestra-septiembre-2025',
    ogImage: 'https://yostreamer.com/assets/IMG_0031_1757144351728.jpeg',
    type: 'article',
    author: 'Equipo Setups de Streamers',
    datePublished: '2025-01-16',
    dateModified: '2025-01-16',
    wordCount: 5647
  },
  'analisis-500-streamers-que-separa-a-los-que-triunfan-septiembre-2025': {
    title: 'Análisis de 500 Streamers: Qué Separa a los que Triunfan [Actualizado] (Septiembre 2025) | Setups de Streamers',
    description: 'Estudio completo de 500 streamers exitosos vs no exitosos. Descubre los patrones exactos de equipamiento, estrategias de contenido, métricas y diferencias técnicas que determinan el éxito en streaming.',
    keywords: 'análisis streamers exitosos, cómo triunfar en streaming, estrategias streaming exitoso, métricas streaming, crecimiento en Twitch',
    canonical: 'https://yostreamer.com/setup/analisis-500-streamers-que-separa-a-los-que-triunfan-septiembre-2025',
    ogImage: 'https://yostreamer.com/assets/IMG_0032_1757402189424.jpeg',
    type: 'article',
    author: 'Equipo Setups de Streamers',
    datePublished: '2025-01-18',
    dateModified: '2025-01-18',
    wordCount: 6845
  },
  'iniciate-en-el-stream-gratis-como-empezar-en-twitch-septiembre-2025': {
    title: 'Iníciate en el Stream gratis: Cómo empezar en Twitch [Actualizado] (Septiembre 2025) | Setups de Streamers',
    description: 'Guía completa para empezar a hacer streaming en Twitch desde cero y GRATIS. Configuración paso a paso, software gratuito, primeros pasos y todo lo que necesitas para tu primer stream exitoso.',
    keywords: 'como empezar en twitch, streaming gratis, primer stream twitch, configurar twitch streaming, streaming para principiantes, twitch tutorial español',
    canonical: 'https://yostreamer.com/setup/iniciate-en-el-stream-gratis-como-empezar-en-twitch-septiembre-2025',
    ogImage: 'https://yostreamer.com/assets/IMG_0039_1757444106030.webp',
    type: 'article',
    author: 'Equipo Setups de Streamers',
    datePublished: '2025-01-19',
    dateModified: '2025-01-19',
    wordCount: 5892
  },
  'de-0-a-1000-euros-mes-streaming-guia-definitiva-monetizar-pasion-septiembre-2025': {
    title: 'De 0 a 1000€/mes STREAMING: La Guía Definitiva para Monetizar tu Pasión [Actualizado] (Septiembre 2025) | Setups de Streamers',
    description: 'Sistema probado para generar 1000€/mes con streaming. Desde tu primer euro hasta escalar tu canal como negocio rentable. Sin inversión inicial, resultados en 90 días con estrategias de monetización reales.',
    keywords: 'monetizar streaming, ganar dinero streaming, twitch afiliado, ingresos streaming, sponsors streaming, streaming como negocio',
    canonical: 'https://yostreamer.com/setup/de-0-a-1000-euros-mes-streaming-guia-definitiva-monetizar-pasion-septiembre-2025',
    ogImage: 'https://yostreamer.com/assets/m_1757572774674.webp',
    type: 'article',
    author: 'Equipo Setups de Streamers',
    datePublished: '2025-01-20',
    dateModified: '2025-01-20',
    wordCount: 7234
  },
  'configurar-obs-studio-2025-guia-completa-actualizado-septiembre': {
    title: 'Cómo configurar OBS Studio 2025: Guía Completa en 10 minutos [Actualizado] (Septiembre 2025) | Setups de Streamers',
    description: 'Aprende a configurar OBS Studio desde cero en 2025. Guía paso a paso con configuraciones óptimas para streaming, grabación, escenas, filtros y troubleshooting. Incluye PDF descargable.',
    keywords: 'OBS Studio 2025, configurar OBS, streaming software, OBS configuración, streaming setup, OBS guía, broadcast software',
    canonical: 'https://yostreamer.com/setup/configurar-obs-studio-2025-guia-completa-actualizado-septiembre',
    ogImage: 'https://yostreamer.com/assets/obs_1756060400861.png',
    type: 'article',
    author: 'Equipo Setups de Streamers',
    datePublished: '2025-01-14',
    dateModified: '2025-01-14',
    wordCount: 5847
  },
  'obs-pantalla-negra-soluciones-actualizado-septiembre-2025': {
    title: 'OBS pantalla negra: 7 soluciones INMEDIATAS que funcionan [Actualizado] (Septiembre 2025) | Setups de Streamers',
    description: '¿Tu OBS muestra pantalla negra? Aquí tienes 7 soluciones inmediatas y efectivas para arreglar el problema de pantalla negra en OBS Studio. Guía completa paso a paso.',
    keywords: 'OBS pantalla negra, arreglar OBS, soluciones OBS, OBS no funciona, pantalla negra streaming, problemas OBS Studio',
    canonical: 'https://yostreamer.com/setup/obs-pantalla-negra-soluciones-actualizado-septiembre-2025',
    ogImage: 'https://yostreamer.com/assets/obsblack_1756103395864.jpg',
    type: 'article',
    author: 'Equipo Setups de Streamers',
    datePublished: '2025-01-14',
    dateModified: '2025-01-14',
    wordCount: 2847
  },
};

const homeSEOData: SEOData = {
  title: 'Setups de Streamers: Guías Futuristas en Español',
  description: 'Análisis técnico completo del equipamiento profesional de los streamers más famosos en español. Comparamos micrófonos, cámaras, PC gaming, iluminación y todo el hardware que usan para sus directos.',
  keywords: 'setup de streaming, streamers famosos, equipo streaming, guías en español, Ibai Llanos, ElXokas, IlloJuan, Coscu, TheGrefg',
  canonical: 'https://yostreamer.com/',
  ogImage: 'https://yostreamer.com/og-default.jpg',
  type: 'website'
};

export function getSEOData(path: string): SEOData {
  // Handle homepage
  if (path === '/' || path === '') {
    return homeSEOData;
  }
  
  // Handle setup pages
  const setupMatch = path.match(/^\/setup\/(.+)$/);
  if (setupMatch) {
    const slug = setupMatch[1];
    return postSEOData[slug] || homeSEOData;
  }
  
  // Default fallback
  return homeSEOData;
}

export function injectSEOToHTML(html: string, seoData: SEOData): string {
  // Add preload hint for the hero image if it's not the homepage
  if (seoData.ogImage && seoData.ogImage !== 'https://yostreamer.com/og-default.jpg') {
    // Extract the actual image path from the og image URL
    const imagePath = seoData.ogImage.replace('https://yostreamer.com', '');
    // Add preload hint right after the critical CSS
    html = html.replace(
      '<!-- Preload critical hero images for LCP optimization -->',
      `<!-- Preload critical hero images for LCP optimization -->\n    <link rel="preload" as="image" href="${imagePath}" fetchpriority="high">`
    );
  }
  
  // Replace title
  html = html.replace(
    /<title>.*?<\/title>/,
    `<title>${seoData.title}</title>`
  );
  
  // Replace meta description
  html = html.replace(
    /<meta name="description" content=".*?">/,
    `<meta name="description" content="${seoData.description}">`
  );
  
  // Replace keywords
  html = html.replace(
    /<meta name="keywords" content=".*?">/,
    `<meta name="keywords" content="${seoData.keywords}">`
  );
  
  // Replace canonical URL - be more specific with the regex
  html = html.replace(
    /<link rel="canonical" href="https:\/\/yostreamer\.com\/" \/>/,
    `<link rel="canonical" href="${seoData.canonical}" />`
  );
  
  // Replace Open Graph title
  html = html.replace(
    /<meta property="og:title" content=".*?">/,
    `<meta property="og:title" content="${seoData.title}">`
  );
  
  // Replace Open Graph description
  html = html.replace(
    /<meta property="og:description" content=".*?">/,
    `<meta property="og:description" content="${seoData.description}">`
  );
  
  // Replace Open Graph URL
  html = html.replace(
    /<meta property="og:url" content=".*?">/,
    `<meta property="og:url" content="${seoData.canonical}">`
  );
  
  // Replace Open Graph image
  html = html.replace(
    /<meta property="og:image" content=".*?">/,
    `<meta property="og:image" content="${seoData.ogImage}">`
  );
  
  // Replace Open Graph type
  html = html.replace(
    /<meta property="og:type" content=".*?">/,
    `<meta property="og:type" content="${seoData.type}">`
  );
  
  // Replace Twitter title
  html = html.replace(
    /<meta name="twitter:title" content=".*?">/,
    `<meta name="twitter:title" content="${seoData.title}">`
  );
  
  // Replace Twitter description
  html = html.replace(
    /<meta name="twitter:description" content=".*?">/,
    `<meta name="twitter:description" content="${seoData.description}">`
  );
  
  // Replace Twitter URL
  html = html.replace(
    /<meta name="twitter:url" content=".*?">/,
    `<meta name="twitter:url" content="${seoData.canonical}">`
  );
  
  // Replace Twitter image
  html = html.replace(
    /<meta name="twitter:image" content=".*?">/,
    `<meta name="twitter:image" content="${seoData.ogImage}">`
  );
  
  // Add JSON-LD structured data for articles
  if (seoData.type === 'article') {
    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": seoData.title.replace(' | Setups de Streamers', ''),
      "description": seoData.description,
      "image": seoData.ogImage,
      "author": {
        "@type": "Organization",
        "name": seoData.author || "Equipo Setups de Streamers",
        "url": "https://yostreamer.com"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Setups de Streamers",
        "logo": {
          "@type": "ImageObject",
          "url": "https://yostreamer.com/logo.png"
        }
      },
      "datePublished": seoData.datePublished || "2025-01-14",
      "dateModified": seoData.dateModified || "2025-01-14",
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": seoData.canonical
      },
      "keywords": seoData.keywords,
      "articleSection": "Streaming Guides",
      "articleBody": seoData.description,
      "wordCount": seoData.wordCount || 1500,
      "about": [
        {
          "@type": "Thing",
          "name": "Streaming Equipment",
          "description": "Professional streaming hardware and software guides"
        },
        {
          "@type": "Thing", 
          "name": "Gaming Setup",
          "description": "Gaming and streaming setup configurations"
        }
      ],
      "mentions": [
        {
          "@type": "SoftwareApplication",
          "name": "OBS Studio",
          "operatingSystem": "Windows, macOS, Linux"
        },
        {
          "@type": "SoftwareApplication",
          "name": "Streamlabs",
          "operatingSystem": "Windows, macOS"
        }
      ],
      "inLanguage": "es-ES",
      "copyrightHolder": {
        "@type": "Organization",
        "name": "Setups de Streamers"
      }
    };

    // Add JSON-LD script tag
    html = html.replace(
      '</head>',
      `    <script type="application/ld+json">${JSON.stringify(jsonLd, null, 2)}</script>\n  </head>`
    );
  } else {
    // Website schema for homepage
    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "Setups de Streamers",
      "url": "https://yostreamer.com",
      "description": seoData.description,
      "publisher": {
        "@type": "Organization",
        "name": "Setups de Streamers",
        "logo": {
          "@type": "ImageObject",
          "url": "https://yostreamer.com/logo.png"
        }
      },
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://yostreamer.com/search?q={search_term_string}",
        "query-input": "required name=search_term_string"
      },
      "sameAs": [
        "https://twitter.com/setupsstreamers",
        "https://youtube.com/@setupsstreamers"
      ],
      "inLanguage": "es-ES",
      "about": [
        {
          "@type": "Thing",
          "name": "Streaming Equipment Reviews",
          "description": "Professional streaming hardware reviews and guides in Spanish"
        },
        {
          "@type": "Thing",
          "name": "Spanish Streamers",
          "description": "Equipment analysis of top Spanish-speaking streamers"
        }
      ]
    };

    html = html.replace(
      '</head>',
      `    <script type="application/ld+json">${JSON.stringify(jsonLd, null, 2)}</script>\n  </head>`
    );
  }

  // Add server-side H1 heading for SEO crawlers
  const h1Content = seoData.title.includes('Setup de streaming') 
    ? seoData.title 
    : 'Setups de Streamers: Guías Profesionales en Español';
  
  html = html.replace(
    '<div id="root"></div>',
    `<!-- Server-side H1 for SEO crawlers -->\n    <h1 style="position: absolute; left: -9999px; width: 1px; height: 1px; overflow: hidden;">${h1Content}</h1>\n    <div id="root"></div>`
  );
  
  return html;
}