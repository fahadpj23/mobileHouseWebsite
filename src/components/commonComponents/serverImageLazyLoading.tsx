import { FC } from "react";
import LazyLoad from "react-lazyload";

interface props {
  src: any;
  alt: string;
  fill?: boolean;
}

const ServerLazyImage: FC<props> = ({ src, alt, fill = false }) => {
  return (
    <LazyLoad
      offset={100}
      className="h-full w-full"
      placeholder={
        // <img
        //   src={src}
        //   alt={alt}
        //   className={`${fill ? "object-fill" : "object-contain"} h-full w-full`}
        // />
        <img
          src={`https://mobilehouse.in/.netlify/functions/get-image?key=${src}&w=800&q=75&fm=webp`}
          srcSet={`https://mobilehouse.in/.netlify/functions/get-image?key=${src}&w=400&q=75&fm=webp 400w,
             https://mobilehouse.in/.netlify/functions/get-image?key=${src}&w=800&q=75&fm=webp 800w,
             https://mobilehouse.in/.netlify/functions/get-image?key=${src}&w=1200&q=75&fm=webp 1200w`}
          sizes="(max-width: 600px) 400px, (max-width: 1000px) 800px, 1200px"
          alt={alt}
          className={`${fill ? "object-fill" : "object-contain"} h-full w-full`}
        />
      }
    >
      <img
        src={`https://mobilehouse.in/.netlify/functions/get-image?key=${src}&w=800&q=75&fm=webp`}
        srcSet={`https://mobilehouse.in/.netlify/functions/get-image?key=${src}&w=400&q=75&fm=webp 400w,
             https://mobilehouse.in/.netlify/functions/get-image?key=${src}&w=800&q=75&fm=webp 800w,
             https://mobilehouse.in/.netlify/functions/get-image?key=${src}&w=1200&q=75&fm=webp 1200w`}
        sizes="(max-width: 600px) 400px, (max-width: 1000px) 800px, 1200px"
        alt={alt}
        className={`${fill ? "object-fill" : "object-contain"} h-full w-full`}
      />
    </LazyLoad>
  );
};
export default ServerLazyImage;
