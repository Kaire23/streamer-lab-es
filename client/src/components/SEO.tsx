import { Helmet } from "react-helmet-async";

interface SEOProps {
  title: string;
  description: string;
  image?: string;
  canonicalPath?: string;
  type?: "website" | "article";
  jsonLd?: object;
  keywords?: string[];
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
}

const SEO = ({
  title,
  description,
  image,
  canonicalPath = "/",
  type = "website",
  jsonLd,
  keywords,
  author = "Equipo YoStreamer",
  publishedTime,
  modifiedTime,
}: SEOProps) => {
  const getOrigin = () => {
    if (typeof window !== "undefined") {
      return window.location.origin;
    }
    return import.meta.env.VITE_SITE_URL || "https://yostreamer.com";
  };
  
  const origin = getOrigin();
  const safePath = canonicalPath || "/";
  
  const canonical = safePath.startsWith('http') 
    ? safePath 
    : origin + (safePath.startsWith('/') ? safePath : '/' + safePath);
  
  const fullImageUrl = image 
    ? (image.startsWith('http') ? image : origin + image)
    : `${origin}/og-default.jpg`;
  
  const siteName = "YoStreamer - Guías de Streaming en Español";
  const twitterHandle = "@yostreamer";
  
  const defaultKeywords = [
    "streaming en español",
    "streamers españoles", 
    "guía de OBS",
    "setup streaming",
    "equipamiento streaming",
    "Twitch España",
    "streaming profesional",
    "tutoriales streaming español"
  ];
  
  const allKeywords = keywords 
    ? Array.from(new Set([...keywords, ...defaultKeywords]))
    : defaultKeywords;

  return (
    <Helmet prioritizeSeoTags>
      <html lang="es" />
      <title>{title}</title>
      
      <meta name="description" content={description} />
      <meta name="keywords" content={allKeywords.join(", ")} />
      <meta name="author" content={author} />
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow" />
      <meta name="google" content="notranslate" />
      <meta name="content-language" content="es" />
      
      <link rel="canonical" href={canonical} />
      <link rel="alternate" hrefLang="es" href={canonical} />
      <link rel="alternate" hrefLang="es-ES" href={canonical} />
      <link rel="alternate" hrefLang="es-MX" href={canonical} />
      <link rel="alternate" hrefLang="es-AR" href={canonical} />
      <link rel="alternate" hrefLang="x-default" href={canonical} />
      
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonical} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:image" content={fullImageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={title} />
      <meta property="og:locale" content="es_ES" />
      <meta property="og:locale:alternate" content="es_MX" />
      <meta property="og:locale:alternate" content="es_AR" />
      
      {type === "article" && publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {type === "article" && modifiedTime && (
        <meta property="article:modified_time" content={modifiedTime} />
      )}
      {type === "article" && (
        <meta property="article:author" content={author} />
      )}
      {type === "article" && (
        <meta property="article:section" content="Streaming" />
      )}
      {type === "article" && allKeywords.slice(0, 5).map((tag, i) => (
        <meta key={i} property="article:tag" content={tag} />
      ))}
      
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={twitterHandle} />
      <meta name="twitter:creator" content={twitterHandle} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImageUrl} />
      <meta name="twitter:image:alt" content={title} />
      
      {jsonLd && (
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      )}
    </Helmet>
  );
};

export default SEO;
