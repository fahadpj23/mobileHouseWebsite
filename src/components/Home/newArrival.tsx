import { useAppDispatch, useAppSelector } from "hooks/useRedux";
import { fetchNewArrivals } from "store/slice/newArrivalSlice";
import LaunchBanner from "components/commonComponents/launchBanner";
import { useEffect, useMemo } from "react";

const NewArrival = () => {
  const dispatch = useAppDispatch();
  const { entities: newArrival } = useAppSelector(
    (state) => state.user.newArrival
  );

  useEffect(() => {
    dispatch(fetchNewArrivals());
  }, [dispatch]);

  const shouldRenderBanner = useMemo(
    () => Array.isArray(newArrival) && newArrival.length > 0,
    [newArrival]
  );

  if (!shouldRenderBanner)
    return (
      <div className="flex flex-col items-center space-y-4 animate-pulse">
        {/* Title Skeleton */}
        <div className="h-8 md:h-10 bg-gray-300 rounded w-1/3"></div>

        {/* Banner Items Skeleton */}
        <div className="flex flex-col w-full space-y-4">
          {[...Array(3)].map((_, index) => (
            <div
              key={index}
              className="w-full h-32 md:h-48 bg-gray-300 rounded-lg"
            ></div>
          ))}
        </div>
      </div>
    );

  return <LaunchBanner title="New Arrivals" BannerItems={newArrival} />;
};

export default NewArrival;
