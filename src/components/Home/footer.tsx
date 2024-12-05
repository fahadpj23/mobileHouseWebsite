import DynamicMuiIcon from "utils/dynamicMuiIcon";
import SocialMediaItems from "constants/socialMediaItems";
import { NAVIGATIONITEMS } from "constants/navigationItems";
import { Link } from "react-router-dom";

const Footer = () => {
  const companyDetails = (title: String, content: any, icon: any) => (
    <div>
      <div className="flex space-x-2">
        <div className="text-orange-500">
          <DynamicMuiIcon iconName={icon} />
        </div>
        <div className="flex flex-col space-y-2">
          <h1 className="uppercase text-white my-1">{title}</h1>
          <div
            className=" text-sm"
            dangerouslySetInnerHTML={{ __html: content }}
          ></div>
        </div>
      </div>
    </div>
  );

  return (
    <div className=" block md:flex justify-between bg-gray-700 p-2 md:p-5 text-white">
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

      <div className=" flex-col items-center hidden md:flex">
        <h1 className="italic text-[50px]">Mobile House</h1>
        <h1 className="italic text-2xl">Sales & Service</h1>
      </div>

      {/* <a
        className="w-full md:w-1/2 "
        href="https://maps.app.goo.gl/fXMgtGiJXBZQ1Jh86?g_st=ac"
        target="_blank"
      >
        <iframe
          className="w-full h-48 md:h-full pointer-events-none"
          src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=C48P+F5%20Peringottukara,%20Kerala,%20India+(Mobile%20House)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
        ></iframe>
      </a> */}
      <div className=" space-y-3 hidden md:flex flex-col">
        <h1 className="text-lg md:text-2xl font-semibold">Links</h1>
        {NAVIGATIONITEMS?.map((navigation) => {
          return (
            <div className="block  " key={navigation?.title}>
              <Link
                className=" font-light   flex space-x-2 items-center"
                to={navigation?.link}
              >
                {/* <div className="">{navigation?.icon}</div> */}
                <h1 className=" text-sm">{navigation?.title}</h1>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default Footer;
