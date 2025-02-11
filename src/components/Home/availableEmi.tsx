import Marquee from "react-fast-marquee";
import LazyImage from "components/commonComponents/imageLazyLoading";
import { AvailableEmiItems } from "constants/availableEmiItem";
import { AVAILABLEEMIMODEL } from "model/availableEmiModel";

const AvailableEmi = () => {
  return (
    <div className="flex items-center bg-white">
      <h1 className="px-2 z-20 text-sm text-center font-semibold w-[40vw] md:w-[10vw] ">
        Available Emi
      </h1>
      <Marquee direction="left">
        {AvailableEmiItems?.map((emi: AVAILABLEEMIMODEL) => {
          return (
            <div key={emi?.name} className="mr-3 md:mr-5">
              <div className=" w-[20vw] md:w-[8vw] h-[20px] md:h-[30px]  bg-white  ">
                <LazyImage src={emi?.image} alt="emiLogo " />
              </div>
            </div>
          );
        })}
      </Marquee>
    </div>
  );
};
export default AvailableEmi;
