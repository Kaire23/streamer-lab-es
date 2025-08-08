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
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      {image ? <meta property="og:image" content={new URL(image, siteUrl).toString()} /> : null}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {image ? <meta name="twitter:image" content={new URL(image, siteUrl).toString()} /> : null}
      {jsonLd ? (
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      ) : null}
    </Helmet>
  );
};

export default SEO;
