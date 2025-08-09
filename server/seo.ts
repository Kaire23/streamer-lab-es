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
    description: 'Descubre el equipo de streaming de Ibai: micrófono, cámara, iluminación, PC y periféricos para un directo de máxima calidad.',
    keywords: 'setup de streaming, Ibai Llanos, equipo streamer, micrófono Shure SM7B, cámara Sony',
    canonical: 'https://yostreamer.com/setup/ibai-llanos',
    ogImage: 'https://yostreamer.com/assets/ibai-llanos-hero.jpg',
    type: 'article'
  },
  'elxokas': {
    title: 'Setup de streaming de ElXokas (2025): Potencia y estilo | Setups de Streamers',
    description: 'Analizamos el setup de ElXokas: audio potente, cámaras nítidas y una iluminación dramática ideal para directos intensos.',
    keywords: 'ElXokas, setup streamer, audio profesional, stream deck',
    canonical: 'https://yostreamer.com/setup/elxokas',
    ogImage: 'https://yostreamer.com/assets/elxocas-hero.jpg',
    type: 'article'
  },
  'illojuan': {
    title: 'Setup de streaming de illoJuan (2025): Calidez y calidad | Setups de Streamers',
    description: 'El espacio de illoJuan combina un ambiente acogedor con equipo profesional: audio claro, buena luz y cámara confiable.',
    keywords: 'illoJuan, setup de streaming, Elgato, Sony',
    canonical: 'https://yostreamer.com/setup/illojuan',
    ogImage: 'https://yostreamer.com/assets/illojuan-hero.jpg',
    type: 'article'
  },
  'thegrefg': {
    title: 'Setup de streaming de TheGrefg (2025): Estética y rendimiento | Setups de Streamers',
    description: 'Configuración atrevida con iluminación roja, cámaras rápidas y un PC listo para juegos exigentes y directos largos.',
    keywords: 'TheGrefg, setup gamer, RTX, cámara 4K',
    canonical: 'https://yostreamer.com/setup/thegrefg',
    ogImage: 'https://yostreamer.com/assets/thegrefg-hero.jpg',
    type: 'article'
  },
  'coscu': {
    title: 'Setup de streaming de Coscu (2025): Energía y presencia | Setups de Streamers',
    description: 'Un setup que apuesta por el carisma: gran sonido, iluminación con personalidad y periféricos de alto rendimiento.',
    keywords: 'Coscu, setup streaming, micrófono, iluminación RGB',
    canonical: 'https://yostreamer.com/setup/coscu',
    ogImage: 'https://yostreamer.com/assets/coscu-hero.jpg',
    type: 'article'
  }
};

const homeSEOData: SEOData = {
  title: 'Setups de Streamers: Guías Futuristas en Español',
  description: 'Cada semana analizamos el setup de un streamer famoso: historia, curiosidades y enlaces a todo su equipo. Guías completas de Ibai, ElXokas, IlloJuan, Coscu y TheGrefg.',
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
  
  return html;
}