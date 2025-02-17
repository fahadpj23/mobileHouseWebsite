import LaunchBanner from "components/commonComponents/launchBanner";
import { UPCOMINGITEMS } from "constants/upcomingItems";

const Upcoming = () => {
  return <LaunchBanner title="upcoming Launches" BannerItems={UPCOMINGITEMS} />;
};
export default Upcoming;
