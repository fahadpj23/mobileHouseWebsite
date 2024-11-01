import { PHONEBRANDS } from "constants/phoneBrands";
import { Link } from "react-router-dom";

interface brandType {
  name: string;
  image: string;
  link: string;
}

const Brands = () => {
  return (
    <div className="flex justify-center">
      <div className="grid grid-cols-3 md:grid-cols-6 gap-3 md:gap-5 bg-gray-100 p-3 ">
        {PHONEBRANDS?.map((brand: brandType) => {
          return (
            <Link key={brand?.name} to={`brand${brand?.link}`}>
              <img
                src={brand?.image}
                alt="logo "
                className="hover:scale-110 duration-150 w-[95px] h-[40px] rounded-sm md:w-[180px] md:h-[80px] bg-white shadow-md"
              />
            </Link>
          );
        })}
      </div>
    </div>
  );
};
export default Brands;
