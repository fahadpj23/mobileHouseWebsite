import ImageSlider from "components/Home/imageSlider";
import Brands from "components/Home/Brands";
import ProductMiniList from "components/Home/productMiniList";
import { SpecialOfferPhones } from "constants/specialOfferPhones";
import Banner from "components/Home/banner";

const HomePage = () => {
  return (
    <div className="w-screen flex justify-center pb-6 ">
      <div className=" w-full md:w-11/12 flex flex-col space-y-10">
        <ImageSlider />
        <Brands />
        <ProductMiniList
          title="Special Offer"
          listItems={SpecialOfferPhones}
          link="/specialOffer"
        />
        <Banner />
        <ProductMiniList
          title="Trending Phones"
          listItems={SpecialOfferPhones}
          link="/newArrival"
        />
      </div>
    </div>
  );
};
export default HomePage;
