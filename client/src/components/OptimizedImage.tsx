import { ImgHTMLAttributes } from 'react';

interface OptimizedImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'loading'> {
  src: string;
  alt: string;
  priority?: boolean;
  sizes?: string;
  width?: string | number;
  height?: string | number;
  className?: string;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({ 
  src, 
  alt, 
  priority = false, 
  sizes,
  width,
  height,
  className,
  ...props 
}) => {
  return (
    <img
      src={src}
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      sizes={sizes}
      width={width}
      height={height}
      className={className}
      {...({ fetchpriority: priority ? "high" : "auto" } as React.ImgHTMLAttributes<HTMLImageElement>)}
      {...props}
    />
  );
};

export default OptimizedImage;