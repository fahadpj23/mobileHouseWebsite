import React, { Suspense } from "react";
import ImageSlider from "components/Home/imageSlider";
import Brands from "components/Home/Brands";
import { getSpecialOfferPhones } from "utils/getSpecialOfferPhone";
import { getTrendingPhones } from "utils/getTrendingPhones";
import { MAINBANNER } from "constants/mainBanner";

import { getNewArrivalPhones } from "utils/getNewArrival";
import AvailableEmi from "components/Home/availableEmi";
import HomeSkeleton from "components/skeleton/homeSkeleton";
const ProductMiniList = React.lazy(
  () => import("components/Home/productMiniList")
);
const WhatsappAds = React.lazy(() => import("components/Home/whatsappAds"));
const Banner = React.lazy(() => import("components/Home/banner"));
const Footer = React.lazy(() => import("components/Home/footer"));
// const OurServices = React.lazy(() => import("components/Home/ourServices"));

const HomePage = () => {
  return (
    <div className="w-screen flex justify-center pb-6 ">
      <div className=" w-full md:w-11/12 flex flex-col space-y-6">
        <ImageSlider bannerItems={MAINBANNER} />
        <Brands />
        <AvailableEmi />
        <Suspense fallback={<HomeSkeleton />}>
          <div className="p-2 bg-white ">
            <ProductMiniList
              title="Special Offer"
              listItems={getSpecialOfferPhones()?.slice(0, 7)}
              link="/specialOffer"
            />
          </div>
          <WhatsappAds />
          <div className="p-2 bg-white ">
            <ProductMiniList
              title="Trending Phones"
              listItems={getTrendingPhones()?.slice(0, 7)}
              link="/trendingPhones"
            />
          </div>
          <Banner />
          <div className="p-2 bg-white ">
            <ProductMiniList
              title="new Arrival"
              listItems={getNewArrivalPhones()?.slice(0, 7)}
              link="/newArrival"
            />
          </div>
          {/* <OurServices /> */}
          <Footer />
        </Suspense>
      </div>
    </div>
  );
};
export default HomePage;
