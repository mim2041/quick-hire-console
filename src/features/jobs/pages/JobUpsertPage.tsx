import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Card,
  Form,
  Input,
  Select,
  Space,
  Button,
  Typography,
  message,
} from "antd";
import type { CreateJobPayload, Job } from "../types/job.types";
import { jobService } from "../services/jobService";
import QuillEditor from "../../../components/form/QuillEditor";
import { routes } from "../../../config/routes";

const { Title, Text } = Typography;

const JobUpsertPage: React.FC = () => {
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const navigate = useNavigate();
  const [form] = Form.useForm<CreateJobPayload>();
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!isEditMode || !id) return;

    const loadJob = async () => {
      setIsLoading(true);
      try {
        const job = await jobService.getJobById(id);
        const normalized: Job = {
          ...job,
          id: job.id ?? (job as unknown as { _id?: string })._id,
        };

        form.setFieldsValue({
          title: normalized.title,
          company: normalized.company,
          location: normalized.location,
          category: normalized.category,
          description: normalized.description,
          status: normalized.status ?? "active",
        });
        setDescription(normalized.description);
      } catch {
        message.error("Failed to load job");
      } finally {
        setIsLoading(false);
      }
    };

    void loadJob();
  }, [form, id, isEditMode]);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();

      if (!description || description.trim() === "") {
        message.error("Description is required");
        return;
      }

      const payload: CreateJobPayload = {
        title: values.title,
        company: values.company,
        location: values.location,
        category: values.category,
        description,
        status: values.status,
      };

      setIsLoading(true);

      if (isEditMode && id) {
        await jobService.updateJob(id, payload);
        message.success("Job updated successfully");
      } else {
        await jobService.createJob(payload);
        message.success("Job created successfully");
      }

      navigate(routes.dashboard.jobs);
    } catch (error) {
      if (error instanceof Error && error.name !== "Error") {
        message.error("Failed to save job");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    navigate(routes.dashboard.jobs);
  };

  return (
    <div style={{ padding: 24 }}>
      <Card>
        <Space direction="vertical" size={16} style={{ width: "100%" }}>
          <div>
            <Title level={3} style={{ margin: 0 }}>
              {isEditMode ? "Edit Job" : "Create Job"}
            </Title>
            <Text type="secondary">
              {isEditMode
                ? "Update job details and description."
                : "Create a new job posting for the QuickHire job board."}
            </Text>
          </div>

          <Form<CreateJobPayload>
            layout="vertical"
            form={form}
            initialValues={{ status: "active" }}
            onFinish={handleSubmit}
          >
            {/* grid layout with 2 columns */}
            <div className="grid grid-cols-2 gap-4">
              <Form.Item
                name="title"
                label="Job Title"
                rules={[
                  { required: true, message: "Please enter a job title" },
                ]}
              >
                <Input placeholder="Senior Frontend Engineer" />
              </Form.Item>
              <Form.Item
                name="company"
                label="Company"
                rules={[
                  { required: true, message: "Please enter a company name" },
                ]}
              >
                <Input placeholder="QuickHire" />
              </Form.Item>
            </div>
            <div className="grid grid-cols-3 gap-4">
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
              <Form.Item name="status" label="Status">
                <Select
                  options={[
                    { label: "Active", value: "active" },
                    { label: "Inactive", value: "inactive" },
                  ]}
                />
              </Form.Item>
            </div>

            <Form.Item label="Description" required>
              <QuillEditor
                label="Job description"
                value={description}
                onChange={setDescription}
                required
                helperText="Rich text description shown on the public job detail page."
              />
            </Form.Item>

            <Space style={{ marginTop: 16 }}>
              <Button onClick={handleCancel}>Cancel</Button>
              <Button type="primary" htmlType="submit" loading={isLoading}>
                {isEditMode ? "Update Job" : "Create Job"}
              </Button>
            </Space>
          </Form>
        </Space>
      </Card>
    </div>
  );
};

export default JobUpsertPage;
