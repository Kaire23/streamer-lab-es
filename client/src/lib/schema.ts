import { Post } from "@/data/posts";

// Generate JSON-LD schema markup for different post types
export const generatePostSchema = (post: Post, slug: string) => {
  const baseUrl = "https://yostreamer.com";
  const postUrl = `${baseUrl}/setup/${slug}`;
  const imageUrl = post.coverImage.startsWith('http') ? post.coverImage : `${baseUrl}${post.coverImage}`;
  
  // Check if this is a streamer profile or technical guide
  const isStreamerProfile = isStreamerPost(post.title, slug);
  const isTechnicalGuide = isTechnicalPost(post.title, post.keywords);
  
  if (isStreamerProfile) {
    return generateStreamerSchema(post, postUrl, imageUrl, slug);
  } else if (isTechnicalGuide) {
    return generateTechnicalGuideSchema(post, postUrl, imageUrl);
  } else {
    return generateArticleSchema(post, postUrl, imageUrl);
  }
};

// Check if post is about a streamer profile
const isStreamerPost = (title: string, slug: string): boolean => {
  const streamerNames = ['ibai', 'elxokas', 'illojuan', 'thegrefg', 'coscu', 'auron', 'elrubius', 'cristinini', 'alexby', 'luzu', 'lolito', 'juansguarnizo', 'elmariana', 'arigameplays', 'rivers', 'quackity', 'slakun10', 'staryuuki', 'jelty'];
  return streamerNames.some(name => slug.includes(name) || title.toLowerCase().includes(name));
};

// Check if post is a technical guide
const isTechnicalPost = (title: string, keywords: string[]): boolean => {
  const techKeywords = ['obs', 'configurar', 'setup', 'webcam', 'micrófono', 'streaming', 'cpu', 'trucos', 'guía'];
  return techKeywords.some(keyword => 
    title.toLowerCase().includes(keyword) || 
    keywords.some(k => k.toLowerCase().includes(keyword))
  );
};

// Generate schema for streamer profiles
const generateStreamerSchema = (post: Post, postUrl: string, imageUrl: string, slug: string) => {
  const streamerName = extractStreamerName(post.title, slug);
  
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${postUrl}#article`,
        "headline": post.title,
        "description": post.excerpt,
        "image": {
          "@type": "ImageObject",
          "url": imageUrl,
          "width": 800,
          "height": 450
        },
        "datePublished": post.date,
        "dateModified": post.date,
        "author": {
          "@type": "Organization",
          "name": "Setups de Streamers",
          "url": "https://yostreamer.com"
        },
        "publisher": {
          "@type": "Organization",
          "name": "Setups de Streamers",
          "logo": {
            "@type": "ImageObject",
            "url": "https://yostreamer.com/og-default.jpg"
          }
        },
        "mainEntityOfPage": postUrl,
        "about": {
          "@type": "Person",
          "name": streamerName,
          "jobTitle": "Content Creator",
          "worksFor": "Twitch",
          "description": post.bio
        },
        "mentions": post.setup.flatMap(category => 
          category.items.map(item => ({
            "@type": "Product",
            "name": item.name,
            "description": item.note || `${item.name} usado por ${streamerName}`
          }))
        ),
        "keywords": post.keywords.join(", "),
        "articleSection": "Gaming Equipment",
        "inLanguage": "es-ES"
      },
      {
        "@type": "Person",
        "@id": `${postUrl}#person`,
        "name": streamerName,
        "jobTitle": "Content Creator",
        "worksFor": "Twitch",
        "description": post.bio,
        "image": imageUrl,
        "url": postUrl,
        "sameAs": [`https://twitch.tv/${streamerName.toLowerCase()}`],
        "knowsAbout": ["Gaming", "Streaming", "Content Creation"],
        "hasOccupation": {
          "@type": "Occupation",
          "name": "Streamer",
          "occupationLocation": "Spain"
        }
      },
      generateBreadcrumbSchema(streamerName, postUrl),
      generateWebsiteSchema()
    ]
  };
};

// Generate schema for technical guides
const generateTechnicalGuideSchema = (post: Post, postUrl: string, imageUrl: string) => {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "HowTo",
        "@id": `${postUrl}#howto`,
        "name": post.title,
        "description": post.excerpt,
        "image": {
          "@type": "ImageObject",
          "url": imageUrl,
          "width": 800,
          "height": 450
        },
        "datePublished": post.date,
        "dateModified": post.date,
        "author": {
          "@type": "Organization",
          "name": "Setups de Streamers",
          "url": "https://yostreamer.com"
        },
        "publisher": {
          "@type": "Organization",
          "name": "Setups de Streamers",
          "logo": {
            "@type": "ImageObject",
            "url": "https://yostreamer.com/og-default.jpg"
          }
        },
        "mainEntityOfPage": postUrl,
        "about": {
          "@type": "SoftwareApplication",
          "name": "OBS Studio",
          "applicationCategory": "Streaming Software",
          "operatingSystem": "Windows, macOS, Linux"
        },
        "keywords": post.keywords.join(", "),
        "inLanguage": "es-ES",
        "totalTime": "PT10M",
        "supply": post.setup.flatMap(category => 
          category.items.map(item => ({
            "@type": "HowToSupply",
            "name": item.name
          }))
        ),
        "tool": [
          {
            "@type": "HowToTool",
            "name": "OBS Studio"
          },
          {
            "@type": "HowToTool", 
            "name": "Computadora"
          }
        ]
      },
      {
        "@type": "Article",
        "@id": `${postUrl}#article`,
        "headline": post.title,
        "description": post.excerpt,
        "image": imageUrl,
        "datePublished": post.date,
        "dateModified": post.date,
        "author": {
          "@type": "Organization",
          "name": "Setups de Streamers"
        },
        "publisher": {
          "@type": "Organization",
          "name": "Setups de Streamers",
          "logo": {
            "@type": "ImageObject",
            "url": "https://yostreamer.com/og-default.jpg"
          }
        },
        "mainEntityOfPage": postUrl,
        "articleSection": "Technical Guides",
        "keywords": post.keywords.join(", "),
        "inLanguage": "es-ES"
      },
      generateBreadcrumbSchema(post.title, postUrl),
      generateWebsiteSchema()
    ]
  };
};

