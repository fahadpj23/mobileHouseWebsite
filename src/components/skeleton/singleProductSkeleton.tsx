const SingleProductSkeleton = () => {
  return (
    <div className="p-3 md:p-6 flex flex-col space-y-2 bg-white relative rounded-md animate-pulse">
      {/* Image Container */}
      <div className="flex justify-center bg-gray-200 rounded-md shadow-md p-2">
        <div className="w-full h-[150px] md:h-[170px] bg-gray-300 rounded"></div>
      </div>

      {/* Content Container */}
      <div className="flex flex-col space-y-3">
        {/* Product Title */}
        <div className="h-4 bg-gray-300 rounded w-4/5"></div>

        {/* Discount Badge (always shown in skeleton) */}
        <div className="absolute top-3 right-3 bg-gray-300 text-white rounded p-1 w-10 h-6"></div>

        {/* Price Section */}
        <div className="flex space-x-3 items-center">
          <div className="h-5 bg-gray-300 rounded w-12"></div>
          <div className="h-4 bg-gray-300 rounded w-8"></div>
        </div>

        {/* Rating Section */}
        <div className="flex space-x-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <div key={star} className="w-3 h-3 bg-gray-300 rounded"></div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default SingleProductSkeleton;
