import React, { useEffect, useMemo, useState } from "react";
import {
  Button,
  Card,
  Input,
  Modal,
  Popconfirm,
  Space,
  Table,
  Tag,
  Typography,
  message,
} from "antd";
import {
  PlusOutlined,
  DeleteOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import type { ColumnsType, TablePaginationConfig } from "antd/es/table";
import { type Job, type JobsQueryParams } from "../types/job.types";
import { jobService } from "../services/jobService";
import { useNavigate } from "react-router-dom";
import { routes } from "../../../config/routes";

const { Title, Text } = Typography;
const { Search } = Input;

const DEFAULT_PAGE_SIZE = 10;

const AdminJobs: React.FC = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [viewJob, setViewJob] = useState<Job | null>(null);
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: DEFAULT_PAGE_SIZE,
    total: 0,
  });
  const [filters, setFilters] = useState<JobsQueryParams>({});

  const loadJobs = async (page = 1, pageSize = DEFAULT_PAGE_SIZE) => {
    setIsLoading(true);
    try {
      const response = await jobService.listJobs({
        ...filters,
        page,
        limit: pageSize,
      });

      setJobs(response.data ?? []);
      setPagination({
        current: response.meta.page,
        pageSize: response.meta.limit,
        total: response.meta.total,
      });
    } catch {
      message.error("Failed to load jobs");
      setJobs([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void loadJobs(
      pagination.current ?? 1,
      pagination.pageSize ?? DEFAULT_PAGE_SIZE,
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  const handleTableChange = (pager: TablePaginationConfig) => {
    const current = pager.current ?? 1;
    const pageSize = pager.pageSize ?? DEFAULT_PAGE_SIZE;
    void loadJobs(current, pageSize);
  };

  const goToCreateJob = () => {
    navigate(routes.dashboard.jobsNew);
  };

  const goToEditJob = (job: Job) => {
    const id = job.id ?? (job as unknown as { _id?: string })._id;
    if (!id) {
      message.error("Invalid job id");
      return;
    }
    navigate(routes.dashboard.jobsEdit.replace(":id", id));
  };

  const openViewModal = (job: Job) => {
    setViewJob(job);
    setIsViewModalOpen(true);
  };

  const closeViewModal = () => {
    setIsViewModalOpen(false);
    setViewJob(null);
  };

  const handleDeleteJob = async (jobId: string) => {
    try {
      await jobService.deleteJob(jobId);
      message.success("Job deleted");
      void loadJobs(
        pagination.current ?? 1,
        pagination.pageSize ?? DEFAULT_PAGE_SIZE,
      );
    } catch {
      message.error("Failed to delete job");
    }
  };

  const columns: ColumnsType<Job> = useMemo(
    () => [
      {
        title: "Title",
        dataIndex: "title",
        key: "title",
        render: (value: string) => <Text strong>{value}</Text>,
      },
      {
        title: "Company",
        dataIndex: "company",
        key: "company",
      },
      {
        title: "Location",
        dataIndex: "location",
        key: "location",
        render: (value: string) => <Tag>{value}</Tag>,
      },
      {
        title: "Category",
        dataIndex: "category",
        key: "category",
        render: (value: string) => <Tag color="blue">{value}</Tag>,
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
            <Button size="small" onClick={() => goToEditJob(record)}>
              Edit
            </Button>
            <Popconfirm
              title="Delete job"
              description="Are you sure you want to delete this job?"
              okText="Delete"
              okButtonProps={{ danger: true }}
              onConfirm={() =>
                handleDeleteJob(
                  record.id ?? (record as unknown as { _id?: string })._id ?? "",
                )
              }
            >
              <Button size="small" danger icon={<DeleteOutlined />}>
                Delete
              </Button>
            </Popconfirm>
          </Space>
        ),
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const handleSearch = (value: string) => {
    setFilters((prev) => ({
      ...prev,
      searchTerm: value || undefined,
      page: 1,
    }));
  };

  const handleRefresh = () => {
    void loadJobs(
      pagination.current ?? 1,
      pagination.pageSize ?? DEFAULT_PAGE_SIZE,
    );
  };

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
                Jobs
              </Title>
              <Text type="secondary">
                Manage job postings for the QuickHire job board.
              </Text>
            </div>
            <Space>
              <Search
                placeholder="Search jobs"
                allowClear
                onSearch={handleSearch}
                style={{ width: 240 }}
              />
              <Button icon={<ReloadOutlined />} onClick={handleRefresh} />
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={goToCreateJob}
              >
                New Job
              </Button>
            </Space>
          </Space>
        </Card>

        <Card>
          <Table<Job>
            rowKey={(job) =>
              job.id ?? (job as unknown as { _id?: string })._id ?? ""
            }
            loading={isLoading}
            columns={columns}
            dataSource={jobs}
            pagination={pagination}
            onChange={handleTableChange}
          />
        </Card>
      </Space>

      <Modal
        title="Job details"
        open={isViewModalOpen}
        onCancel={closeViewModal}
        footer={null}
      >
        {viewJob && (
          <Space direction="vertical" size="small" style={{ width: "100%" }}>
            <div>
              <Text type="secondary">Title</Text>
              <div>{viewJob.title}</div>
            </div>
            <div>
              <Text type="secondary">Company</Text>
              <div>{viewJob.company}</div>
            </div>
            <div>
              <Text type="secondary">Location</Text>
              <div>{viewJob.location}</div>
            </div>
            <div>
              <Text type="secondary">Category</Text>
              <div>{viewJob.category}</div>
            </div>
            <div>
              <Text type="secondary">Description</Text>
              <div
                style={{ border: "1px solid #e5e7eb", padding: 12, borderRadius: 8 }}
                dangerouslySetInnerHTML={{ __html: viewJob.description }}
              />
            </div>
            <div>
              <Text type="secondary">Created at</Text>
              <div>{new Date(viewJob.createdAt).toLocaleString()}</div>
            </div>
          </Space>
        )}
      </Modal>
    </div>
  );
};

export default AdminJobs;
