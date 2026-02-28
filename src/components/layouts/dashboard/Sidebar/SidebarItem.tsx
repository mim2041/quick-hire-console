import React from "react";
import * as AntdIcons from "@ant-design/icons";

interface SidebarItemProps {
  icon: string;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon }) => {
  // Dynamically render the icon based on the icon name
  const Icon = (AntdIcons as any)[icon];

  if (!Icon || typeof Icon !== "function") {
    // Fallback to a default icon if the specified icon doesn't exist
    return <AntdIcons.AppstoreOutlined />;
  }

  return <Icon />;
};

export default SidebarItem;
