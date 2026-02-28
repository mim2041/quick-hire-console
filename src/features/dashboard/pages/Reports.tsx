import React from "react";
import { Card, DatePicker, Select, Typography } from "antd";

const { Title, Paragraph } = Typography;

const Reports: React.FC = () => {
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
        <Title level={2}>Reports</Title>
        <div style={{ display: "flex", gap: 12 }}>
          <Select
            defaultValue="sales"
            options={[
              { label: "Sales performance", value: "sales" },
              { label: "Product performance", value: "products" },
              { label: "Customer analytics", value: "customers" },
              { label: "Inventory reports", value: "inventory" },
            ]}
            style={{ width: 220 }}
          />
          <DatePicker.RangePicker />
        </div>
      </div>

      <Card>
        <Paragraph type="secondary">
          This is a placeholder. Integrate your analytics and charts here (e.g.,
          using Ant Design Charts or Recharts) to visualize sales, conversion,
          product, and customer metrics over time.
        </Paragraph>
      </Card>
    </div>
  );
};

export default Reports;
