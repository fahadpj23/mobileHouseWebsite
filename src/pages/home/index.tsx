import ImageSlider from "components/Home/imageSlider";
import Brands from "components/Home/Brands";
import Banner from "components/Home/banner";
import { getSpecialOfferPhones } from "utils/getSpecialOfferPhone";
import { getTrendingPhones } from "utils/getTrendingPhones";
import { MAINBANNER } from "constants/mainBanner";
import ProductMiniList from "components/Home/productMiniList";

const HomePage = () => {
  return (
    <div className="w-screen flex justify-center pb-6 ">
      <div className=" w-full md:w-11/12 flex flex-col space-y-6">
        <ImageSlider bannerItems={MAINBANNER} />
        <Brands />
        <div className="p-2 bg-grayBackground ">
          <ProductMiniList
            title="Special Offer"
            listItems={getSpecialOfferPhones()?.slice(0, 7)}
            link="/specialOffer"
          />
        </div>
        <Banner />
        <div className="p-2 bg-gray-100">
          <ProductMiniList
            title="Trending Phones"
            listItems={getTrendingPhones()?.slice(0, 7)}
            link="/trendingPhones"
          />
        </div>
      </div>
    </div>
  );
};
export default HomePage;
