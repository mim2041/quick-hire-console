import React from "react";
import { Card, Table, Button, Space, Tag, Typography } from "antd";
import { EyeOutlined, EditOutlined } from "@ant-design/icons";

const { Title } = Typography;

const Orders: React.FC = () => {
  const columns = [
    {
      title: "Order ID",
      dataIndex: "orderId",
      key: "orderId",
    },
    {
      title: "Customer",
      dataIndex: "customer",
      key: "customer",
    },
    {
      title: "Total",
      dataIndex: "total",
      key: "total",
      render: (total: number) => `$${total}`,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => {
        const colors = {
          pending: "orange",
          processing: "blue",
          shipped: "green",
          delivered: "green",
          cancelled: "red",
        };
        return (
          <Tag color={colors[status as keyof typeof colors]}>{status}</Tag>
        );
      },
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
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
            Update
          </Button>
        </Space>
      ),
    },
  ];

  const data = [
    {
      key: "1",
      orderId: "#ORD-001",
      customer: "John Doe",
      total: 299.99,
      status: "pending",
      date: "2024-01-15",
    },
    {
      key: "2",
      orderId: "#ORD-002",
      customer: "Jane Smith",
      total: 149.5,
      status: "shipped",
      date: "2024-01-14",
    },
  ];

  return (
    <div style={{ padding: "24px" }}>
      <Title level={2}>Orders</Title>

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

export default Orders;
