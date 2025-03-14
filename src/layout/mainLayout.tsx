import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

import mobileHouseLogo from "assets/mobileHouseLogo.png";
import Naviagtion from "./navigation";
import SideDrawar from "./sideDrawar";
import SearchBar from "./searchBar";
import { useScreenSize } from "hooks/useScreenSize";
import DesktopSearch from "./desktopSearch";
import LazyImage from "components/commonComponents/imageLazyLoading";

const MainLayout = ({ children }: any) => {
  const [isSearchOpen, setSearchOpen] = useState(false);
  const { isMobile } = useScreenSize();
  return (
    <div className="p-1 md:p-5">
      <div className=" flex  justify-between w-full items-center">
        <SideDrawar />
        <Link
          to="/"
          className="mt-3 md:mt-0 h-[40px] w-[180px] md:h-[60px] md:w-[250px]"
        >
          <LazyImage src={mobileHouseLogo} alt="banner" />
        </Link>
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
