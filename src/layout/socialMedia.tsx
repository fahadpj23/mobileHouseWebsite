import DynamicMuiIcon from "utils/dynamicMuiIcon";
import SocialMediaItems from "constants/socialMediaItems";

const SocialMedia = () => {
  return (
    <div className="hidden space-x-4  md:flex">
      {SocialMediaItems?.map((item: any) => (
        <a key={item?.name} href={item?.link}>
          <DynamicMuiIcon key={item?.name} iconName={item.icon} />
        </a>
      ))}
    </div>
  );
};
export default SocialMedia;
