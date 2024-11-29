import mobileHouseLogo from "assets/mobileHouseLogo.png";
import DynamicMuiIcon from "utils/dynamicMuiIcon";
import SocialMediaItems from "constants/socialMediaItems";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

const Footer = () => {
  const companyDetails = (title: String, content: any, icon: any) => (
    <div>
      <div className="flex">
        <DynamicMuiIcon iconName={icon} />
        <div className="flex flex-col space-y-2">
          <h1 className="uppercase text-white">{title}</h1>
          <div dangerouslySetInnerHTML={{ __html: content }}></div>
        </div>
      </div>
    </div>
  );

  return (
    <div className=" justify-between flex w-full relative  left-0 text-white">
      <div className="w-1/2 flex flex-col items-center justify-center  bg-[#040637] p-3">
        <div className="space-y-2">
          {companyDetails(
            "phone",
            `<h1>
            <span>8304830868</span><br>
            <span>9072430483</span><br>
            
          </h1>`,
            "LocalPhone"
          )}
          {companyDetails(
            "Location",
            `<h1>
            <span>3way junction</span><br>
            <span>P.O Peringottukara</span><br>
            <span>Thrissur</span><br>
            <span>680565</span>
            </h1>`,
            "LocationOn"
          )}
        </div>
        <div className="flex space-x-3">
          {SocialMediaItems?.map((item: any) => (
            <a key={item?.name} href={item?.link}>
              <DynamicMuiIcon key={item?.name} iconName={item.icon} />
            </a>
          ))}
        </div>
      </div>
      <div>location</div>
    </div>
  );
};
export default Footer;
