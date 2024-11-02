import Slider from "react-slick";
import { PHONEBRANDS } from "constants/phoneBrands";
interface brandType {
  name: string;
  image: string;
}

interface brands {
  data: brandType[];
}

const SliderList = () => {
  const imageStyle = {
    width: "180px",
    height: "80px",
    borderRadius: "5px",
  };
  const settingsSlider = {
    speed: 500,
    slidesToShow: 6.2,
    slidesToScroll: 1,
    arrows: false,
    className: "px-9",
    swipeToSlide: true,
    infinite: true,

    responsive: [
      {
        breakpoint: 1450,
        settings: {
          slidesToShow: 5.5,
          arrows: false,

          className: "px-7 relative",
        },
      },
      {
        breakpoint: 1248,
        settings: {
          slidesToShow: 4.5,
          arrows: false,

          className: "px-7 relative",
        },
      },
      {
        breakpoint: 1100,
        settings: {
          slidesToShow: 3.2,
          arrows: false,

          className: "px-7 relative",
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 3.4,
          className: "relative",
          arrows: false,
        },
      },
      {
        breakpoint: 580,
        settings: {
          slidesToShow: 2.3,
          className: "relative",
          arrows: false,
        },
      },
      {
        breakpoint: 460,
        settings: {
          slidesToShow: 2.1,
          className: "relative",
          arrows: false,
        },
      },
    ],
  };

  return (
    <div className=" px-2 mt-2">
      <Slider {...settingsSlider}>
        {PHONEBRANDS?.map((brand: brandType) => {
          return (
            <img
              src={brand?.image}
              alt="logo "
              style={imageStyle}
              className="hover:scale-110 duration-150"
            />
          );
        })}
      </Slider>
    </div>
  );
};

export default SliderList;
