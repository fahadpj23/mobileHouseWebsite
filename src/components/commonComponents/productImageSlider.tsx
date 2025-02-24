// import "react-responsive-carousel/lib/styles/carousel.min.css";
// import { Carousel } from "react-responsive-carousel";
// import { FC, useState } from "react";
// import LazyImage from "./imageLazyLoading";
// import Zoom from "react-medium-image-zoom";
// import "react-medium-image-zoom/dist/styles.css";
// import ProductProductImageSlider from "./ProductProductImageSlider";

// const ProductProductImageSlider: FC<any> = ({ productImages }) => {
//   const [zoomImage, setZoomImage] = useState(false);
//   console.log(zoomImage);

//   const handleImage = (image: any) => {
//     setZoomImage(image);
//   };
//   return (
//     <div className="w-[70vw] flex items-center justify-center">
//       {productImages?.images?.length ? (
//         <div className="w-full h-full">
//           <Carousel
//             autoPlay={true}
//             showThumbs={false}
//             showIndicators={true}
//             infiniteLoop={true}
//             showStatus={false}
//             showArrows={false}
//             selectedItem={0}
//           >
//             {productImages?.images?.map((image: any) => (
//               <div
//                 onClick={() => handleImage(image)}
//                 key={image}
//                 className="pb-8 h-[80vw] w-full "
//                 id="imageDiv"
//               >
//                 <Zoom>
//                   <img
//                     src={productImages?.images[0]}
//                     alt={"altText"}
//                     className="w-full h-auto max-h-[80vh] object-contain rounded-lg shadow-lg cursor-pointer"
//                   />
//                 </Zoom>
//               </div>
//             ))}
//           </Carousel>
//         </div>
//       ) : null}
//     </div>
//   );
// };
// export default ProductProductImageSlider;

import React, { FC } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import LazyImage from "./imageLazyLoading";

const images = [
  "https://via.placeholder.com/600x400",
  "https://via.placeholder.com/600x400/ff7f7f/333333",
  "https://via.placeholder.com/600x400/77ff7f/333333",
  "https://via.placeholder.com/600x400/7777ff/333333",
];

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
