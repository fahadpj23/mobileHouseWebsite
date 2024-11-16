import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { FC } from "react";

const ProductImageSlider: FC<any> = ({ productImages }) => {
  return (
    <div className="w-full flex items-center justify-center">
      {productImages?.images?.length ? (
        <div className="w-[70vw] h-full">
          <Carousel
            autoPlay={true}
            showThumbs={false}
            showIndicators={true}
            infiniteLoop={true}
            showStatus={false}
            showArrows={false}
          >
            {productImages?.images?.map((image: any) => (
              <img
                src={image}
                alt="product image"
                key={image}
                className="pb-8"
              />
            ))}
          </Carousel>
        </div>
      ) : null}
    </div>
  );
};
export default ProductImageSlider;
