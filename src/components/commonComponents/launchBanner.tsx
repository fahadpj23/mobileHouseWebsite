import { FC, useMemo } from "react";
import { Link } from "react-router-dom";
import ServerLazyImage from "./serverImageLazyLoading";

interface Props {
  title: string;
  BannerItems: any[];
}

const LaunchBanner: FC<Props> = ({ title, BannerItems }) => {
  // Memoize filtered banner items to avoid recalculating on every render
  const validBannerItems = useMemo(
    () => (Array.isArray(BannerItems) ? BannerItems : []),
    [BannerItems]
  );

  // Early return if no banner items
  if (!validBannerItems.length) return null;

  // Render individual banner item
  const renderBannerItem = (banner: any) => {
    const imageElement = (
      <div className="w-full h-[45vw] md:h-[22vw]">
        <ServerLazyImage
          src={banner?.image}
          alt={`${title} banner`}
          fill={true}
        />
      </div>
    );

    return banner?.seriesId ? (
      <Link to={`series/${banner.seriesId}`} key={banner.id}>
        {imageElement}
      </Link>
    ) : (
      <div key={banner.id}>{imageElement}</div>
    );
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <h1 className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">
        {title}
      </h1>
      <div className="flex flex-col w-full">
        {validBannerItems.map(renderBannerItem)}
      </div>
    </div>
  );
};

export default LaunchBanner;
