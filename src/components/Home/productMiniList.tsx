import { FC, useMemo } from "react";
import { Link } from "react-router-dom";
import SingleProductCard from "components/commonComponents/singleProductCard";
import { PHONEMODEL } from "model/phoneModel";
import ProductCardSkeleton from "./productCardSkeleton"; // Extract skeleton to separate component

interface Props {
  title: string;
  listItems: PHONEMODEL[];
  link: string;
}

const ProductMiniList: FC<Props> = ({ title, listItems, link }) => {
  const displayItems = useMemo(
    () => (Array.isArray(listItems) ? listItems.slice(0, 6) : []),
    [listItems]
  );

  const hasItems = displayItems.length > 0;

  return (
    <div>
      <div className="flex justify-between pb-2 items-center">
        <h1 className="font-semibold text-sm md:text-lg">{title}</h1>
        {hasItems && (
          <div className="flex space-x-1 text-xs items-center">
            <Link to={`Phones${link}`} className="text-blue-600">
              show more
            </Link>
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5 items-center">
        {hasItems ? (
          displayItems.map((product) => (
            <SingleProductCard
              key={`${product.id}-${product.name}`}
              product={product}
            />
          ))
        ) : (
          <SkeletonItems />
        )}
      </div>
    </div>
  );
};

// Extracted skeleton component for better readability
const SkeletonItems: FC = () => (
  <>
    {[...Array(6)].map((_, index) => (
      <ProductCardSkeleton key={index} />
    ))}
  </>
);

export default ProductMiniList;
