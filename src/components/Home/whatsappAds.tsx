import Carousel from "react-multi-carousel";
import { WhatappAdsList } from "constants/whatsappAds";

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
    <div className="p-2">
      <Carousel responsive={responsive} infinite={true} arrows={false}>
        {WhatappAdsList.map((item) => (
          <div key={item?.id} style={{ margin: "0px 8px" }}>
            <img
              src={item?.image}
              alt="phone Image"
              className="w-full h-[60vw] md:h-[25vw]   object-fill"
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
};
export default WhatsappAds;