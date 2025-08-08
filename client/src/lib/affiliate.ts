export const AMAZON_TAG = "yostreamer-21"; // Reemplaza con tu tag de afiliado de Amazon.es

export const amazonSearchUrl = (query: string) =>
  `https://www.amazon.es/s?k=${encodeURIComponent(query)}&tag=${AMAZON_TAG}`;

export const amazonProductUrl = (asinOrSlug: string) =>
  `https://www.amazon.es/dp/${asinOrSlug}?tag=${AMAZON_TAG}`;
