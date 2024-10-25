import DynamicMuiIcon from "utils/dynamicMuiIcon";
import SocialMediaItems from "constants/socialMediaItems";

const SocialMedia = () => {
  return (
    <div className="hidden space-x-4  md:flex mr-10">
      {SocialMediaItems?.map((item: any) => (
        <DynamicMuiIcon iconName={item.icon} />
      ))}
    </div>
  );
};
export default SocialMedia;
