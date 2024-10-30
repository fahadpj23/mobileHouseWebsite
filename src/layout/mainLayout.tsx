import { useNavigate } from "react-router-dom";
import mobileHouseLogo from "assets/mobileHouseLogo.png";
import Naviagtion from "./navigation";
import SocialMedia from "./socialMedia";
import SideDrawar from "./sideDrawar";
const MainLayout = ({ children }: any) => {
  const navigate = useNavigate();
  return (
    <div className="p-1 md:p-5">
      <div className=" flex  justify-center md:justify-between w-full items-center">
        <SideDrawar />
        <img
          src={mobileHouseLogo}
          className="mt-3 md:mt-0 h-[40px] w-[180px] md:h-[60px] md:w-[250px]"
          onClick={() => navigate("/")}
        />
        <Naviagtion />
        <SocialMedia />
      </div>

      <main>{children}</main>
    </div>
  );
};
export default MainLayout;
