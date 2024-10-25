import ImageSlider from "components/Home/imageSlider";
import Brands from "components/Home/Brands";
import ProductMiniList from "components/Home/productMiniList";
import { SpecialOfferPhones } from "constants/specialOfferPhones";
import Banner from "components/Home/banner";
import MultiCarousel from "components/Home/multiCarousel";

const HomePage = () => {
  return (
    <div className="w-screen flex justify-center pb-6 ">
      <div className="w-11/12 flex flex-col space-y-10">
        <ImageSlider />
        <div className="block md:hidden">
          <MultiCarousel />
        </div>
        <div className="hidden md:block">
          <Brands />
        </div>
        <ProductMiniList title="Special Offer" listItems={SpecialOfferPhones} />
        <Banner />
        <ProductMiniList
          title="Trending Phones"
          listItems={SpecialOfferPhones}
        />
      </div>
    </div>
  );
};
export default HomePage;
