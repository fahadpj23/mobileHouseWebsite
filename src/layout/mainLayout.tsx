import { useNavigate } from "react-router-dom";
import mobileHouseLogo from "assets/mobileHouseLogo.png";
import Naviagtion from "./navigation";
import SideDrawar from "./sideDrawar";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { useState } from "react";
import SearchBar from "./searchBar";
import { useScreenSize } from "hooks/useScreenSize";
import DesktopSearch from "./desktopSearch";

const MainLayout = ({ children }: any) => {
  const navigate = useNavigate();
  const [isSearchOpen, setSearchOpen] = useState(false);
  const { isMobile } = useScreenSize();
  return (
    <div className="p-1 md:p-5">
      <div className=" flex  justify-between w-full items-center">
        <SideDrawar />
        <img
          src={mobileHouseLogo}
          alt="banner"
          className="mt-3 md:mt-0 h-[40px] w-[180px] md:h-[60px] md:w-[250px]"
          onClick={() => navigate("/")}
        />
        {isMobile ? (
          <div className="block md:hidden ">
            <button onClick={() => setSearchOpen(true)}>
              <SearchOutlinedIcon />
            </button>
            {isSearchOpen && <SearchBar setSearchOpen={setSearchOpen} />}
          </div>
        ) : (
          <DesktopSearch />
        )}
        <Naviagtion />
      </div>
      <main>{children}</main>
    </div>
  );
};
export default MainLayout;
