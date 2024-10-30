import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Link } from "react-router-dom";
import { PHONEBRANDS } from "constants/phoneBrands";
import { useEffect } from "react";
interface dataprops {
  name: string;
  image: string;
}
interface Props {
  data: dataprops[];
}
const responsive = {
  // desktop: {
  //   breakpoint: { max: 3000, min: 1024 },
  //   items: 6,
  //   // slidesToSlide: 3,
  // },
  // tablet: {
  //   breakpoint: { max: 1024, min: 464 },
  //   items: 5,
  //   // slidesToSlide: 2,
  // },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: Infinity,
  },
};

const MultiCarousel = () => {
  return (
    // <Carousel
    //   swipeable={true}
    //   draggable={true}
    //   arrows={false}
    //   infinite={true}
    //   responsive={responsive}
    //   // autoPlaySpeed={10000}
    //   // customTransition="all .5"
    //   // transitionDuration={500}
    //   // containerClass="carousel-container-with-gap"
    //   // dotListClass="custom-dot-list-style"
    //   // itemClass="carousel-item"
    //   autoPlay={true}
    // >
    <div className="w-full grid grid-cols-3 gap-3 justify-between bg-gray-100 px-1 py-4  ">
      {PHONEBRANDS?.map((brand: any) => {
        return (
          <Link
            key={brand?.name}
            to={`brand${brand?.link}`}
            className="item w-full border-1 border-black bg-white  rounded-md flex justify-center shadow-md  "
          >
            <img
              src={brand?.image}
              alt="logo "
              style={{
                width: "95px",
                height: "40px",
                objectFit: "fill",
                borderRadius: "5px",
              }}
            />
          </Link>
        );
      })}
    </div>
    // </Carousel>
  );
};

export default MultiCarousel;
