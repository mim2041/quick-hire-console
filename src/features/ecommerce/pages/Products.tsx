import React from "react";
import { Card, Table, Button, Space, Tag, Typography } from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
} from "@ant-design/icons";

const { Title } = Typography;

const Products: React.FC = () => {
  const columns = [
    {
      title: "Product Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      render: (category: string) => <Tag color="blue">{category}</Tag>,
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price: number) => `$${price}`,
    },
    {
      title: "Stock",
      dataIndex: "stock",
      key: "stock",
      render: (stock: number) => (
        <Tag color={stock > 10 ? "green" : stock > 0 ? "orange" : "red"}>
          {stock} units
        </Tag>
      ),
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
      name: "Sample Product 1",
      category: "Electronics",
      price: 299.99,
      stock: 15,
      status: "active",
    },
    {
      key: "2",
      name: "Sample Product 2",
      category: "Clothing",
      price: 49.99,
      stock: 0,
      status: "inactive",
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
        <Title level={2}>Products</Title>
        <Button type="primary" icon={<PlusOutlined />}>
          Add Product
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

export default Products;
