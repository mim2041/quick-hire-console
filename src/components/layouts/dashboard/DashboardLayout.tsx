import React, { useState } from "react";
import { Layout } from "antd";
import { Outlet } from "react-router-dom";

import Header from "./Header/Header";
import Sidebar from "./Sidebar/Sidebar";

const { Content } = Layout;

const DashboardLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(true);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Layout className="min-h-screen">
      <Sidebar collapsed={collapsed} />
      <Layout>
        <Header collapsed={collapsed} toggleSidebar={toggleSidebar} />
        <Content className="m-4 p-4 bg-white rounded-lg shadow">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;
