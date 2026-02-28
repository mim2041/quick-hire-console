export interface MenuItem {
  key: string;
  label: string;
  icon?: string;
  path?: string;
  children?: MenuItem[];
}

// Minimal QuickHire admin menu
export const menuItems: MenuItem[] = [
  {
    key: "dashboard",
    label: "Dashboard",
    icon: "DashboardOutlined",
    path: "/dashboard",
  },
];
