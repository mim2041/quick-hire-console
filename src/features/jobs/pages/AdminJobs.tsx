import React, { useEffect, useMemo, useState } from "react";
import {
  Button,
  Card,
  Form,
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
import {
  type CreateJobPayload,
  type Job,
  type JobsQueryParams,
} from "../types/job.types";
import { jobService } from "../services/jobService";

const { Title, Text } = Typography;
const { Search, TextArea } = Input;

const DEFAULT_PAGE_SIZE = 10;

const AdminJobs: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: DEFAULT_PAGE_SIZE,
    total: 0,
  });
  const [filters, setFilters] = useState<JobsQueryParams>({});
  const [form] = Form.useForm<CreateJobPayload>();

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
    void loadJobs(pagination.current ?? 1, pagination.pageSize ?? DEFAULT_PAGE_SIZE);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  const handleTableChange = (pager: TablePaginationConfig) => {
    const current = pager.current ?? 1;
    const pageSize = pager.pageSize ?? DEFAULT_PAGE_SIZE;
    void loadJobs(current, pageSize);
  };

  const openCreateModal = () => {
    form.resetFields();
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleCreateJob = async () => {
    try {
      const values = await form.validateFields();
      await jobService.createJob(values);
      message.success("Job created");
      closeModal();
      void loadJobs(pagination.current ?? 1, pagination.pageSize ?? DEFAULT_PAGE_SIZE);
    } catch (error) {
      if (error instanceof Error) {
        // validation error is already shown by antd
        if (error.name !== "Error") {
          message.error("Failed to create job");
        }
      }
    }
  };

  const handleDeleteJob = async (jobId: string) => {
    try {
      await jobService.deleteJob(jobId);
      message.success("Job deleted");
      void loadJobs(pagination.current ?? 1, pagination.pageSize ?? DEFAULT_PAGE_SIZE);
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
            <Popconfirm
              title="Delete job"
              description="Are you sure you want to delete this job?"
              okText="Delete"
              okButtonProps={{ danger: true }}
              onConfirm={() => handleDeleteJob(record.id)}
            >
              <Button
                size="small"
                danger
                icon={<DeleteOutlined />}
              >
                Delete
              </Button>
            </Popconfirm>
          </Space>
        ),
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const handleSearch = (value: string) => {
    setFilters((prev) => ({
      ...prev,
      searchTerm: value || undefined,
      page: 1,
    }));
  };

  const handleRefresh = () => {
    void loadJobs(pagination.current ?? 1, pagination.pageSize ?? DEFAULT_PAGE_SIZE);
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
              <Button
                icon={<ReloadOutlined />}
                onClick={handleRefresh}
              />
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={openCreateModal}
              >
                New Job
              </Button>
            </Space>
          </Space>
        </Card>

        <Card>
          <Table<Job>
            rowKey="id"
            loading={isLoading}
            columns={columns}
            dataSource={jobs}
            pagination={pagination}
            onChange={handleTableChange}
          />
        </Card>
      </Space>

      <Modal
        title="Create Job"
        open={isModalOpen}
        onCancel={closeModal}
        onOk={handleCreateJob}
        okText="Create"
        destroyOnClose
      >
        <Form<CreateJobPayload> form={form} layout="vertical">
          <Form.Item
            name="title"
            label="Job Title"
            rules={[{ required: true, message: "Please enter a job title" }]}
          >
            <Input placeholder="Senior Frontend Engineer" />
          </Form.Item>

          <Form.Item
            name="company"
            label="Company"
            rules={[{ required: true, message: "Please enter a company name" }]}
          >
            <Input placeholder="QuickHire" />
          </Form.Item>

          <Form.Item
            name="location"
            label="Location"
            rules={[{ required: true, message: "Please enter a location" }]}
          >
            <Input placeholder="Remote / City, Country" />
          </Form.Item>

          <Form.Item
            name="category"
            label="Category"
            rules={[{ required: true, message: "Please enter a category" }]}
          >
            <Input placeholder="Engineering, Marketing, Design..." />
          </Form.Item>

          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: "Please enter a description" }]}
          >
            <TextArea rows={4} placeholder="Short description of the role" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AdminJobs;

