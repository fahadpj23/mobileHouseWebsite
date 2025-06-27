import LaunchBanner from "components/commonComponents/launchBanner";
import { NEWARRIVALITEMS } from "constants/newArrivalItems";

const NewArrival = () => {
  return NEWARRIVALITEMS?.length ? (
    <LaunchBanner title="Upcoming" BannerItems={NEWARRIVALITEMS} />
  ) : null;
};
export default NewArrival;
