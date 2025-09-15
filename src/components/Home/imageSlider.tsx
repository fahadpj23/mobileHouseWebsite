import { FC, useMemo } from "react";
import { Link } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { MAINBANNERMODEL } from "model/mainBannerModel";
import ServerLazyImage from "components/commonComponents/serverImageLazyLoading";

interface Props {
  bannerItems: any;
}

const ImageSlider: FC<Props> = ({ bannerItems }) => {
  // Filter and memoize valid banner items with seriesId
  const validBannerItems = useMemo(
    () =>
      Array.isArray(bannerItems)
        ? bannerItems.filter((banner) => banner?.seriesId)
        : [],
    [bannerItems]
  );

  const hasBanners = validBannerItems.length > 0;

  // Render individual banner slide
  const renderBannerSlide = (banner: any) => (
    <Link to={`series/${banner.seriesId}`} key={banner.id}>
      <div className="relative">
        <div className="h-[50vw] md:h-[25vw] w-full rounded-none md:rounded-xl">
          <ServerLazyImage
            src={`/.netlify/images?url=${banner.image}&w=600&fm=webp `}
            alt="Promotional banner"
            fill={true}
          />
        </div>
      </div>
    </Link>
  );

  if (!Array.isArray(bannerItems)) {
    return (
      <div className="h-[50vw] md:h-[30vw] mt-3">
        <div className="relative animate-pulse">
          <div className="h-[50vw] md:h-[25vw] w-full rounded-none md:rounded-xl bg-gray-200"></div>
        </div>
      </div>
    );
  }

  if (!hasBanners) return null;

  return (
    <div className="h-[50vw] md:h-[30vw] mt-3">
      <Carousel
        autoPlay={true}
        showThumbs={false}
        showIndicators={true}
        infiniteLoop={true}
        showStatus={false}
        showArrows={false}
        interval={5000} // Added interval for better control
        transitionTime={500} // Smooth transition
      >
        {validBannerItems.map(renderBannerSlide)}
      </Carousel>
    </div>
  );
};

export default ImageSlider;
