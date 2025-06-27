import { FC } from "react";
import { Link } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { MAINBANNERMODEL } from "model/mainBannerModel";
import ServerLazyImage from "components/commonComponents/serverImageLazyLoading";

interface props {
  bannerItems: MAINBANNERMODEL[];
}
const ImageSlider: FC<props> = ({ bannerItems }) => {
  return (
    <div className="h-[50vw] md:h-[30vw] mt-3">
      <Carousel
        autoPlay={true}
        showThumbs={false}
        showIndicators={true}
        infiniteLoop={true}
        showStatus={false}
        showArrows={false}
      >
        {bannerItems?.map((banner: any) =>
          banner?.series ? (
            <Link to={`series/${banner?.series}`} key={banner?.id}>
              <div className="relative">
                <div className="h-[50vw] md:h-[25vw] w-full  rounded-none md:rounded-xl  ">
                  <ServerLazyImage
                    src={banner?.imageUrl}
                    alt="banner"
                    fill={true}
                  />
                </div>
              </div>
            </Link>
          ) : (
            <div key={banner?.id} className="relative">
              <div className="h-[50vw] md:h-[25vw] w-full  rounded-none md:rounded-xl  ">
                <ServerLazyImage
                  src={banner?.imageUrl}
                  alt="banner"
                  fill={true}
                />
              </div>
            </div>
          )
        )}
      </Carousel>
    </div>
  );
};
export default ImageSlider;
