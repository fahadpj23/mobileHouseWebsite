import { FC } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

interface dataprops {
  name: string;
  image: string;
}
interface Props {
  data: dataprops[];
}
const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 6,
    slidesToSlide: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 5,
    slidesToSlide: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 2,
    slidesToSlide: 1,
  },
};

const MultiCarousel: FC<Props> = ({ data }) => {
  return (
    <Carousel
      swipeable={true}
      draggable={true}
      arrows={false}
      infinite={true}
      responsive={responsive}
      autoPlaySpeed={1000}
      customTransition="all .5"
      transitionDuration={500}
      containerClass="carousel-container-with-gap"
      dotListClass="custom-dot-list-style"
      itemClass="carousel-item"
    >
      {data?.map((item: dataprops) => {
        return (
          <img
            src={item?.image}
            alt="logo "
            style={{
              width: "100px",
              height: "40px",
              objectFit: "fill",
              borderRadius: "5px",
            }}
          />
        );
      })}
    </Carousel>
  );
};

export default MultiCarousel;
