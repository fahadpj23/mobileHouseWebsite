import { FC, useState } from "react";
import { Link } from "react-router-dom";

import { List, ListItem, SwipeableDrawer } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

import SocialMediaItems from "constants/socialMediaItems";
import DynamicMuiIcon from "utils/dynamicMuiIcon";

interface props {
  NAVIGATIONITEMS: any;
}

const SideDrawar: FC<props> = ({ NAVIGATIONITEMS }) => {
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
    <>
      <button className="ml-0 md:ml-4" onClick={toggleDrawer(true)}>
        <MenuIcon />
      </button>
      <SwipeableDrawer
        anchor="left"
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
              <div className="mt-5 space-y-3">
                {NAVIGATIONITEMS.map((navigation: any) => (
                  <ListItem key={navigation.title}>
                    <Link
                      className="w-full flex space-x-4 items-center "
                      to={navigation.link}
                    >
                      <div className="">{navigation?.icon}</div>
                      <h1 className="font-semibold text-sm">
                        {navigation?.title}
                      </h1>
                    </Link>
                  </ListItem>
                ))}
              </div>
            </>
          </List>
        </div>
      </SwipeableDrawer>
    </>
  );
};
export default SideDrawar;
