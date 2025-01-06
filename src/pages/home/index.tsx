import React, { Suspense } from "react";
import ImageSlider from "components/Home/imageSlider";
import Brands from "components/Home/Brands";
import { getSpecialOfferPhones } from "utils/getSpecialOfferPhone";
import { getTrendingPhones } from "utils/getTrendingPhones";
import { MAINBANNER } from "constants/mainBanner";

import { getNewArrivalPhones } from "utils/getNewArrival";
import AvailableEmi from "components/Home/availableEmi";
import HomeSkeleton from "components/skeleton/homeSkeleton";
import { useScreenSize } from "hooks/useScreenSize";
import PopupAds from "components/commonComponents/popupAds";
import { removeDuplicateSeries } from "utils/removeDuplicateSeries";
import { useContext } from "react";
import { ProductContext } from "context/productContext";
import { useFetchAllProducts } from "hooks/useFetchAllProducts";
import { useFetchNewArrival } from "hooks/useFetchNewArrival";
import { useFetchSpecialProducts } from "hooks/useFetchSpecialOfferProduct";
import { useFetchTrendingProducts } from "hooks/useFetchTrendingPhone";
const ProductMiniList = React.lazy(
  () => import("components/Home/productMiniList")
);
const WhatsappAds = React.lazy(() => import("components/Home/whatsappAds"));
const Banner = React.lazy(() => import("components/Home/banner"));
const Footer = React.lazy(() => import("components/Home/footer"));

const HomePage = () => {
  const { isMobile } = useScreenSize();
  const { newArrivalProducts } = useFetchNewArrival();
  const { specialOfferProducts } = useFetchSpecialProducts();
  const { trendingProducts } = useFetchTrendingProducts();
  const hasSeenPopup = localStorage.getItem("hasSeenPopup");
  return (
    <div className="w-screen flex justify-center pb-6 ">
      <div className=" w-full md:w-11/12 flex flex-col space-y-6">
        {isMobile && !hasSeenPopup && <PopupAds />}

        <ImageSlider bannerItems={MAINBANNER} />
        <Brands />
        <AvailableEmi />
        <Suspense fallback={<HomeSkeleton />}>
          <div className="p-2 bg-white ">
            {Array.isArray(newArrivalProducts) && (
              <ProductMiniList
                title="new Arrival"
                listItems={removeDuplicateSeries(
                  getNewArrivalPhones(newArrivalProducts)
                )?.slice(0, 7)}
                link="/newArrival"
              />
            )}
          </div>
          <WhatsappAds />
          <div className="p-2 bg-white ">
            {Array.isArray(trendingProducts) && (
              <ProductMiniList
                title="Trending Phones"
                listItems={removeDuplicateSeries(trendingProducts)?.slice(0, 7)}
                link="/trendingPhones"
              />
            )}
          </div>
          <Banner />
          <div className="p-2 bg-white ">
            {Array.isArray(specialOfferProducts) && (
              <ProductMiniList
                title="Special Offer"
                listItems={removeDuplicateSeries(specialOfferProducts)?.slice(
                  0,
                  7
                )}
                link="/specialOffer"
              />
            )}
          </div>
          {/* <OurServices /> */}
          <Footer />
        </Suspense>
      </div>
    </div>
  );
};
export default HomePage;
