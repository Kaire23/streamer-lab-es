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

  // Generate srcset for responsive images
  const srcSet = useMemo(() => {
    if (!responsive || !imageName) return undefined;
    
    const sizes = [378, 405, 1120, 1200, 1706, 1900];
    return sizes.map(size => {
      const ext = src.includes('.webp') ? 'webp' : 'jpg';
      return `${src.replace(/\.(jpg|jpeg|png|webp|avif)$/, `-${size}w.${ext}`)} ${size}w`;
    }).join(', ');
  }, [src, imageName, responsive]);

  // Default sizes attribute for responsive images
  const defaultSizes = sizes || '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 378px';

  return (
    <picture>
      {/* Modern format sources */}
      {responsive && imageName && (
        <>
          <source
            type="image/avif"
            srcSet={srcSet?.replace(/\.jpg/g, '.avif').replace(/\.webp/g, '.avif')}
            sizes={defaultSizes}
          />
          <source
            type="image/webp"
            srcSet={srcSet?.replace(/\.jpg/g, '.webp')}
            sizes={defaultSizes}
          />
        </>
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