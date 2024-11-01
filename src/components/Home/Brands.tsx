import { PHONEBRANDS } from "constants/phoneBrands";
import { Link } from "react-router-dom";
import Marquee from "react-fast-marquee";

interface brandType {
  name: string;
  image: string;
  link: string;
}
const Brands = () => {
  return (
    <div>
      <div className="hidden md:flex justify-center w-full">
        <div className="flex bg-gray-100 p-3 w-full space-x-3 md:space-x-6 justify-center ">
          {PHONEBRANDS?.map((brand: brandType) => {
            return (
              <Link
                key={brand?.name}
                to={`brand${brand?.link}`}
                className=" flex items-center p-1  "
              >
                <img
                  src={brand?.image}
                  alt="logo "
                  className="hover:scale-110 duration-150  h-[50px] w-[150px]  bg-white shadow-md "
                />
              </Link>
            );
          })}
        </div>
      </div>
      <div className="block md:hidden bg-gray-100 py-2">
        <Marquee>
          {PHONEBRANDS?.map((brand: brandType) => {
            return (
              <Link
                key={brand?.name}
                to={`brand${brand?.link}`}
                className=" flex items-center  w-20 mr-3"
              >
                <img
                  src={brand?.image}
                  alt="logo "
                  className="hover:scale-110 duration-150 w-full h-[35px]  bg-white shadow-md "
                />
              </Link>
            );
          })}
        </Marquee>
      </div>
    </div>
  );
};
export default Brands;
