import { Carousel } from "react-responsive-carousel";
import { MINIBANNERS } from "constants/miniBannerItem";
import ImageSlider from "./imageSlider";
import { Link } from "react-router-dom";
const Banner = () => {
  return (
    <div>
      <div className="hidden justify-between space-x-5  md:flex">
        {MINIBANNERS?.map((banner: any) => {
          return (
            <Link
              to={`series/${banner?.series}`}
              key={banner?.id}
              style={{ margin: "3px 8px" }}
            >
              <img
                key={banner?.name}
                src={banner?.image}
                alt="banner"
                className="w-full h-[30vh]"
              />
            </Link>
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
