import React from "react";
import { Helmet } from "react-helmet-async";

interface SEOProps {
  title: string;
  description: string;
  image?: string;
  canonicalPath?: string;
  type?: "website" | "article";
  jsonLd?: object;
  keywords?: string[];
}

const SEO: React.FC<SEOProps> = ({
  title,
  description,
  image,
  canonicalPath = "/",
  type = "website",
  jsonLd,
  keywords,
}) => {
  const siteUrl = import.meta.env.VITE_SITE_URL || (typeof window !== "undefined" ? window.location.origin : "");
  const canonical = new URL(canonicalPath, siteUrl).toString();

  return (
    <Helmet prioritizeSeoTags>
      <html lang="es" />
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords?.length ? <meta name="keywords" content={keywords.join(", ")} /> : null}
      <link rel="canonical" href={canonical} />
      
      {/* Open Graph Meta Tags */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonical} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:site_name" content="Setups de Streamers" />
      <meta property="og:locale" content="es_ES" />
      {image ? <meta property="og:image" content={new URL(image, siteUrl).toString()} /> : null}
      {image ? <meta property="og:image:alt" content={title} /> : null}
      
      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@yostreamer" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {image ? <meta name="twitter:image" content={new URL(image, siteUrl).toString()} /> : null}
      
      {/* Additional SEO Meta Tags */}
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="author" content="Equipo Setups de Streamers" />
      <meta name="publisher" content="Setups de Streamers" />
      <meta name="coverage" content="Worldwide" />
      <meta name="distribution" content="Global" />
      <meta name="rating" content="General" />
      <meta name="revisit-after" content="7 days" />
      
      {/* Structured Data */}
      {jsonLd ? (
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      ) : null}
    </Helmet>
  );
};

export default SEO;
