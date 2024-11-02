import React, { FC } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import SingleProductCard from "components/commonComponents/SingleProductCard";
import { Link } from "react-router-dom";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";

interface props {
  listItems: any;
}
const MultiCarousel: FC<props> = ({ listItems }) => {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
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
    <div className="bg-white">
      <Carousel responsive={responsive} infinite={true} arrows={false}>
        {listItems?.map((product: any) => (
          <div key={product?.name} style={{ margin: "0px 2px" }}>
            <SingleProductCard product={product} />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default MultiCarousel;
