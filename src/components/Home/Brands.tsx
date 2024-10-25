import { PHONEBRANDS } from "constants/phoneBrands";
import { Link } from "react-router-dom";

interface brandType {
  name: string;
  image: string;
  link: string;
}

const Brands = () => {
  const imageStyle = {
    width: "180px",
    height: "80px",
    borderRadius: "5px",
  };

  return (
    <div className="flex justify-center">
      <div className="flex space-x-9">
        {PHONEBRANDS?.map((brand: brandType) => {
          return (
            <Link key={brand?.name} to={`brand${brand?.link}`}>
              <img
                src={brand?.image}
                alt="logo "
                style={imageStyle}
                className="hover:scale-110 duration-150"
              />
            </Link>
          );
        })}
      </div>
    </div>
  );
};
export default Brands;
