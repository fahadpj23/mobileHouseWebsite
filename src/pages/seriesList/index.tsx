import SingleProductCard from "components/commonComponents/singleProductCard";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const SeriesList = () => {
  const { seriesList } = useParams();
  const [productList, setProductList] = useState<any>([]);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5  gap-2 md:gap-5">
      {productList?.length
        ? productList?.map((product: any) => {
            return <SingleProductCard product={product} key={product?.name} />;
          })
        : null}
    </div>
  );
};
export default SeriesList;
