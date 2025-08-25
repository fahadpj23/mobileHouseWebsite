import { LAUNCHITEMSMODEL } from "model/launchItemsMode";
import { FC } from "react";
import LazyImage from "./imageLazyLoading";
import { Link } from "react-router-dom";
import ServerLazyImage from "./serverImageLazyLoading";

interface props {
  title: string;
  BannerItems: any[];
}
const LaunchBanner: FC<props> = ({ title, BannerItems }) => {
  return (
    <div className="flex flex-col items-center space-y-4">
      <h1 className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent  ">
        {title}
      </h1>
      <div className="flex flex-col  w-full">
        {BannerItems?.map((banner: any) =>
          banner?.seriesId ? (
            <Link to={`series/${banner?.seriesId}`} key={banner?.id}>
              <div className="w-full h-[45vw] md:h-[22vw]  ">
                <ServerLazyImage
                  src={banner?.image}
                  alt="phone Image"
                  fill={true}
                />
              </div>
            </Link>
          ) : (
            <div key={banner?.id} className="w-full h-[45vw] md:h-[22vw]  ">
              <ServerLazyImage
                src={banner?.image}
                alt="phone Image"
                fill={true}
              />
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default LaunchBanner;
