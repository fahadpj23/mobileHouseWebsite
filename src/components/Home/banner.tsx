import { Carousel } from "react-responsive-carousel";
import { MINIBANNERS } from "constants/miniBannerItem";
import ImageSlider from "./imageSlider";
const Banner = () => {
  return (
    <div>
      <div className="hidden justify-between space-x-5  md:flex">
        {MINIBANNERS?.map((banner: any) => {
          return (
            <img
              key={banner?.name}
              src={banner?.image}
              alt="banner"
              className="w-full h-[30vh]"
            />
          );
        })}
      </div>
      <div className="block md:hidden">
        <ImageSlider bannerItems={MINIBANNERS} />
      </div>
    </div>
  );
};
export default Banner;
