import MOBILESERVICES from "assets/ourServices/mobileService.jpg";
import SIMACTIVATION from "assets/ourServices/simActivation.jpg";
import COVERPRINTING from "assets/ourServices/mobileCoverPrinting.jpg";
const OurServices = () => {
  const services = (image: any, title: string, content: string) => (
    <div className="flex flex-col items-center space-y-3">
      <img
        src={image}
        alt="service image"
        className="rounded-2xl h-56 w-[23vw]"
      />
      <h1 className="font-semibold text-xl">{title}</h1>
    </div>
  );
  return (
    <div className="w-full flex flex-col items-center">
      <h1 className="text-2xl font-semibold uppercase  my-4 text-white  bg-blue-400 p-2 tracking-wider">
        Our Services
      </h1>
      <div className="flex space-x-14">
        {services(COVERPRINTING, "customized mobile Cover Printing", "")}
        {services(
          MOBILESERVICES,
          "Mobile Service",
          "we provide all kinds of mobile services like display, Screen &  Battery, camera, speaker replacement,Software Upgrading"
        )}
        {services(SIMACTIVATION, "Sim Activation", "")}
      </div>
    </div>
  );
};
export default OurServices;
