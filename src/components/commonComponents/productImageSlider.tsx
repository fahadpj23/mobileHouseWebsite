import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { FC, useState } from "react";
import LazyImage from "./imageLazyLoading";
import { Modal } from "@mui/material";
import ImageZoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

const ProductImageSlider: FC<any> = ({ productImages }) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [modalImage, setModalImage] = useState<string>("");

  const handleOpenModal = (image: string) => {
    setModalOpen(true);
    setModalImage(image);
  };
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
              <div
                onClick={() => setModalOpen(true)}
                key={image}
                className="pb-8 h-[80vw] w-full "
              >
                <LazyImage src={image} alt="Product Image" />
              </div>
            ))}
          </Carousel>
        </div>
      ) : null}
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <ImageZoom>
          <img
            src={modalImage}
            alt={`Slide 1`}
            style={{ width: "100%", cursor: "pointer" }}
          />
        </ImageZoom>
      </Modal>
    </div>
  );
};
export default ProductImageSlider;
