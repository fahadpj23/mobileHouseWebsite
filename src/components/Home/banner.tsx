import { Carousel } from "react-responsive-carousel";
import { MINIBANNERS } from "constants/miniBannerItem";
import ImageSlider from "./imageSlider";
import { Link } from "react-router-dom";
import LazyImage from "components/commonComponents/imageLazyLoading";
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
              <div key={banner?.name} className="w-full h-[30vh]">
                <LazyImage src={banner?.image} alt="banner " />
              </div>
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
