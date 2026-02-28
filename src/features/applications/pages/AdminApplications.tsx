import React, { useEffect, useMemo, useState } from "react";
import {
  Button,
  Card,
  Input,
  Modal,
  Space,
  Table,
  Tag,
  Typography,
  message,
} from "antd";
import type { ColumnsType, TablePaginationConfig } from "antd/es/table";
import { applicationService } from "../services/applicationService";
import type { Application } from "../../jobs/types/job.types";

const { Title, Text } = Typography;
const { Search } = Input;

const DEFAULT_PAGE_SIZE = 10;

const AdminApplications: React.FC = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [viewApplication, setViewApplication] = useState<Application | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: DEFAULT_PAGE_SIZE,
    total: 0,
  });
  const [emailFilter, setEmailFilter] = useState<string | undefined>();

  const loadApplications = async (
    page = 1,
    pageSize = DEFAULT_PAGE_SIZE,
    email?: string,
  ) => {
    setIsLoading(true);
    try {
      const response = await applicationService.listApplications({
        email,
        page,
        limit: pageSize,
      });

      setApplications(response.data ?? []);
      setPagination({
        current: response.meta?.page ?? page,
        pageSize: response.meta?.limit ?? pageSize,
        total: response.meta?.total ?? response.data.length,
      });
    } catch {
      message.error("Failed to load applications");
      setApplications([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void loadApplications(
      pagination.current ?? 1,
      pagination.pageSize ?? DEFAULT_PAGE_SIZE,
      emailFilter,
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [emailFilter]);

  const handleTableChange = (pager: TablePaginationConfig) => {
    const current = pager.current ?? 1;
    const pageSize = pager.pageSize ?? DEFAULT_PAGE_SIZE;
    void loadApplications(current, pageSize, emailFilter);
  };

  const handleSearchEmail = (value: string) => {
    setEmailFilter(value || undefined);
  };

  const openViewModal = (application: Application) => {
    setViewApplication(application);
    setIsViewModalOpen(true);
  };

  const closeViewModal = () => {
    setIsViewModalOpen(false);
    setViewApplication(null);
  };

  const columns: ColumnsType<Application> = useMemo(
    () => [
      {
        title: "Applicant",
        dataIndex: "name",
        key: "name",
        render: (value: string) => <Text strong>{value}</Text>,
      },
      {
        title: "Email",
        dataIndex: "email",
        key: "email",
      },
      {
        title: "Job ID",
        dataIndex: "job",
        key: "job",
        render: (value: string) => <Tag>{value}</Tag>,
      },
      {
        title: "Created At",
        dataIndex: "createdAt",
        key: "createdAt",
        render: (value: string) =>
          new Date(value).toLocaleString(undefined, {
            year: "numeric",
            month: "short",
            day: "numeric",
          }),
      },
      {
        title: "Actions",
        key: "actions",
        render: (_, record) => (
          <Space size="small">
            <Button size="small" onClick={() => openViewModal(record)}>
              View
            </Button>
          </Space>
        ),
      },
    ],
    [],
  );

  return (
    <div style={{ padding: 24 }}>
      <Space direction="vertical" size={16} style={{ width: "100%" }}>
        <Card>
          <Space
            style={{ width: "100%", justifyContent: "space-between" }}
            align="center"
          >
            <div>
              <Title level={3} style={{ margin: 0 }}>
                Applications
              </Title>
              <Text type="secondary">
                Review applications submitted to your QuickHire jobs.
              </Text>
            </div>
            <Space>
              <Search
                placeholder="Filter by applicant email"
                allowClear
                onSearch={handleSearchEmail}
                style={{ width: 260 }}
              />
            </Space>
          </Space>
        </Card>

        <Card>
          <Table<Application>
            rowKey={(application) => application.id}
            loading={isLoading}
            columns={columns}
            dataSource={applications}
            pagination={pagination}
            onChange={handleTableChange}
          />
        </Card>
      </Space>

      <Modal
        title="Application details"
        open={isViewModalOpen}
        onCancel={closeViewModal}
        footer={null}
      >
        {viewApplication && (
          <Space direction="vertical" size="small" style={{ width: "100%" }}>
            <div>
              <Text type="secondary">Applicant</Text>
              <div>{viewApplication.name}</div>
            </div>
            <div>
              <Text type="secondary">Email</Text>
              <div>{viewApplication.email}</div>
            </div>
            <div>
              <Text type="secondary">Job ID</Text>
              <div>{viewApplication.job}</div>
            </div>
            <div>
              <Text type="secondary">Resume Link</Text>
              <a href={viewApplication.resumeLink} target="_blank" rel="noreferrer">
                {viewApplication.resumeLink}
              </a>
            </div>
            <div>
              <Text type="secondary">Cover Note</Text>
              <div>{viewApplication.coverNote}</div>
            </div>
            <div>
              <Text type="secondary">Submitted at</Text>
              <div>{new Date(viewApplication.createdAt).toLocaleString()}</div>
            </div>
          </Space>
        )}
      </Modal>
    </div>
  );
};

export default AdminApplications;

