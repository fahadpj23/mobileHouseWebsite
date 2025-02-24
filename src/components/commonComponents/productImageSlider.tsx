import React, { FC } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

const ProductImageSlider: FC<any> = ({ productImages }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="w-[70vw] flex items-center justify-center pb-5">
      <div className="w-full h-full">
        <Slider {...settings}>
          {productImages?.images?.map((src: any, index: number) => (
            <div key={index}>
              <Zoom>
                <img
                  className=" h-[80vw] w-full object-contain "
                  src={src}
                  alt="Product Image"
                />
              </Zoom>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default ProductImageSlider;
