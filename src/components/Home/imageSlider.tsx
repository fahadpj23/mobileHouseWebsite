import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import RENO12 from "assets/reno12.jpg";
import VIVOV40 from "assets/VivoV40.jpg";
import SAMSUNGA16 from "assets/samsunga16.jpg";

const ImageSlider = () => {
  const images = [RENO12, VIVOV40, SAMSUNGA16];
  return (
    <div className="w-screen flex justify-center">
      <div className="w-11/12 h-96 ">
        <Carousel
          autoPlay={true}
          showThumbs={false}
          showIndicators={false}
          infiniteLoop={true}
          showStatus={false}
        >
          {images?.map((image) => (
            <div>
              <button className="absolute bottom-7 right-10 py-1 px-2 bg-blue-500 text-white">
                Book Now
              </button>
              <img src={image} className="h-[60vh] rounded-xl " />
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
};
export default ImageSlider;
