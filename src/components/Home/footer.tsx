import DynamicMuiIcon from "utils/dynamicMuiIcon";
import SocialMediaItems from "constants/socialMediaItems";

const Footer = () => {
  const companyDetails = (title: String, content: any, icon: any) => (
    <div>
      <div className="flex space-x-2">
        <div className="text-orange-500">
          <DynamicMuiIcon iconName={icon} />
        </div>
        <div className="flex flex-col space-y-2">
          <h1 className="uppercase text-white">{title}</h1>
          <div
            className="text-gray-400 text-sm"
            dangerouslySetInnerHTML={{ __html: content }}
          ></div>
        </div>
      </div>
    </div>
  );

  return (
    <div className=" justify-between block md:flex  w-full relative  left-0 text-white">
      <div className="w-full md:w-1/2 flex flex-col items-start md:items-center justify-center  bg-black p-3">
        <div className="space-y-2">
          {companyDetails(
            "phone",
            `<h1 >
            <span>8304830868</span><br>
            <span>9072430483</span><br>
            
          </h1>`,
            "LocalPhone"
          )}
          {companyDetails(
            "Location",
            `<h1>
            <span>3way junction</span><br>
            <span>P.o Peringottukara</span><br>
            <span>Thrissur</span><br>
            <span>680565</span>
            </h1>`,
            "LocationOn"
          )}
        </div>
        <div className="flex space-x-4 mt-5 ml-6">
          {SocialMediaItems?.map((item: any) => (
            <a key={item?.name} href={item?.link}>
              <DynamicMuiIcon key={item?.name} iconName={item.icon} />
            </a>
          ))}
        </div>
      </div>
      <a
        className="w-full md:w-1/2 "
        href="https://maps.app.goo.gl/fXMgtGiJXBZQ1Jh86?g_st=ac"
        target="_blank"
      >
        <iframe
          className="w-full h-48 md:h-full pointer-events-none"
          src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=C48P+F5%20Peringottukara,%20Kerala,%20India+(Mobile%20House)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
        ></iframe>
      </a>
    </div>
  );
};
export default Footer;
