import { useAppDispatch, useAppSelector } from "hooks/useRedux";
import SingleProductCard from "components/commonComponents/singleProductCard";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchSeriesProducts } from "store/slice/productSlice";

const SeriesList = () => {
  const { seriesId } = useParams();
  const dispatch = useAppDispatch();
  const [productList, setProductList] = useState<any>([]);
  const { entities } = useAppSelector((state) => state.user.products);

  useEffect(() => {
    seriesId && dispatch(fetchSeriesProducts(seriesId));
  }, [seriesId]);
  useEffect(() => {
    entities && setProductList(entities);
  }, [entities]);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5  gap-2 md:gap-5">
      {productList?.length
        ? productList?.map((product: any) => {
            return <SingleProductCard product={product} key={product?.id} />;
          })
        : null}
    </div>
  );
};
export default SeriesList;
