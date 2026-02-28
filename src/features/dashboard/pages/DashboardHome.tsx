import React from "react";
import { Card, Row, Col, Statistic, Typography } from "antd";
import {
  ProfileOutlined,
  TeamOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";

const { Title, Paragraph } = Typography;

const DashboardHome: React.FC = () => {
  return (
    <div style={{ padding: "24px" }}>
      <Title level={2}>QuickHire Admin Dashboard</Title>
      <Paragraph type="secondary">
        Overview of jobs and applications in the QuickHire job board.
      </Paragraph>

      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Open Jobs"
              value={0}
              prefix={<ProfileOutlined />}
              valueStyle={{ color: "#1890ff" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Active Applicants"
              value={0}
              prefix={<TeamOutlined />}
              valueStyle={{ color: "#722ed1" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Applications Today"
              value={0}
              prefix={<ClockCircleOutlined />}
              valueStyle={{ color: "#fa8c16" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Filled Positions"
              value={0}
              prefix={<CheckCircleOutlined />}
              valueStyle={{ color: "#3f8600" }}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default DashboardHome;
