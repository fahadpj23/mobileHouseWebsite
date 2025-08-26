import { useAppDispatch, useAppSelector } from "hooks/useRedux";
import { fetchUpcoming } from "store/slice/upcomingSlice";
import LaunchBanner from "components/commonComponents/launchBanner";
import { useEffect, useMemo } from "react";

const Upcoming = () => {
  const dispatch = useAppDispatch();
  const { entities: upcoming } = useAppSelector((state) => state.user.upcoming);

  useEffect(() => {
    dispatch(fetchUpcoming());
  }, [dispatch]);

  const shouldRenderBanner = useMemo(
    () => Array.isArray(upcoming) && upcoming.length > 0,
    [upcoming]
  );

  if (!shouldRenderBanner) return null;

  return <LaunchBanner title="Upcoming Launches" BannerItems={upcoming} />;
};

export default Upcoming;
