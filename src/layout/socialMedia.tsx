import DynamicMuiIcon from "utils/dynamicMuiIcon";
import SocialMediaItems from "constants/socialMediaItems";

const SocialMedia = () => {
  return (
    <div className="hidden space-x-4  md:flex">
      {SocialMediaItems?.map((item: any) => (
        <DynamicMuiIcon key={item?.name} iconName={item.icon} />
      ))}
    </div>
  );
};
export default SocialMedia;
