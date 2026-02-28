import React, { useEffect, useState } from "react";
import { Card, Row, Col, Statistic, Typography, List, Tag } from "antd";
import {
  ProfileOutlined,
  TeamOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import { jobService } from "../../jobs/services/jobService";
import { applicationService } from "../../applications/services/applicationService";
import type { Job, Application } from "../../jobs/types/job.types";

const { Title, Paragraph } = Typography;

const DashboardHome: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);

  const totalJobs = jobs.length;
  const activeJobs = jobs.filter((j) => j.status === "active").length;
  const totalApplications = applications.length;

  const applicationsToday = applications.filter((app) => {
    const created = new Date(app.createdAt);
    const now = new Date();
    return (
      created.getFullYear() === now.getFullYear() &&
      created.getMonth() === now.getMonth() &&
      created.getDate() === now.getDate()
    );
  }).length;

  useEffect(() => {
    const loadDashboardData = async () => {
      setIsLoading(true);
      try {
        const [jobsRes, appsRes] = await Promise.all([
          jobService.listJobs({ page: 1, limit: 10 }),
          applicationService.listApplications({ page: 1, limit: 10 }),
        ]);

        setJobs(jobsRes.data ?? []);
        setApplications(appsRes.data ?? []);
      } catch {
        // Keep zeroed stats on error; avoid noisy toasts on landing page
        setJobs([]);
        setApplications([]);
      } finally {
        setIsLoading(false);
      }
    };

    void loadDashboardData();
  }, []);

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
              value={activeJobs}
              prefix={<ProfileOutlined />}
              valueStyle={{ color: "#1890ff" }}
              loading={isLoading}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Applications"
              value={totalApplications}
              prefix={<TeamOutlined />}
              valueStyle={{ color: "#722ed1" }}
              loading={isLoading}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Applications Today"
              value={applicationsToday}
              prefix={<ClockCircleOutlined />}
              valueStyle={{ color: "#fa8c16" }}
              loading={isLoading}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Jobs"
              value={totalJobs}
              prefix={<CheckCircleOutlined />}
              valueStyle={{ color: "#3f8600" }}
              loading={isLoading}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
        <Col xs={24} lg={12}>
          <Card title="Recent Jobs" loading={isLoading}>
            <List
              dataSource={jobs}
              locale={{ emptyText: "No jobs found" }}
              renderItem={(job) => (
                <List.Item>
                  <List.Item.Meta
                    title={
                      <span>
                        {job.title}{" "}
                        {job.status && (
                          <Tag
                            color={job.status === "active" ? "green" : "default"}
                          >
                            {job.status}
                          </Tag>
                        )}
                      </span>
                    }
                    description={`${job.company} • ${job.location}`}
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>

        <Col xs={24} lg={12}>
          <Card title="Recent Applications" loading={isLoading}>
            <List
              dataSource={applications}
              locale={{ emptyText: "No applications found" }}
              renderItem={(app) => (
                <List.Item>
                  <List.Item.Meta
                    title={app.name}
                    description={`${app.email} • Job ID: ${app.job}`}
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default DashboardHome;
