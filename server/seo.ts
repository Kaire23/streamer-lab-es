// SEO data for server-side rendering
// This file provides SEO meta tags for each route to improve initial HTML response

export interface SEOData {
  title: string;
  description: string;
  keywords: string;
  canonical: string;
  ogImage: string;
  type: 'website' | 'article';
}

// Post data for SEO (synchronized with client/src/data/posts.ts)
const postSEOData: Record<string, SEOData> = {
  'ibai-llanos': {
    title: 'Setup de streaming de Ibai Llanos (2025): Guía completa | Setups de Streamers',
    description: 'Descubre el setup completo de Ibai Llanos: micrófono Shure SM7B, cámara Sony, PC gaming de alta gama e iluminación profesional para streaming de máxima calidad.',
    keywords: 'setup de streaming, Ibai Llanos, equipo streamer, micrófono Shure SM7B, cámara Sony',
    canonical: 'https://yostreamer.com/setup/ibai-llanos',
    ogImage: 'https://yostreamer.com/assets/ibai-llanos-hero.jpg',
    type: 'article'
  },
  'elxokas': {
    title: 'Setup de streaming de ElXokas (2025): Potencia y estilo | Setups de Streamers',
    description: 'Análisis detallado del setup gaming de ElXokas: Stream Deck profesional, micrófono dinámico, cámara de alta definición y PC potente para gaming competitivo de élite.',
    keywords: 'ElXokas, setup streamer, audio profesional, stream deck',
    canonical: 'https://yostreamer.com/setup/elxokas',
    ogImage: 'https://yostreamer.com/assets/elxocas-hero.jpg',
    type: 'article'
  },
  'illojuan': {
    title: 'Setup de streaming de illoJuan (2025): Calidez y calidad | Setups de Streamers',
    description: 'El setup único de IlloJuan: ambiente acogedor con iluminación cálida, micrófono de condensador profesional, cámara Sony y configuración optimizada para just chatting y gaming.',
    keywords: 'illoJuan, setup de streaming, Elgato, Sony',
    canonical: 'https://yostreamer.com/setup/illojuan',
    ogImage: 'https://yostreamer.com/assets/illojuan-hero.jpg',
    type: 'article'
  },
  'thegrefg': {
    title: 'Setup de streaming de TheGrefg (2025): Estética y rendimiento | Setups de Streamers',
    description: 'Setup extremo de TheGrefg: iluminación LED roja espectacular, múltiples cámaras 4K, micrófono broadcast, PC gaming RTX de última generación y periféricos de competición profesional.',
    keywords: 'TheGrefg, setup gamer, RTX, cámara 4K',
    canonical: 'https://yostreamer.com/setup/thegrefg',
    ogImage: 'https://yostreamer.com/assets/thegrefg-hero.jpg',
    type: 'article'
  },
  'coscu': {
    title: 'Setup de streaming de Coscu (2025): Energía y presencia | Setups de Streamers',
    description: 'El setup carismático de Coscu: micrófono Shure SM7B, iluminación RGB multicolor dinámica, cámara profesional y equipo gaming argentino optimizado para variety content y entretenimiento.',
    keywords: 'Coscu, setup streaming, micrófono, iluminación RGB',
    canonical: 'https://yostreamer.com/setup/coscu',
    ogImage: 'https://yostreamer.com/assets/coscu-hero.jpg',
    type: 'article'
  },
  'configurar-obs-studio-2025-guia-completa': {
    title: 'Cómo configurar OBS Studio 2025: Guía Completa en 10 minutos | Setups de Streamers',
    description: 'Aprende a configurar OBS Studio desde cero en 2025. Guía paso a paso con configuraciones óptimas para streaming, grabación, escenas, filtros y troubleshooting. Incluye PDF descargable.',
    keywords: 'OBS Studio 2025, configurar OBS, streaming software, OBS configuración, streaming setup, OBS guía, broadcast software',
    canonical: 'https://yostreamer.com/setup/configurar-obs-studio-2025-guia-completa',
    ogImage: 'https://yostreamer.com/assets/obs_1756060400861.png',
    type: 'article'
  }
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