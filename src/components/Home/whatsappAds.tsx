import { Link } from "react-router-dom";
import Carousel from "react-multi-carousel";

import LazyImage from "components/commonComponents/imageLazyLoading";
import { WHATSAPPADSMODEL } from "model/whatsappAdsModel";
import { useScreenSize } from "hooks/useScreenSize";
import { useAppDispatch, useAppSelector } from "hooks/useRedux";
import { fetchwhatsappAds } from "store/slice/whatsappAdsSlice";
import { useEffect } from "react";
import ServerLazyImage from "components/commonComponents/serverImageLazyLoading";

const WhatsappAds = () => {
  const dispatch = useAppDispatch();
  const { entities: whatsappAds } = useAppSelector(
    (state) => state.user.whatsappAds
  );

  useEffect(() => {
    dispatch(fetchwhatsappAds());
  }, []);

  const { isMobile } = useScreenSize();

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 1024 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 1024, min: 768 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 768, min: 464 },
      items: 2,
      slidesToSlide: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2,
      slidesToSlide: 2,
    },
  };

  return (
    <div className="p-2">
      {isMobile ? (
        <div>
          {Array.isArray(whatsappAds) &&
            whatsappAds.map((item: any) =>
              item?.seriesId ? (
                <Link to={`series/${item?.seriesId}`} key={item?.id}>
                  <div className="w-[98%] h-[50vh]  ">
                    <ServerLazyImage
                      src={item?.image}
                      alt="phone Image"
                      fill={true}
                    />
                  </div>
                </Link>
              ) : (
                <div key={item?.id} className="w-[98%] h-[50vh]  ">
                  <ServerLazyImage
                    src={item?.image}
                    alt="phone Image"
                    fill={true}
                  />
                </div>
              )
            )}
        </div>
      ) : (
        <Carousel
          responsive={responsive}
          infinite={true}
          arrows={false}
          autoPlay={true}
        >
          {Array.isArray(whatsappAds) &&
            whatsappAds.map((item: any) =>
              item?.series ? (
                <Link
                  to={`series/${item?.series}`}
                  key={item?.id}
                  style={{ margin: "3px 8px" }}
                >
                  <div className="w-[93%] h-[60vw] md:h-[22vw]  ">
                    <ServerLazyImage
                      src={item?.imageU}
                      alt="phone Image"
                      fill={true}
                    />
                  </div>
                </Link>
              ) : (
                <div key={item?.id} className="w-[93%] h-[60vw] md:h-[22vw]  ">
                  <ServerLazyImage
                    src={item?.imageU}
                    alt="phone Image"
                    fill={true}
                  />
                </div>
              )
            )}
        </Carousel>
      )}
    </div>
  );
};
export default WhatsappAds;
