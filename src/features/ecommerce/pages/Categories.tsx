import React from "react";
import { Card, Table, Button, Space, Tag, Typography } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";

const { Title } = Typography;

const Categories: React.FC = () => {
  const columns = [
    {
      title: "Category Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Products Count",
      dataIndex: "productsCount",
      key: "productsCount",
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
      name: "Electronics",
      description: "Electronic devices and gadgets",
      productsCount: 45,
      status: "active",
    },
    {
      key: "2",
      name: "Clothing",
      description: "Fashion and apparel",
      productsCount: 23,
      status: "active",
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
        <Title level={2}>Categories</Title>
        <Button type="primary" icon={<PlusOutlined />}>
          Add Category
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

export default Categories;
