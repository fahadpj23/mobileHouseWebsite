import DynamicMuiIcon from "utils/dynamicMuiIcon";
import SocialMediaItems from "constants/socialMediaItems";
import { NAVIGATIONITEMS } from "constants/navigationItems";
import { Link } from "react-router-dom";
import { Divider } from "@mui/material";
import mobileHouseLogo from "assets/mobileHouseLogo.png";

const Footer = () => {
  const companyDetails = (title: String, content: any, icon: any) => (
    <div>
      <div className="flex space-x-2 font-medium">
        <div className="flex flex-col space-y-2">
          <h1 className=" font-semibold tracking-wider my-1 text-xl">
            {title}
          </h1>
          <div
            className=" text-sm tracking-wider text-gray-500"
            dangerouslySetInnerHTML={{ __html: content }}
          ></div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <Divider />
      <div className=" block md:flex justify-between  p-2 md:p-5 ">
        <div className="  block space-y-3 md:space-y-0 space-x-0 md:space-x-1 items-start font-light  ">
          <div className="space-y-4">
            {companyDetails(
              "phone",
              `<h1 >
            <span>+91 8304830868</span><br>
            <span>+91 9072430483</span><br>
            
          </h1>`,
              "LocalPhone"
            )}
            {companyDetails(
              "Location",
              `<h1>
            <span>3way junction</span><br>
            <span>P.o Peringottukara,Thrissur</span><br>
            <span>680565</span>
            </h1>`,
              "LocationOn"
            )}
          </div>
          <div className="flex space-x-4 mt-5 ml-10 md:ml-0 py-4 items-center text-sm md:text-lg ">
            {SocialMediaItems?.map((item: any) => (
              <a key={item?.name} href={item?.link}>
                <DynamicMuiIcon key={item?.name} iconName={item.icon} />
              </a>
            ))}
            <a
              className="w-full md:w-1/2 "
              href="https://maps.app.goo.gl/fXMgtGiJXBZQ1Jh86?g_st=ac"
              target="_blank"
            >
              <DynamicMuiIcon iconName={"RoomOutlined"} />
            </a>
          </div>
        </div>

        <div className=" hidden md:flex">
          <img
            src={mobileHouseLogo}
            alt="banner"
            className="mt-3 md:mt-0 h-[40px] w-[180px] md:h-[60px] md:w-[250px]"
          />
        </div>

        <div className=" space-y-3 hidden md:flex flex-col font-semibold">
          <h1 className="text-lg md:text-2xl  tracking-widest">Links</h1>
          {NAVIGATIONITEMS?.map((navigation) => {
            return (
              <div className="block  " key={navigation?.title}>
                <Link
                  className=" font-light   flex space-x-2 items-center"
                  to={navigation?.link}
                >
                  <h1 className=" text-sm font-semibold text-blue-500">
                    {navigation?.title}
                  </h1>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};
export default Footer;
