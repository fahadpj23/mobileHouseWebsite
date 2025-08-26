// components/commonComponents/ProductCardSkeleton.tsx
import { FC } from "react";

const ProductCardSkeleton: FC = () => (
  <div className="p-3 md:p-6 flex flex-col space-y-2 bg-white relative rounded-md animate-pulse">
    <div className="flex justify-center rounded-md shadow-md p-2">
      <div className="w-full h-[150px] md:h-[170px] object-contain bg-gray-100 rounded"></div>
    </div>
    <div className="flex flex-col space-y-2">
      <div className="h-4 bg-gray-100 rounded w-3/4"></div>
      <div className="h-3 bg-gray-100 rounded w-1/2"></div>
      <div className="flex space-x-3 items-center">
        <div className="h-4 bg-gray-100 rounded w-8"></div>
        <div className="h-3 bg-gray-100 rounded w-8"></div>
      </div>
      <div className="h-3 bg-gray-100 rounded w-1/3"></div>
    </div>
  </div>
);

export default ProductCardSkeleton;
