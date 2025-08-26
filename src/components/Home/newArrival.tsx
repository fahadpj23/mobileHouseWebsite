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

  if (!shouldRenderBanner) return null;

  return <LaunchBanner title="New Arrivals" BannerItems={newArrival} />;
};

export default NewArrival;
