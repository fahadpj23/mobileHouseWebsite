import Carousel from "react-multi-carousel";
import { WhatappAdsList } from "constants/whatsappAds";
import { Link } from "react-router-dom";
import LazyImage from "components/commonComponents/imageLazyLoading";

const WhatsappAds = () => {
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
    <div className="p-2 ">
      <Carousel
        responsive={responsive}
        infinite={true}
        arrows={false}
        autoPlay={true}
      >
        {/* <div className="grid grid-cols-6"> */}
        {WhatappAdsList.map((item) => (
          <Link
            to={`series/${item?.series}`}
            key={item?.id}
            style={{ margin: "3px 8px" }}
          >
            <div className="w-[93%] h-[60vw] md:h-[22vw]  ">
              <LazyImage src={item?.image} alt="phone Image" fill={true} />
            </div>
          </Link>
        ))}
        {/* </div> */}
      </Carousel>
    </div>
  );
};
export default WhatsappAds;
