import { FC } from "react";
import LazyLoad from "react-lazyload";

interface props {
  src: any;
  alt: string;
  fill?: boolean;
}

const LazyImage: FC<props> = ({ src, alt, fill = false }) => {
  return (
    <LazyLoad offset={100} className="h-full w-full">
      <img
        src={src}
        alt={alt}
        className={`${fill ? "object-fill" : "object-contain"} h-full w-full`}
      />
    </LazyLoad>
  );
};
export default LazyImage;
