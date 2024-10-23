import mobileHouseLogo from "assets/mobileHouseLogo.png";
import Naviagtion from "./navigation";
import SocialMedia from "./socialMedia";
const MainLayout = ({ children }: any) => {
  return (
    <>
      <div className="p-3  flex justify-between w-screen items-center">
        <img src={mobileHouseLogo} height={260} width={300} />
        <Naviagtion />
        <SocialMedia />
      </div>
      <main>{children}</main>
    </>
  );
};
export default MainLayout;
