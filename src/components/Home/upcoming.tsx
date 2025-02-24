import LaunchBanner from "components/commonComponents/launchBanner";
import { UPCOMINGITEMS } from "constants/upcomingItems";

const Upcoming = () => {
  return UPCOMINGITEMS?.length ? (
    <LaunchBanner title="upcoming Launches" BannerItems={UPCOMINGITEMS} />
  ) : null;
};
export default Upcoming;
