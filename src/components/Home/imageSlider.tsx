import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import RENO12 from "assets/reno12.jpg";
import VIVOV40 from "assets/VivoV40.jpg";
import SAMSUNGA16 from "assets/samsunga16.jpg";

const ImageSlider = () => {
  const images = [RENO12, VIVOV40, SAMSUNGA16];
  return (
    <div className="h-[60vW] md:h-[30vw]">
      <Carousel
        autoPlay={true}
        showThumbs={false}
        showIndicators={false}
        infiniteLoop={true}
        showStatus={false}
        showArrows={false}
      >
        {images?.map((image) => (
          <div key={image}>
            <img
              src={image}
              className="h-[60vW] md:h-[30vw] rounded-xl "
              alt="banner"
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
};
export default ImageSlider;
