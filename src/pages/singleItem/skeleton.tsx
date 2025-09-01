const Skeleton = () => {
  return (
    <div className="block md:flex items-center animate-pulse">
      {/* Image Section */}
      <input autoFocus className="w-0 h-0 " readOnly />
      <div className="flex justify-center w-full md:w-1/2">
        <div className="flex flex-col justify-center items-center">
          <div className="p-3 w-screen mb-3 flex justify-center">
            {/* Main Image Skeleton */}
            <div className="w-[80vw] h-[50vh] md:w-[30vw] md:h-[30vw] flex justify-center items-center">
              <div className="w-full h-full bg-gray-300 rounded-lg"></div>
            </div>
          </div>

          {/* Thumbnail Skeleton (Desktop only) */}
          <div className="hidden md:flex space-x-3 justify-center w-full">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="p-1 border border-gray-200 rounded-md w-20 h-16 bg-gray-300"
              ></div>
            ))}
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="w-full md:w-1/2 mt-0 md:mt-10">
        <div className="space-y-2 ml-3 md:ml-6">
          {/* Product Title Skeleton */}
          <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>

          {/* Price Section Skeleton */}
          <div className="flex items-center space-x-2 text-base">
            <div className="h-6 bg-gray-300 rounded w-16"></div>
            <div className="h-4 bg-gray-300 rounded w-12"></div>
            <div className="h-6 bg-gray-300 rounded w-12"></div>
            <div className="h-4 bg-gray-300 rounded w-4"></div>
          </div>

          {/* Prebook Button Skeleton */}
          <div className="h-8 bg-gray-300 rounded w-24 my-2"></div>
        </div>

        <div className="flex flex-col">
          {/* Colors Section Skeleton */}
          <div className="ml-6 mt-6">
            <div className="flex space-x-6">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="flex flex-col items-center">
                  <div className="w-10 h-16 md:w-16 bg-gray-300 rounded"></div>
                  <div className="h-3 bg-gray-300 rounded w-8 mt-1"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Variants Section Skeleton */}
          <div className="grid grid-cols-3 md:grid-cols-5 gap-2 md:gap-4 py-3 ml-2 mt-5 text-center">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div
                key={item}
                className="h-8 bg-gray-300 rounded text-[12px]"
              ></div>
            ))}
          </div>

          {/* Specifications Section Skeleton */}
          <div className="pb-3">
            <div className="space-y-3 py-3">
              <div className="h-5 bg-gray-300 rounded w-32 ml-3 md:ml-6"></div>
              <div className="h-px bg-gray-300 w-full"></div>
            </div>
            <div className="space-y-3 ml-3 md:ml-6 grid grid-cols-1 md:grid-cols-2 gap-5">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                <div key={item} className="flex items-center space-x-2">
                  <div className="w-5 h-5 bg-gray-300 rounded"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-gray-300 rounded w-20 mb-1"></div>
                    <div className="h-4 bg-gray-300 rounded w-16"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Skeleton;
