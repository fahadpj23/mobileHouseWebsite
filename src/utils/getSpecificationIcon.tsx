import DynamicMuiIcon from "./dynamicMuiIcon";

export const getSpecificationIcon = (specName: string) => {
  switch (specName) {
    case "Processor":
      return <DynamicMuiIcon iconName={"Memory"} />;
    case "Display":
      return <DynamicMuiIcon iconName={"TabletAndroid"} />;
    case "Rear Camera":
      return <DynamicMuiIcon iconName={"CameraAltOutlined"} />;
    case "Front Camera":
      return <DynamicMuiIcon iconName={"PhotoCameraFrontOutlined"} />;
    case "RAM | Storage":
      return <DynamicMuiIcon iconName={"SdCardOutlined"} />;
    case "Battery":
      return <DynamicMuiIcon iconName={"BatteryCharging20Outlined"} />;
    case "Network":
      return <DynamicMuiIcon iconName={"SimCardOutlined"} />;
    case "OS":
      return <DynamicMuiIcon iconName={"AndroidOutlined"} />;
    default:
      return "";
  }
};
