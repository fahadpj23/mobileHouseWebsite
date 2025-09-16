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
    <>
      {productImages && Object.keys(productImages).length ? (
        <div className="w-[70vw] flex items-center justify-center pb-5">
          <div className="w-full h-full">
            <Slider {...settings}>
              {productImages?.images?.map((image: any) => (
                <div key={image?.url}>
                  <Zoom>
                    <img
                      src={`https://mobilehouse.in/.netlify/functions/get-image?key=${image?.url}&w=800&q=75&fm=webp`}
                      srcSet={`https://mobilehouse.in/.netlify/functions/get-image?key=${image?.url}&w=400&q=75&fm=webp 400w,
             https://mobilehouse.in/.netlify/functions/get-image?key=${image?.url}&w=800&q=75&fm=webp 800w,
             https://mobilehouse.in/.netlify/functions/get-image?key=${image?.url}&w=1200&q=75&fm=webp 1200w`}
                      sizes="(max-width: 600px) 400px, (max-width: 1000px) 800px, 1200px"
                      alt={"product"}
                      className=" h-[80vw] w-full object-contain "
                    />
                  </Zoom>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default ProductImageSlider;
