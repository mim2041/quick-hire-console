// UserMenu.tsx
import React from "react";
import { Dropdown, Avatar, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import {
  LogoutOutlined,
  DownOutlined,
} from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "../../../../core/store/hooks";
import { logout } from "../../../../features/auth/store/authSlice";
import { selectUser } from "../../../../features/auth/store/authSelectors";
import { routes } from "../../../../config/routes";

const { Text } = Typography;

const UserMenu: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);

  const handleLogout = () => {
    dispatch(logout());
    navigate(routes.auth.login);
  };

  const menuItems = [
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: "Logout",
      danger: true,
      onClick: handleLogout,
    },
  ];

  const userName = user?.name || "User";
  const userRole = user?.role || "admin";

  // Get initials for avatar
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  // Format role for display
  const formatRole = (role: string) => {
    return role
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  // Don't render if no user data
  if (!user) {
    return null;
  }

  return (
    <Dropdown
      menu={{ items: menuItems }}
      placement="bottomRight"
      arrow={{ pointAtCenter: true }}
      trigger={["click"]}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          padding: "6px 12px 6px 6px",
          borderRadius: "8px",
          cursor: "pointer",
          transition: "all 0.3s ease",
          backgroundColor: "#ffffff",
        }}
        className="user-menu-trigger"
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = "#fafafa";
          e.currentTarget.style.borderColor = "#d9d9d9";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = "#ffffff";
          e.currentTarget.style.borderColor = "#f0f0f0";
        }}
      >
        <Avatar
          size={32}
          style={{
            backgroundColor: "#1890ff",
            fontSize: "12px",
            fontWeight: 600,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {getInitials(userName)}
        </Avatar>
        <div style={{ display: "flex", flexDirection: "column", minWidth: 0 }}>
          <Text
            strong
            style={{
              fontSize: "14px",
              color: "#262626",
              lineHeight: "20px",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              maxWidth: "150px",
            }}
          >
            {userName}
          </Text>
          <Text
            type="secondary"
            style={{
              fontSize: "12px",
              lineHeight: "16px",
              whiteSpace: "nowrap",
            }}
          >
            {formatRole(userRole)}
          </Text>
        </div>
        <DownOutlined
          style={{
            fontSize: "10px",
            color: "#8c8c8c",
            marginLeft: "4px",
          }}
        />
      </div>
    </Dropdown>
  );
};

export default UserMenu;
