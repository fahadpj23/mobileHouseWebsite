import React from "react";
import { useEffect } from "react";
import ImageSlider from "components/Home/imageSlider";
import Brands from "components/Home/Brands";
import AvailableEmi from "components/Home/availableEmi";
import LazyLoad from "components/ScrollLoad";
import ProductMiniList from "components/Home/productMiniList";
import WhatsappAds from "components/Home/whatsappAds";
import Footer from "components/Home/footer";
import Upcoming from "components/Home/upcoming";
import NewArrival from "components/Home/newArrival";
import { useAppDispatch, useAppSelector } from "hooks/useRedux";
import { fetchBanners } from "store/slice/bannerSlice";
import {
  getNewArrivalProduct,
  getSpecialOffer,
  getTrendingPhone,
} from "store/slice/productSlice";

const HomePage = () => {
  const dispatch = useAppDispatch();
  const { entities: banners } = useAppSelector((state) => state.user.banner);
  const { newArrival, specialOffer, trendingPhone } = useAppSelector(
    (state) => state.user.products
  );

  useEffect(() => {
    dispatch(fetchBanners());
    dispatch(getNewArrivalProduct());
    dispatch(getTrendingPhone());
  }, []);

  const fetchSpecialOffer = () => dispatch(getSpecialOffer());

  // const fetchTrendingPhone = () => );

  return (
    <div className="w-screen flex justify-center pb-6 ">
      <div className=" w-full md:w-11/12 flex flex-col space-y-4 md:space-y-6">
        <ImageSlider bannerItems={banners} />

        <Brands />
        <AvailableEmi />

        <div className="p-2 bg-white ">
          <ProductMiniList
            title="New Arrival"
            listItems={Array.isArray(newArrival) ? newArrival.slice(0, 7) : []}
            link="/newArrivalProduct"
          />
        </div>
        <LazyLoad>
          <Upcoming />
        </LazyLoad>
        <LazyLoad>
          <NewArrival />
        </LazyLoad>
        <LazyLoad>
          <div className="p-2 bg-white ">
            <ProductMiniList
              title="Trending Phones"
              listItems={
                Array.isArray(trendingPhone) ? trendingPhone.slice(0, 7) : []
              }
              link="/trendingPhone"
            />
          </div>
        </LazyLoad>
        <LazyLoad>
          <WhatsappAds />
        </LazyLoad>
        <LazyLoad>
          <div onLoad={() => fetchSpecialOffer()}>
            <div className="p-2 bg-white ">
              <ProductMiniList
                title="Special Offer"
                listItems={
                  Array.isArray(specialOffer) ? specialOffer.slice(0, 7) : []
                }
                link="/specialOffer"
              />
            </div>

            <Footer />
          </div>
        </LazyLoad>
      </div>
    </div>
  );
};
export default HomePage;
