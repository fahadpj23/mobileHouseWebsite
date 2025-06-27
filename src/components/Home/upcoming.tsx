import { useAppDispatch, useAppSelector } from "hooks/useRedux";
import { fetchUpcoming } from "store/slice/upcomingSlice";
import { fetchNewArrivals } from "store/slice/newArrivalSlice";
import LaunchBanner from "components/commonComponents/launchBanner";
import { UPCOMINGITEMS } from "constants/upcomingItems";
import { useEffect } from "react";

const Upcoming = () => {
  const dispatch = useAppDispatch();
  const { entities: upcoming } = useAppSelector(
    (state) => state.user.newArrival
  );

  useEffect(() => {
    dispatch(fetchUpcoming());
  }, []);

  return upcoming?.length ? (
    <LaunchBanner title="upcoming Launches" BannerItems={upcoming} />
  ) : null;
};
export default Upcoming;
