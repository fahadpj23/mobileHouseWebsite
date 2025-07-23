import Carousel from "react-multi-carousel";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import ArrowBackIosOutlinedIcon from "@mui/icons-material/ArrowBackIosOutlined";
import LazyImage from "components/commonComponents/imageLazyLoading";
import { PHONEBRANDS } from "constants/phoneBrands";
import { Link } from "react-router-dom";
import "react-multi-carousel/lib/styles.css";

interface brandType {
  name: string;
  image: string;
  link: string;
}
const Brands = () => {
  const CustomLeftArrow = ({ onClick }: any) => (
    <button
      onClick={onClick}
      style={{
        position: "absolute",
        left: "10px",
        top: "50%",
        transform: "translateY(-50%)",
        backgroundColor: "rgba(0, 0, 0, 0.2)",
        color: "white",
        border: "none",
        borderRadius: "50%",
        width: "30px",
        height: "30px",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1,
      }}
    >
      <ArrowBackIosOutlinedIcon />
    </button>
  );

  const CustomRightArrow = ({ onClick }: any) => (
    <button
      onClick={onClick}
      style={{
        position: "absolute",
        right: "15px",
        top: "50%",
        transform: "translateY(-50%)",
        backgroundColor: "rgba(0, 0, 0, 0.3)",
        color: "white",
        border: "none",
        borderRadius: "50%",
        width: "35px",
        height: "35px",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1,
      }}
    >
      <ArrowForwardIosOutlinedIcon />
    </button>
  );

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 1024 },
      items: 9,
      slidesToSlide: 2,
    },
    desktop: {
      breakpoint: { max: 1024, min: 768 },
      items: 9,
      slidesToSlide: 2,
    },
    tablet: {
      breakpoint: { max: 768, min: 464 },
      items: 6,
      slidesToSlide: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 4.5,
      slidesToSlide: 1,
    },
  };

  return (
    <div className="pb-5 ">
      {/* <div className="  w-full mb-3">
        <div className="w-full flex bg-grayBackground p-2 justify-start md:justify-center overflow-x-auto scrollbar-hide px-3 scroll-smooth  ">
          <div className=" flex  ">
            {PHONEBRANDS?.map((brand: brandType) => {
              return (
                <Link
                  key={brand?.name}
                  to={`brand${brand?.link}`}
                  className=" flex items-center p-1  "
                >
                  <div className="hover:scale-110 duration-150 h-[35px] md:h-[45px] w-[75px] md:w-[110px]  bg-white shadow-md ">
                    <LazyImage src={brand?.image} alt="logo " fill={true} />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div> */}
      <Carousel
        responsive={responsive}
        infinite={true}
        arrows={true}
        autoPlay={true}
        autoPlaySpeed={3000}
        keyBoardControl={true}
        customTransition="all 1s ease-in-out"
        transitionDuration={1000}
        customLeftArrow={<></>}
        customRightArrow={<CustomRightArrow />}
      >
        {PHONEBRANDS?.map((brand: brandType) => {
          return (
            <Link
              key={brand?.name}
              to={`brand${brand?.link}`}
              className=" flex items-center p-1  "
            >
              <div className="hover:scale-110 duration-150 h-[35px] md:h-[45px] w-[75px] md:w-[110px]  bg-white shadow-md ">
                <LazyImage src={brand?.image} alt="logo " fill={true} />
              </div>
            </Link>
          );
        })}
      </Carousel>
    </div>
  );
};
export default Brands;
