import { PHONEBRANDS } from "constants/phoneBrands";

interface brandType {
  name: string;
  image: string;
}
interface brands {
  data: brandType[];
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
            <img
              src={brand?.image}
              alt="logo "
              style={imageStyle}
              className="hover:scale-110 duration-150"
            />
          );
        })}
      </div>
    </div>
  );
};
export default Brands;
