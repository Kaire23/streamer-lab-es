import { useEffect } from 'react';

/**
 * Performance Optimizer Component
 * Implements various performance optimizations for Core Web Vitals
 */
export const PerformanceOptimizer = () => {
  useEffect(() => {
    // Preconnect to external domains
    const preconnectDomains = [
      'https://www.googletagmanager.com',
      'https://www.google-analytics.com',
      'https://fonts.googleapis.com',
    ];

    preconnectDomains.forEach(domain => {
      const link = document.createElement('link');
      link.rel = 'preconnect';
      link.href = domain;
      document.head.appendChild(link);
    });

    // Lazy load images when they come into viewport
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement;
            if (img.dataset.src) {
              img.src = img.dataset.src;
              img.removeAttribute('data-src');
              imageObserver.unobserve(img);
            }
          }
        });
      });

      // Observe all images with data-src
      document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
      });
    }

    // Prefetch next likely navigation
    const prefetchLinks = () => {
      const links = document.querySelectorAll('a[href^="/"]');
      links.forEach(link => {
        link.addEventListener('mouseenter', () => {
          const href = link.getAttribute('href');
          if (href) {
            const prefetchLink = document.createElement('link');
            prefetchLink.rel = 'prefetch';
            prefetchLink.href = href;
            document.head.appendChild(prefetchLink);
          }
        }, { once: true });
      });
    };

    prefetchLinks();

    // Clean up function
    return () => {
      // Cleanup if needed
    };
  }, []);

  return null;
};

export default PerformanceOptimizer;