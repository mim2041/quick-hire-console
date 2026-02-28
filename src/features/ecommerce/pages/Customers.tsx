import React from "react";
import { Card, Table, Button, Space, Tag, Typography, Avatar } from "antd";
import { UserOutlined, EyeOutlined, EditOutlined } from "@ant-design/icons";

const { Title } = Typography;

const Customers: React.FC = () => {
  const columns = [
    {
      title: "Customer",
      dataIndex: "name",
      key: "name",
      render: (name: string, record: any) => (
        <Space>
          <Avatar icon={<UserOutlined />} />
          <div>
            <div>{name}</div>
            <div style={{ fontSize: "12px", color: "#666" }}>
              {record.email}
            </div>
          </div>
        </Space>
      ),
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Orders",
      dataIndex: "ordersCount",
      key: "ordersCount",
    },
    {
      title: "Total Spent",
      dataIndex: "totalSpent",
      key: "totalSpent",
      render: (amount: number) => `$${amount}`,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <Tag color={status === "active" ? "green" : "red"}>{status}</Tag>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: () => (
        <Space>
          <Button icon={<EyeOutlined />} size="small">
            View
          </Button>
          <Button icon={<EditOutlined />} size="small">
            Edit
          </Button>
        </Space>
      ),
    },
  ];

  const data = [
    {
      key: "1",
      name: "John Doe",
      email: "john@example.com",
      phone: "+1 234 567 8900",
      ordersCount: 5,
      totalSpent: 1250.0,
      status: "active",
    },
    {
      key: "2",
      name: "Jane Smith",
      email: "jane@example.com",
      phone: "+1 234 567 8901",
      ordersCount: 3,
      totalSpent: 450.5,
      status: "active",
    },
  ];

  return (
    <div style={{ padding: "24px" }}>
      <Title level={2}>Customers</Title>

      <Card>
        <Table
          columns={columns}
          dataSource={data}
          pagination={{ pageSize: 10 }}
        />
      </Card>
    </div>
  );
};

export default Customers;
