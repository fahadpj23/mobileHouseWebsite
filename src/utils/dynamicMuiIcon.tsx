import React from "react";
import * as MuiIcons from "@mui/icons-material";

type MuiIconKeys = keyof typeof MuiIcons;

interface DynamicIconProps {
  iconName: MuiIconKeys;
}

const DynamicMuiIcon: React.FC<DynamicIconProps> = ({ iconName }) => {
  const IconComponent = MuiIcons[iconName];
  return IconComponent ? <IconComponent /> : <div>Icon not found</div>;
};

export default DynamicMuiIcon;
