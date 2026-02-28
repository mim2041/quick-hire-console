import React from "react";
import { Avatar, Typography } from "antd";

interface OrganizationLogoProps {
  organizationName: string;
  logoUrl?: string;
  size?: number;
  showName?: boolean;
  className?: string;
}

const OrganizationLogo: React.FC<OrganizationLogoProps> = ({
  organizationName,
  logoUrl,
  size = 40,
  showName = false,
  className = "",
}) => {
  // Generate initials from organization name
  const getInitials = (name: string): string => {
    return name
      .split(" ")
      .map((word) => word?.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  // Generate a consistent color based on organization name
  const getColorFromName = (name: string): string => {
    const colors = [
      "#1890ff", // blue
      "#52c41a", // green
      "#fa8c16", // orange
      "#f5222d", // red
      "#722ed1", // purple
      "#13c2c2", // cyan
      "#eb2f96", // magenta
      "#faad14", // gold
    ];

    const hash = name.split("").reduce((acc, char) => {
      return char.charCodeAt(0) + ((acc << 5) - acc);
    }, 0);

    return colors[Math.abs(hash) % colors.length];
  };

  const initials = getInitials(organizationName);
  const backgroundColor = getColorFromName(organizationName);

  return (
    <div
      className={`flex items-center ${showName ? "gap-x-3" : ""} ${className}`}
    >
      <Avatar
        size={size}
        src={logoUrl}
        style={logoUrl ? {} : { backgroundColor }}
        className="flex items-center justify-center font-semibold text-white shadow-sm"
      >
        {!logoUrl && initials}
      </Avatar>
      {showName && (
        <Typography.Text
          strong
          className="text-sm text-gray-800 truncate"
          style={{
            fontSize: "13px",
            lineHeight: "18px",
            fontWeight: 600,
          }}
        >
          {organizationName}
        </Typography.Text>
      )}
    </div>
  );
};

export default OrganizationLogo;
