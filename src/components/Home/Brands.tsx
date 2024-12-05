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
        <div className="grid grid-cols-3 md:grid-cols-6 bg-grayBackground p-3 w-full gap-2 place-items-center ">
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
                  className="hover:scale-110 duration-150 h-[35px] md:h-[50px] w-[90px] md:w-[150px]  bg-white shadow-md "
                />
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default Brands;
