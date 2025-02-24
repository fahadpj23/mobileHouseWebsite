import LaunchBanner from "components/commonComponents/launchBanner";
import { NEWARRIVALITEMS } from "constants/newArrivalItems";

const NewArrival = () => {
  return NEWARRIVALITEMS?.length ? (
    <LaunchBanner title="Just Launched" BannerItems={NEWARRIVALITEMS} />
  ) : null;
};
export default NewArrival;
