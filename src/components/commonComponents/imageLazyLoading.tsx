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
        src={`/.netlify/images?url=${placeholderSrc || src}&w=600&fm=webp `}
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
        src={`/.netlify/images?url=${src}&w=600&fm=webp `}
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
