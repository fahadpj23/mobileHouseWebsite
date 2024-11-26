import React, { Suspense } from "react";
import ImageSlider from "components/Home/imageSlider";
import Brands from "components/Home/Brands";
// import Banner from "components/Home/banner";
import { getSpecialOfferPhones } from "utils/getSpecialOfferPhone";
import { getTrendingPhones } from "utils/getTrendingPhones";
import { MAINBANNER } from "constants/mainBanner";
// import ProductMiniList from "components/Home/productMiniList";
// import WhatsappAds from "components/Home/whatsappAds";
import { getNewArrivalPhones } from "utils/getNewArrival";
import AvailableEmi from "components/Home/availableEmi";
const ProductMiniList = React.lazy(
  () => import("components/Home/productMiniList")
);
const WhatsappAds = React.lazy(() => import("components/Home/whatsappAds"));
const Banner = React.lazy(() => import("components/Home/banner"));

const HomePage = () => {
  return (
    <div className="w-screen flex justify-center pb-6 ">
      <div className=" w-full md:w-11/12 flex flex-col space-y-6">
        <ImageSlider bannerItems={MAINBANNER} />
        <Brands />
        <AvailableEmi />
        <Suspense fallback={<div>Loading...</div>}>
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
        </Suspense>
      </div>
    </div>
  );
};
export default HomePage;