// Generate schema for general articles
const generateArticleSchema = (post: Post, postUrl: string, imageUrl: string) => {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${postUrl}#article`,
        "headline": post.title,
        "description": post.excerpt,
        "image": {
          "@type": "ImageObject",
          "url": imageUrl,
          "width": 800,
          "height": 450
        },
        "datePublished": post.date,
        "dateModified": post.date,
        "author": {
          "@type": "Organization",
          "name": post.author || "Setups de Streamers",
          "url": "https://yostreamer.com"
        },
        "publisher": {
          "@type": "Organization",
          "name": "Setups de Streamers",
          "logo": {
            "@type": "ImageObject",
            "url": "https://yostreamer.com/og-default.jpg"
          }
        },
        "mainEntityOfPage": postUrl,
        "keywords": post.keywords.join(", "),
        "articleSection": "Streaming",
        "inLanguage": "es-ES",
        "about": {
          "@type": "Thing",
          "name": "Streaming Equipment"
        }
      },
      generateBreadcrumbSchema(post.title, postUrl),
      generateWebsiteSchema()
    ]
  };
};

// Generate breadcrumb schema
const generateBreadcrumbSchema = (title: string, postUrl: string) => {
  return {
    "@type": "BreadcrumbList",
    "@id": `${postUrl}#breadcrumb`,
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Inicio",
        "item": "https://yostreamer.com"
      },
      {
        "@type": "ListItem", 
        "position": 2,
        "name": "Setups",
        "item": "https://yostreamer.com/#setups"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": title,
        "item": postUrl
      }
    ]
  };
};

// Generate website schema
const generateWebsiteSchema = () => {
  return {
    "@type": "WebSite",
    "@id": "https://yostreamer.com#website",
    "url": "https://yostreamer.com",
    "name": "Setups de Streamers",
    "description": "La guía definitiva de equipamiento para streamers en español. Setups de Ibai, ElXokas, IlloJuan y más. Guías técnicas, reviews y configuraciones profesionales.",
    "publisher": {
      "@type": "Organization",
      "name": "Setups de Streamers",
      "logo": {
        "@type": "ImageObject",
        "url": "https://yostreamer.com/og-default.jpg"
      }
    },
    "inLanguage": "es-ES",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://yostreamer.com/search?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  };
};

// Extract streamer name from title or slug
const extractStreamerName = (title: string, slug: string): string => {
  const streamerMap: Record<string, string> = {
    'ibai': 'Ibai Llanos',
    'elxokas': 'ElXokas',
    'illojuan': 'IlloJuan',
    'thegrefg': 'TheGrefg',
    'coscu': 'Coscu',
    'auron': 'AuronPlay',
    'elrubius': 'ElRubius',
    'cristinini': 'CristiniNi',
    'alexby': 'AlexBy',
    'luzu': 'Luzu',
    'lolito': 'Lolito',
    'juansguarnizo': 'JuansGuarnizo',
    'elmariana': 'ElMariana',
    'arigameplays': 'AriGameplays',
    'rivers': 'Rivers',
    'quackity': 'Quackity',
    'slakun10': 'Kun Agüero',
    'staryuuki': 'Staryuuki',
    'jelty': 'Jelty'
  };
  
  for (const [key, name] of Object.entries(streamerMap)) {
    if (slug.includes(key) || title.toLowerCase().includes(key)) {
      return name;
    }
  }
  
  return "Streamer";
};

// Generate organization schema for the main website
export const generateOrganizationSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://yostreamer.com#organization",
    "name": "Setups de Streamers",
    "url": "https://yostreamer.com",
    "logo": "https://yostreamer.com/og-default.jpg",
    "description": "La guía definitiva de equipamiento para streamers en español",
    "foundingDate": "2025",
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "email": "hola@yostreamer.com"
    },
    "sameAs": [
      "https://yostreamer.com"
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Streaming Equipment Guides",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Streaming Setup Guides",
            "description": "Comprehensive guides for streaming equipment and configuration"
          }
        }
      ]
    }
  };
};