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

  // Simple approach - just use the original image
  const srcSet = useMemo(() => {
    // Don't generate complex srcsets, just use the original image
    return undefined;
  }, []);

  // Default sizes attribute optimized for desktop performance
  const defaultSizes = sizes || '(max-width: 768px) 100vw, 378px';

  return (
    <img
      src={src}
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      {...({ fetchpriority: priority ? "high" : "auto" } as React.ImgHTMLAttributes<HTMLImageElement>)}
      decoding="async"
      width={width}
      height={height}
      className={className}
      {...props}
    />
  );
};

export default OptimizedImage;