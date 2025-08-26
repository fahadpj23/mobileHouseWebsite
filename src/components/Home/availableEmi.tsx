import { useMemo } from "react";
import Marquee from "react-fast-marquee";
import LazyImage from "components/commonComponents/imageLazyLoading";
import { AvailableEmiItems } from "constants/availableEmiItem";
import { AVAILABLEEMIMODEL } from "model/availableEmiModel";

const AvailableEmi = () => {
  // Memoize the EMI items to prevent recreation on every render
  const emiItems = useMemo(() => AvailableEmiItems || [], []);

  // Memoize the rendered EMI logos
  const renderedEmiLogos = useMemo(
    () =>
      emiItems.map((emi: AVAILABLEEMIMODEL) => (
        <div key={emi.name} className="mr-3 md:mr-5">
          <div className="w-[20vw] md:w-[8vw] h-[20px] md:h-[30px] bg-white">
            <LazyImage src={emi.image} alt={`${emi.name} logo`} />
          </div>
        </div>
      )),
    [emiItems]
  );

  if (emiItems.length === 0) return null;

  return (
    <div className="flex items-center bg-white">
      <h1 className="px-2 z-20 text-sm text-center font-semibold w-[40vw] md:w-[10vw]">
        Available EMI
      </h1>
      <Marquee
        direction="left"
        speed={50} // Added speed control for better performance
        gradient={false} // Disable gradient for better performance
        pauseOnHover={true}
      >
        {renderedEmiLogos}
      </Marquee>
    </div>
  );
};

export default AvailableEmi;
