import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import { ADMINNAVIGATIONITEMS } from "constants/admin/adminNavigationItem";
import SideDrawar from "./sideDrawar";

const AdminMainLayout = ({ children }: any) => {
  return (
    <div className="p-1 ">
      <div className=" flex  justify-between w-full items-center">
        <SideDrawar NAVIGATIONITEMS={ADMINNAVIGATIONITEMS} />
        <Link
          to="/"
          className="mt-3 md:mt-0 h-[40px] w-[180px] md:h-[60px] md:w-[250px]"
        ></Link>
      </div>
      <main>
        <Outlet />
      </main>
    </div>
  );
};
export default AdminMainLayout;
