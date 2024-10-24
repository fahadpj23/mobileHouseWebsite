import SingleProductCard from "components/commonComponents/SingleProductCard";
import { FC } from "react";

interface props {
  title: string;
  listItems: any;
}
const ProductMiniList: FC<props> = ({ title, listItems }) => {
  return (
    <div>
      <h1 className="font-semibold text-lg w-full">{title}</h1>
      <div className=" mt-2  grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-5 ">
        {listItems?.map((product: any) => (
          <SingleProductCard product={product} />
        ))}
      </div>
    </div>
  );
};
export default ProductMiniList;
