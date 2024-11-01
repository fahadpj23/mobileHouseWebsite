import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { MAINBANNER } from "constants/mainBanner";

const ImageSlider = () => {
  return (
    <div className="h-[35vW] md:h-[30vw]">
      <Carousel
        autoPlay={true}
        showThumbs={false}
        showIndicators={true}
        infiniteLoop={true}
        showStatus={false}
        showArrows={false}
      >
        {MAINBANNER?.map((banner) => (
          <div key={banner?.id}>
            <img
              src={banner?.image}
              className="h-[40vW] md:h-[25vw] rounded-none md:rounded-xl "
              alt="banner"
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
};
export default ImageSlider;
