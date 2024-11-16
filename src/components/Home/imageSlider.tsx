import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { MAINBANNER } from "constants/mainBanner";
import { FC } from "react";

interface props {
  bannerItems: any;
}
const ImageSlider: FC<props> = ({ bannerItems }) => {
  return (
    <div className="h-[45vW] md:h-[30vw] mt-3">
      <Carousel
        autoPlay={true}
        showThumbs={false}
        showIndicators={true}
        infiniteLoop={true}
        showStatus={false}
        showArrows={false}
      >
        {bannerItems?.map((banner: any) => (
          <div key={banner?.id}>
            <img
              src={banner?.image}
              className="h-[45vW] md:h-[25vw] rounded-none md:rounded-xl "
              alt="banner"
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
};
export default ImageSlider;
