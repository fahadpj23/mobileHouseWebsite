import mobileHouseLogo from "assets/mobileHouseLogo.png";
import Naviagtion from "./navigation";
import SocialMedia from "./socialMedia";
import SideDrawar from "./sideDrawar";
const MainLayout = ({ children }: any) => {
  return (
    <div className="p-5">
      <div className="  flex justify-between w-screen items-center">
        <SideDrawar />
        <img src={mobileHouseLogo} height={260} width={300} />
        <Naviagtion />
        <SocialMedia />
      </div>
      <main>{children}</main>
    </div>
  );
};
export default MainLayout;
