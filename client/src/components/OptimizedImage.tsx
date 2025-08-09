import { ImgHTMLAttributes, useMemo } from 'react';

interface OptimizedImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'loading'> {
  src: string;
  alt: string;
  priority?: boolean;
  sizes?: string;
  width?: string | number;
  height?: string | number;
  className?: string;
  responsive?: boolean;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({ 
  src, 
  alt, 
  priority = false, 
  sizes,
  width,
  height,
  className,
  responsive = true,
  ...props 
}) => {
  // Generate optimized image paths
  const imageName = useMemo(() => {
    const match = src.match(/\/([^/]+)\.(jpg|jpeg|png|webp|avif)$/);
    return match ? match[1] : '';
  }, [src]);

  // Generate srcset for responsive images - simplified for desktop performance
  const srcSet = useMemo(() => {
    if (!responsive || !imageName) return undefined;
    
    // Reduced sizes for better desktop performance
    const sizes = [378, 756];
    return sizes.map(size => {
      const ext = src.includes('.webp') ? 'webp' : 'jpg';
      return `${src.replace(/\.(jpg|jpeg|png|webp|avif)$/, `-${size}w.${ext}`)} ${size}w`;
    }).join(', ');
  }, [src, imageName, responsive]);

  // Default sizes attribute optimized for desktop performance
  const defaultSizes = sizes || '(max-width: 768px) 100vw, 378px';

  return (
    <picture>
      {/* Simplified modern format sources for desktop performance */}
      {responsive && imageName && (
        <source
          type="image/webp"
          srcSet={srcSet?.replace(/\.jpg/g, '.webp')}
          sizes={defaultSizes}
        />
      )}
      
      {/* Fallback img tag */}
      <img
        src={src}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        srcSet={responsive ? srcSet : undefined}
        sizes={responsive ? defaultSizes : undefined}
        width={width || (responsive ? undefined : 378)}
        height={height || (responsive ? undefined : 213)}
        className={className}
        {...({ fetchpriority: priority ? "high" : "auto" } as React.ImgHTMLAttributes<HTMLImageElement>)}
        {...props}
      />
    </picture>
  );
};

export default OptimizedImage;