import { useAppDispatch, useAppSelector } from "hooks/useRedux";
import { fetchUpcoming } from "store/slice/upcomingSlice";

import LaunchBanner from "components/commonComponents/launchBanner";
import { useEffect } from "react";

const Upcoming = () => {
  const dispatch = useAppDispatch();
  const { entities: upcoming } = useAppSelector((state) => state.user.upcoming);

  useEffect(() => {
    dispatch(fetchUpcoming());
  }, []);

  return Array.isArray(upcoming) && upcoming?.length ? (
    <LaunchBanner title="upcoming Launches" BannerItems={upcoming} />
  ) : null;
};
export default Upcoming;
