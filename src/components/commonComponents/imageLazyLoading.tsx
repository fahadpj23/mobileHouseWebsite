import { FC, useMemo } from "react";
import LazyLoad from "react-lazyload";

interface Props {
  src: string;
  alt: string;
  fill?: boolean;
  placeholderSrc?: string; // Optional placeholder image
  threshold?: number; // Configurable threshold
}

const LazyImage: FC<Props> = ({
  src,
  alt,
  fill = false,
  placeholderSrc,
  threshold = 100,
}) => {
  const imageClass = useMemo(
    () => `${fill ? "object-fill" : "object-contain"} h-full w-full`,
    [fill]
  );

  const placeholder = useMemo(
    () => (
      <img
        src={placeholderSrc || src}
        alt={alt}
        className={imageClass}
        loading="lazy"
      />
    ),
    [placeholderSrc, src, alt, imageClass]
  );

  const actualImage = useMemo(
    () => (
      <img
        src={src}
        alt={alt}
        className={imageClass}
        loading="lazy" // Native lazy loading as fallback
      />
    ),
    [src, alt, imageClass]
  );

  return (
    <LazyLoad
      offset={threshold}
      className="h-full w-full"
      placeholder={placeholder}
      once // Only lazy load once
      debounce={300} // Debounce scroll events for performance
    >
      {actualImage}
    </LazyLoad>
  );
};

export default LazyImage;
