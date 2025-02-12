import { Link } from "react-router-dom";
import Carousel from "react-multi-carousel";
import { WhatappAdsList } from "constants/whatsappAds";
import LazyImage from "components/commonComponents/imageLazyLoading";
import { WHATSAPPADSMODEL } from "model/whatsappAdsModel";
import { useScreenSize } from "hooks/useScreenSize";

const WhatsappAds = () => {
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
          {WhatappAdsList.map((item: WHATSAPPADSMODEL) =>
            item?.series ? (
              <Link to={`series/${item?.series}`} key={item?.id}>
                <div className="w-full h-[50vh]  ">
                  <LazyImage src={item?.image} alt="phone Image" fill={true} />
                </div>
              </Link>
            ) : (
              <div key={item?.id} className="w-full h-[50vh]  ">
                <LazyImage src={item?.image} alt="phone Image" fill={true} />
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
          {WhatappAdsList.map((item: WHATSAPPADSMODEL) =>
            item?.series ? (
              <Link
                to={`series/${item?.series}`}
                key={item?.id}
                style={{ margin: "3px 8px" }}
              >
                <div className="w-[93%] h-[60vw] md:h-[22vw]  ">
                  <LazyImage src={item?.image} alt="phone Image" fill={true} />
                </div>
              </Link>
            ) : (
              <div key={item?.id} className="w-[93%] h-[60vw] md:h-[22vw]  ">
                <LazyImage src={item?.image} alt="phone Image" fill={true} />
              </div>
            )
          )}
        </Carousel>
      )}
    </div>
  );
};
export default WhatsappAds;
