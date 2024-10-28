import mobileHouseLogo from "assets/mobileHouseLogo.png";
import Naviagtion from "./navigation";
import SocialMedia from "./socialMedia";
import SideDrawar from "./sideDrawar";
const MainLayout = ({ children }: any) => {
  return (
    <div className="p-2 md:p-5">
      <div className=" flex  justify-center md:justify-between w-full items-center">
        <SideDrawar />
        <img
          src={mobileHouseLogo}
          height={260}
          width={300}
          className="mt-3 md:mt-0"
        />
        <Naviagtion />
        <SocialMedia />
      </div>

      <main>{children}</main>
    </div>
  );
};
export default MainLayout;
