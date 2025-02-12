import LaunchBanner from "components/commonComponents/launchBanner";
import { NEWARRIVALITEMS } from "constants/newArrivalItems";

const NewArrival = () => {
  return <LaunchBanner title="Just Launched" BannerItems={NEWARRIVALITEMS} />;
};
export default NewArrival;
