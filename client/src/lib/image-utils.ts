// Image optimization utilities for responsive loading

export const IMAGE_SIZES = {
  thumbnail: { width: 378, height: 213 },
  mobile: { width: 640, height: 360 },
  tablet: { width: 1024, height: 576 },
  desktop: { width: 1200, height: 675 },
  hero: { width: 1706, height: 960 }
};

export const generateSrcSet = (baseSrc: string): string => {
  // For now, return the base image as we optimize server-side
  return baseSrc;
};

export const getResponsiveSizes = (): string => {
  return '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 378px';
};

// Preload critical images
export const preloadImage = (src: string) => {
  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = 'image';
  link.href = src;
  link.setAttribute('fetchpriority', 'high');
  document.head.appendChild(link);
};