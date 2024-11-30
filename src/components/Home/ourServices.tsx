import MOBILESERVICES from "assets/ourServices/mobileService.jpg";
import SIMACTIVATION from "assets/ourServices/simActivation.jpg";
import COVERPRINTING from "assets/ourServices/mobileCoverPrinting.jpg";
const OurServices = () => {
  const services = (image: any, title: string, content: string) => (
    <div className="flex flex-col items-center space-y-3">
      <img
        src={image}
        alt="service image"
        className="rounded-lg md:rounded-2xl h-44 md:h-56 w-[80vw] md:w-[20vw]"
      />
      <h1 className="font-semibold text-base md:text-xl">{title}</h1>
      <h1 className="text-sm w-2/3 md:w-[14vw] text-gray-500 text-center">
        {content}
      </h1>
    </div>
  );
  return (
    <div className="w-full flex flex-col items-center my-3">
      <h1 className="text-lg md:text-2xl font-semibold uppercase  my-4 text-white  bg-blue-400 p-1 md:p-2 tracking-wider">
        Our Services
      </h1>
      <div className="block md:flex space-x-0 md:space-x-10 space-y-10 md:space-y-0">
        {services(
          COVERPRINTING,
          "customized mobile Cover Printing",
          " we have custom mobile covers for majority of smartphone models available at very low price"
        )}
        {services(
          MOBILESERVICES,
          "Mobile Service",
          "we provide all kinds of mobile services like display,  Battery,Software Upgrading, etc..."
        )}
        {services(
          SIMACTIVATION,
          "Sim Activation",
          "Airtel,jio,vi,bsnl sim activation and porting available"
        )}
      </div>
    </div>
  );
};
export default OurServices;
