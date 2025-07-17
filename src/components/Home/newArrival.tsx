import { useAppDispatch, useAppSelector } from "hooks/useRedux";
import { fetchNewArrivals } from "store/slice/newArrivalSlice";
import LaunchBanner from "components/commonComponents/launchBanner";
import { useEffect } from "react";

const NewArrival = () => {
  const dispatch = useAppDispatch();
  const { entities: newArrival } = useAppSelector(
    (state) => state.user.newArrival
  );

  useEffect(() => {
    dispatch(fetchNewArrivals());
  }, []);
  console.log(newArrival);

  return (
    <>
      {Array.isArray(newArrival) && newArrival?.length ? (
        <LaunchBanner title="New Arrivals" BannerItems={newArrival} />
      ) : null}
    </>
  );
};
export default NewArrival;
