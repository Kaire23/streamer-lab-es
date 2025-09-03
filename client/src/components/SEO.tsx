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
  const origin = typeof window !== "undefined" ? window.location.origin : "";
  const canonical = origin + canonicalPath;
  const fullImageUrl = image ? origin + image : `${origin}/og-default.jpg`;

  return (
    <Helmet prioritizeSeoTags>
      <html lang="es" />
      <title>{title}</title>

      
      {jsonLd ? (
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      ) : null}
    </Helmet>
  );
};

export default SEO;
