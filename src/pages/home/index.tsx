import React, { useEffect, useCallback, useState } from "react";
import ImageSlider from "components/Home/imageSlider";
import Brands from "components/Home/Brands";
import AvailableEmi from "components/Home/availableEmi";
import LazyLoad from "components/ScrollLoad";
import ProductMiniList from "components/Home/productMiniList";
import WhatsappAds from "components/Home/whatsappAds";
import Upcoming from "components/Home/upcoming";
import NewArrival from "components/Home/newArrival";
import { useAppDispatch, useAppSelector } from "hooks/useRedux";
import { fetchBanners } from "store/slice/bannerSlice";
import {
  getNewArrivalProduct,
  getTrendingPhone,
} from "store/slice/productSlice";
import LazyLoadWithTrigger from "components/LazyLoadWithTrigger";

const HomePage = () => {
  const dispatch = useAppDispatch();
  const { entities: banners } = useAppSelector((state) => state.user.banner);
  const { newArrival, trendingPhone } = useAppSelector(
    (state) => state.user.products
  );

  const [hasFetchedTrending, setHasFetchedTrending] = useState(false);

  // Memoized data fetching functions
  const fetchInitialData = useCallback(() => {
    dispatch(fetchBanners());
    dispatch(getNewArrivalProduct());
    // Removed getTrendingPhone from initial fetch
  }, [dispatch]);

  const fetchTrendingPhone = useCallback(() => {
    if (!hasFetchedTrending) {
      dispatch(getTrendingPhone());
      setHasFetchedTrending(true);
    }
  }, [dispatch, hasFetchedTrending]);

  useEffect(() => {
    fetchInitialData();
  }, [fetchInitialData]);

  // Memoized derived data
  const newArrivalItems = React.useMemo(
    () => (Array.isArray(newArrival) ? newArrival.slice(0, 7) : []),
    [newArrival]
  );

  const trendingPhoneItems = React.useMemo(
    () => (Array.isArray(trendingPhone) ? trendingPhone.slice(0, 7) : []),
    [trendingPhone]
  );

  return (
    <div className="w-screen flex justify-center pb-6">
      <div className="w-full md:w-11/12 flex flex-col space-y-4 md:space-y-6">
        <ImageSlider bannerItems={banners} />

        <Brands />
        <AvailableEmi />

        <div className="p-2 bg-white">
          <ProductMiniList
            title="New Arrival"
            listItems={newArrivalItems}
            link="/newArrivalProduct"
          />
        </div>

        <LazyLoad>
          <Upcoming />
        </LazyLoad>

        <LazyLoad>
          <NewArrival />
        </LazyLoad>

        <LazyLoadWithTrigger onVisible={fetchTrendingPhone}>
          <div className="p-2 bg-white">
            <ProductMiniList
              title="Trending Phones"
              listItems={trendingPhoneItems}
              link="/trendingPhone"
            />
          </div>
        </LazyLoadWithTrigger>

        <LazyLoad>
          <WhatsappAds />
        </LazyLoad>
      </div>
    </div>
  );
};

export default React.memo(HomePage);
