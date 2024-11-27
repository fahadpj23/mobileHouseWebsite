import React from "react";
import Slider from "react-slick";
import { FC } from "react";
import { Link } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface props {
  bannerItems: any;
}
const ImageSlider: FC<props> = ({ bannerItems }) => {
  // var settings = {
  //   dots: true,
  //   infinite: true,
  //   speed: 500,
  //   slidesToShow: 1,
  //   slidesToScroll: 1,
  // };
  // return (
  //   <div className="h-[45vw] md:h-[30vw] flex">
  //     <Slider {...settings}>
  {
    /* {bannerItems?.map((banner: any) => (
          <Link
            to={banner?.name}
            key={banner?.id}
            style={{ margin: "3px 8px" }}
          >
            <div className="relative">
              <img
                src={banner?.image}
                className="h-[40vw] md:h-[25vw] rounded-none md:rounded-xl  "
                alt="banner"
              />
              {banner?.link && (
                <button className="bg-gradient-to-r from-orange-500 via-orange-600 to-orange-700 p-1 rounded-lg text-white text-[11px] absolute left-5 bottom-4">
                  {banner?.link?.title}
                </button>
              )}
            </div>
          </Link>
        ))} */
  }
  //     <div>1</div>
  //     <div>1</div>
  //     <div>1</div>
  //     <div>1</div>
  //   </Slider>
  // </div>

  // );
  const imageStyle = {
    width: "180px",
    height: "80px",
    borderRadius: "5px",
  };
  const settingsSlider = {
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    swipeToSlide: true,
    infinite: true,
    dots: true,
  };
  return (
    // <div className=" h-[45vw] md:h-[30vw] mt-2">
    <Slider {...settingsSlider}>
      {bannerItems?.map((banner: any) => (
        <Link to={banner?.name} key={banner?.id}>
          <div className="relative">
            <img
              src={banner?.image}
              // className="h-[45vw] md:h-[25vw] w-full  rounded-none md:rounded-xl  "
              alt="banner"
            />
            {banner?.link && (
              <button className="bg-gradient-to-r from-orange-500 via-orange-600 to-orange-700 p-1 rounded-lg text-white text-[11px] absolute left-5 bottom-4">
                {banner?.link?.title}
              </button>
            )}
          </div>
        </Link>
      ))}
    </Slider>
    // </div>
  );
};
export default ImageSlider;
