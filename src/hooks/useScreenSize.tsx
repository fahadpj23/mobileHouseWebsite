import { useState, useEffect } from "react";
import { SCREENSIZES } from "constants/screenSize";

export const useScreenSize = () => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return {
    isMobile: screenWidth < SCREENSIZES.TABLET,
    isTablet:
      screenWidth >= SCREENSIZES.TABLET && screenWidth < SCREENSIZES.DESKTOP,
    isDesktop: screenWidth >= SCREENSIZES.DESKTOP,
    screenWidth,
  };
};
