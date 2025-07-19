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
        <img
          src={`http://ec2-3-110-122-137.ap-south-1.compute.amazonaws.com:9000${src}`}
          alt={alt}
          className={`${fill ? "object-fill" : "object-contain"} h-full w-full`}
        />
      }
    >
      <img
        src={`http://ec2-3-110-122-137.ap-south-1.compute.amazonaws.com:9000${src}`}
        alt={alt}
        className={`${fill ? "object-fill" : "object-contain"} h-full w-full`}
      />
    </LazyLoad>
  );
};
export default ServerLazyImage;
