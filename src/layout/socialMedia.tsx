import DynamicMuiIcon from "utils/dynamicMuiIcon";
import SocialMediaItems from "constants/socialMediaItems";

const SocialMedia = () => {
  return (
    <div className="flex space-x-4">
      {SocialMediaItems?.map((item: any) => (
        <DynamicMuiIcon iconName={item.icon} />
      ))}
    </div>
  );
};
export default SocialMedia;
