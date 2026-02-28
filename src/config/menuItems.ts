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
  {
    key: "jobs",
    label: "Jobs",
    icon: "ProfileOutlined",
    path: "/dashboard/jobs",
  },
  {
    key: "applications",
    label: "Applications",
    icon: "InboxOutlined",
    path: "/dashboard/applications",
  },
  {
    key: "profile",
    label: "Profile",
    icon: "UserOutlined",
    path: "/dashboard/profile",
  },
];
