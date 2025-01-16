import { useState } from "react";
import { Carousel } from "react-responsive-carousel";
import { Link } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import { Dialog, IconButton } from "@mui/material";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { POPUPADSITEM } from "constants/popUpAds";
import LazyImage from "./imageLazyLoading";

const PopupAds = () => {
  const [showPopUp, setShowPopUp] = useState<boolean>(true);
  const handleClose = (e: any) => {
    e.preventDefault();
    localStorage.setItem("hasSeenPopup", "true");
    setShowPopUp(false);
  };

  return (
    <div>
      <Dialog
        open={showPopUp}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Carousel
          autoPlay={true}
          showThumbs={false}
          showIndicators={true}
          infiniteLoop={true}
          showStatus={false}
          showArrows={false}
        >
          {POPUPADSITEM?.map((banner: any) => (
            <Link to={`series/${banner?.series}`} key={banner?.id}>
              <div>
                <div
                  key={banner?.name}
                  className="h-[60vh]  w-full  rounded-none md:rounded-xl  relative "
                >
                  <IconButton
                    color="error"
                    aria-label="close"
                    onClick={handleClose}
                    sx={{
                      position: "absolute",
                      top: 1,
                      right: 1,
                      backgroundColor: "white",
                      padding: 2,
                      width: 16,
                      height: 16,
                    }}
                  >
                    <CloseIcon sx={{ fontSize: "25px" }} />
                  </IconButton>
                  <LazyImage src={banner?.image} alt="banner" fill={true} />
                </div>
                {banner?.link && (
                  <button className="bg-gradient-to-r from-orange-500 via-orange-600 to-orange-700 p-1 rounded-lg text-white text-[11px] absolute left-5 bottom-4">
                    {banner?.link?.title}
                  </button>
                )}
              </div>
            </Link>
          ))}
        </Carousel>
      </Dialog>
    </div>
  );
};
export default PopupAds;
