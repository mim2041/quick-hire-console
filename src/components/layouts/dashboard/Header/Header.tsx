// Header.tsx
import React from "react";
import { Layout, Button, Breadcrumb, Space } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Link, useLocation } from "react-router-dom";

import { routes } from "../../../../config/routes";
import UserMenu from "./UserMenu";

interface HeaderProps {
  collapsed: boolean;
  toggleSidebar: () => void;
}

const { Header: AntHeader } = Layout;

const Header: React.FC<HeaderProps> = ({ collapsed, toggleSidebar }) => {
  const location = useLocation();

  // Generate breadcrumbs based on current path
  const generateBreadcrumbs = () => {
    const pathSegments = location.pathname.split("/").filter(Boolean);
    const breadcrumbs = [
      {
        title: <Link to={routes.dashboard.root}>Dashboard</Link>,
      },
    ];

    if (pathSegments.length > 1) {
      const currentPage = pathSegments[pathSegments.length - 1];
      const formattedPage = currentPage
        .split("-")
        .map((word) => word?.charAt(0).toUpperCase() + word?.slice(1))
        .join(" ");

      breadcrumbs.push({
        title: <span>{formattedPage}</span>,
      });
    }

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  return (
    <AntHeader
      style={{
        height: "48px",
        padding: "0 24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#ffffff",
        // borderBottom: "1px solid #f0f0f0",
        position: "sticky",
        top: 0,
        zIndex: 10,
        boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.03)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", flex: 1 }}>
        <Button
          type="text"
          icon={collapsed ? <MenuFoldOutlined /> : <MenuUnfoldOutlined />}
          onClick={toggleSidebar}
          style={{
            width: "48px",
            height: "48px",
            fontSize: "18px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        />

        {breadcrumbs && breadcrumbs.length > 0 && (
          <Breadcrumb style={{ marginLeft: "16px" }} items={breadcrumbs} />
        )}
      </div>

      <Space size="middle">
        {/* Add other header items here (notifications, search, etc.) */}
        <UserMenu />
      </Space>
    </AntHeader>
  );
};

export default Header;
