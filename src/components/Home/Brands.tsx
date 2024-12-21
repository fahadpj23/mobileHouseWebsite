import LazyImage from "components/commonComponents/imageLazyLoading";
import { PHONEBRANDS } from "constants/phoneBrands";
import { Link } from "react-router-dom";

interface brandType {
  name: string;
  image: string;
  link: string;
}
const Brands = () => {
  return (
    <div>
      <div className="  w-full mb-3">
        <div className="w-full flex bg-grayBackground p-2 justify-start md:justify-center overflow-x-auto scrollbar-hide px-3  ">
          <div className=" flex space-x-2 md:space-x-4 ">
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
      </div>
    </div>
  );
};
export default Brands;
