import ImageSlider from "components/Home/imageSlider";
import Brands from "components/Home/Brands";
import ProductMiniList from "components/Home/productMiniList";
import { SpecialOfferPhones } from "constants/specialOfferPhones";
import Banner from "components/Home/banner";
import { getSpecialOfferPhones } from "utils/getSpecialOfferPhone";
import { getTrendingPhones } from "utils/getTrendingPhones";

const HomePage = () => {
  return (
    <div className="w-screen flex justify-center pb-6 ">
      <div className=" w-full md:w-11/12 flex flex-col space-y-6">
        <ImageSlider />
        <Brands />
        <div className="p-2 bg-gray-100 ">
          <ProductMiniList
            title="Special Offer"
            listItems={getSpecialOfferPhones()?.slice(0, 4)}
            link="/specialOffer"
          />
        </div>
        <Banner />
        <div className="p-2 bg-gray-100">
          <ProductMiniList
            title="Trending Phones"
            listItems={getTrendingPhones()?.slice(0, 4)}
            link="/newArrival"
          />
        </div>
      </div>
    </div>
  );
};
export default HomePage;
