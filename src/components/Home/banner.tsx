import { Carousel } from "react-responsive-carousel";
import { MINIBANNERS } from "constants/miniBannerItem";
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
        <Carousel
          autoPlay={true}
          showThumbs={false}
          showIndicators={false}
          infiniteLoop={true}
          showStatus={false}
          showArrows={false}
        >
          {MINIBANNERS?.map((banner: any) => (
            <div>
              <img
                src={banner?.image}
                className="h-[60vW] md:h-[30vw] rounded-xl "
                alt="banner"
              />
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
};
export default Banner;
