import React from "react";
import { Card, Table, Button, Space, Tag, Typography, Progress } from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  GiftOutlined,
} from "@ant-design/icons";

const { Title } = Typography;

const Offers: React.FC = () => {
  const columns = [
    {
      title: "Offer Name",
      dataIndex: "name",
      key: "name",
      render: (name: string) => (
        <Space>
          <GiftOutlined />
          {name}
        </Space>
      ),
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      render: (type: string) => (
        <Tag color={type === "percentage" ? "blue" : "green"}>{type}</Tag>
      ),
    },
    {
      title: "Value",
      dataIndex: "value",
      key: "value",
      render: (value: number, record: any) =>
        record.type === "percentage" ? `${value}%` : `$${value}`,
    },
    {
      title: "Usage",
      dataIndex: "usage",
      key: "usage",
      render: (usage: any) => (
        <Progress
          percent={Math.round((usage.used / usage.limit) * 100)}
          size="small"
          format={() => `${usage.used}/${usage.limit}`}
        />
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => {
        const colors = {
          active: "green",
          inactive: "red",
          expired: "gray",
        };
        return (
          <Tag color={colors[status as keyof typeof colors]}>{status}</Tag>
        );
      },
    },
    {
      title: "Expires",
      dataIndex: "expires",
      key: "expires",
    },
    {
      title: "Actions",
      key: "actions",
      render: () => (
        <Space>
          <Button icon={<EditOutlined />} size="small">
            Edit
          </Button>
          <Button icon={<DeleteOutlined />} size="small" danger>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  const data = [
    {
      key: "1",
      name: "Summer Sale",
      type: "percentage",
      value: 20,
      usage: { used: 45, limit: 100 },
      status: "active",
      expires: "2024-02-15",
    },
    {
      key: "2",
      name: "Free Shipping",
      type: "fixed",
      value: 0,
      usage: { used: 12, limit: 50 },
      status: "active",
      expires: "2024-01-30",
    },
  ];

  return (
    <div style={{ padding: "24px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "24px",
        }}
      >
        <Title level={2}>Offers & Discounts</Title>
        <Button type="primary" icon={<PlusOutlined />}>
          Create Offer
        </Button>
      </div>

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

export default Offers;
