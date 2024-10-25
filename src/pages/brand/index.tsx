import { getBrandPhones } from "utils/getBrandPhone";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SingleProductCard from "components/commonComponents/SingleProductCard";

const Brand = () => {
  const { brandName } = useParams();
  const [phoneList, setPhoneList] = useState<any>([]);
  useEffect(() => {
    brandName && setPhoneList(getBrandPhones(brandName));
  }, [brandName]);
  console.log(phoneList);
  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-5 gap:3 md:gap-5">
        {phoneList?.length &&
          phoneList?.map((product: any) => {
            return <SingleProductCard product={product} key={product?.name} />;
          })}
      </div>
    </div>
  );
};
export default Brand;
