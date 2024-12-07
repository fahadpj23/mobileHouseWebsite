import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { FC } from "react";

const ProductImageSlider: FC<any> = ({ productImages }) => {
  return (
    <div className="w-[70vw] flex items-center justify-center">
      {productImages?.images?.length ? (
        <div className="w-full h-full">
          <Carousel
            autoPlay={true}
            showThumbs={false}
            showIndicators={true}
            infiniteLoop={true}
            showStatus={false}
            showArrows={false}
            selectedItem={0}
          >
            {productImages?.images?.map((image: any) => (
              <img
                src={image}
                alt="product image"
                key={image}
                loading="lazy"
                className="pb-8 max-h-[80vw] w-full object-contain"
              />
            ))}
          </Carousel>
        </div>
      ) : null}
    </div>
  );
};
export default ProductImageSlider;
