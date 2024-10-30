import { List, ListItem, SwipeableDrawer } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import { NAVIGATIONITEMS } from "constants/navigationItems";
import { Link } from "react-router-dom";
import SocialMediaItems from "constants/socialMediaItems";
import DynamicMuiIcon from "utils/dynamicMuiIcon";

const SideDrawar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = (open: any) => (event: any) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setIsDrawerOpen(open);
  };

  return (
    <div className=" block md:hidden">
      <button className="fixed top-2 right-3 " onClick={toggleDrawer(true)}>
        <MenuIcon />
      </button>
      <SwipeableDrawer
        anchor="right"
        open={isDrawerOpen}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
      >
        <div
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
          style={{ width: 250 }}
        >
          <List>
            <>
              <div className="flex justify-end space-x-3 mr-3">
                {SocialMediaItems?.map((item: any) => (
                  <a key={item?.name} href={item?.link}>
                    <DynamicMuiIcon iconName={item.icon} />
                  </a>
                ))}
              </div>
              {NAVIGATIONITEMS.map((navigation, index) => (
                <ListItem key={navigation.title}>
                  <Link className="w-full " to={navigation.link}>
                    {navigation?.title}
                  </Link>
                </ListItem>
              ))}
            </>
          </List>
        </div>
      </SwipeableDrawer>
    </div>
  );
};
export default SideDrawar;
