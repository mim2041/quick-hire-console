import React from "react";
import { Layout, Menu, Typography, type MenuProps } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import img from "../../../../assets/images.png";
import { menuItems, type MenuItem } from "../../../../config/menuItems";
import SidebarItem from "./SidebarItem";

interface SidebarProps {
  collapsed: boolean;
}

const { Sider } = Layout;

const Sidebar: React.FC<SidebarProps> = ({ collapsed }) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Helpers to work with nested menu items
  const findByKey = (items: MenuItem[], key: string): MenuItem | undefined => {
    for (const it of items) {
      if (it.key === key) return it;
      if (it.children) {
        const found = findByKey(it.children, key);
        if (found) return found;
      }
    }
    return undefined;
  };

  const findByPath = (
    items: MenuItem[],
    path: string
  ): MenuItem | undefined => {
    let bestMatch: MenuItem | undefined;

    const visit = (nodes: MenuItem[]) => {
      for (const it of nodes) {
        if (it.path) {
          if (path === it.path || path.startsWith(`${it.path}/`)) {
            if (!bestMatch || (bestMatch.path && it.path.length > bestMatch.path.length)) {
              bestMatch = it;
            }
          }
        }
        if (it.children) {
          visit(it.children);
        }
      }
    };

    visit(items);
    return bestMatch;
  };

  // Get currently selected key based on path (supports nested)
  const getSelectedKeys = (): string[] => {
    const currentPath = location.pathname;
    const currentItem = findByPath(menuItems, currentPath);
    return currentItem ? [currentItem.key] : ["dashboard"];
  };

  const selectedKeys = getSelectedKeys();

  const handleMenuClick = ({ key }: { key: string }) => {
    const targetItem = findByKey(menuItems, key);
    if (targetItem?.path) {
      navigate(targetItem.path);
    }
  };

  type AntdItemType = Required<MenuProps>["items"][number];

  const buildAntdItems = (items: MenuItem[]): AntdItemType[] =>
    items.map(
      (item): AntdItemType => ({
        key: item.key,
        icon: <SidebarItem icon={item.icon ?? ""} />,
        label: item.label,
        children: item.children ? buildAntdItems(item.children) : undefined,
      })
    );

  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={!collapsed}
      width={256}
      theme="light"
      className="shadow-lg"
      style={{
        overflow: "hidden",
        height: "100vh",
        position: "sticky",
        top: 0,
        left: 0,
      }}
    >
      {/* Organization Header */}
      <div className="flex flex-col h-full">
        {/* SaaS Console Header */}
        <div className="h-16 px-4 border-b border-gray-200 bg-white">
          <div className="flex items-center h-full gap-3">
            <div className="flex-shrink-0">
              <img src={img} alt="QuickHire Console" className="h-16 w-16" />
            </div>

            {!!collapsed && (
              <div className="flex flex-col min-w-0 flex-1">
                <Typography.Text
                  strong
                  className="text-sm text-gray-900 truncate font-medium"
                  style={{
                    fontSize: "13px",
                    lineHeight: "18px",
                    fontWeight: 600,
                  }}
                >
                  QuickHire
                </Typography.Text>
                <Typography.Text
                  type="secondary"
                  className="text-xs truncate"
                  style={{
                    fontSize: "11px",
                    color: "#6b7280",
                    lineHeight: "16px",
                  }}
                >
                  Job Board Admin
                </Typography.Text>
              </div>
            )}
          </div>
        </div>

        {/* Menu Container */}
        <div
          style={{
            height: "calc(100vh - 128px)", // Standard height for header and footer
            overflowY: "auto",
            overflowX: "hidden",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
          className="sidebar-menu-container flex-1"
        >
          <style>
            {`
              .sidebar-menu-container::-webkit-scrollbar {
                display: none;
              }
            `}
          </style>
          <Menu
            theme="light"
            mode="inline"
            selectedKeys={selectedKeys}
            onClick={handleMenuClick}
            items={buildAntdItems(menuItems)}
          />
        </div>

        <div className="h-12 px-4 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center justify-center h-full">
            <Typography.Text
              type="secondary"
              className="text-xs"
              style={{
                fontSize: "10px",
                color: "#6b7280",
                lineHeight: "14px",
              }}
            >
              QuickHire Admin Console
            </Typography.Text>
          </div>
        </div>
      </div>
    </Sider>
  );
};

export default Sidebar;
