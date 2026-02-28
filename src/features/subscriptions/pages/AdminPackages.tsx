import React, { useEffect, useMemo, useState } from 'react';
import {
  Button,
  Card,
  Form,
  Input,
  InputNumber,
  Modal,
  Popconfirm,
  Select,
  Space,
  Table,
  Tag,
  Typography,
  message,
} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { subscriptionService } from '../services/subscriptionService';
import type {
  AllowedFileType,
  SubscriptionPackage,
  UpsertSubscriptionPackagePayload,
} from '../types/subscription.types';

const { Title, Text } = Typography;

const fileTypeOptions: { label: string; value: AllowedFileType }[] = [
  { label: 'image/jpeg', value: 'image/jpeg' },
  { label: 'image/png', value: 'image/png' },
  { label: 'video/mp4', value: 'video/mp4' },
  { label: 'audio/mpeg', value: 'audio/mpeg' },
  { label: 'application/pdf', value: 'application/pdf' },
];

const initialFormValues: UpsertSubscriptionPackagePayload = {
  name: '',
  slug: '',
  description: '',
  maxFolders: 10,
  maxNestingLevel: 3,
  maxFileSizeMb: 10,
  totalFileLimit: 50,
  filesPerFolderLimit: 20,
  mimeTypes: ['image/jpeg', 'application/pdf'],
};

const AdminPackages: React.FC = () => {
  const [form] = Form.useForm<UpsertSubscriptionPackagePayload>();
  const [packages, setPackages] = useState<SubscriptionPackage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPackage, setEditingPackage] = useState<SubscriptionPackage | null>(null);

  const loadPackages = async () => {
    setIsLoading(true);
    try {
      const response = await subscriptionService.getPackages();
      setPackages(Array.isArray(response) ? response : []);
    } catch {
      message.error('Failed to load subscription packages');
      setPackages([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void loadPackages();
  }, []);

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingPackage(null);
    form.resetFields();
  };

  const openCreateModal = () => {
    setEditingPackage(null);
    form.setFieldsValue(initialFormValues);
    setIsModalOpen(true);
  };

  const openEditModal = (row: SubscriptionPackage) => {
    setEditingPackage(row);
    form.setFieldsValue({
      name: row.name,
      slug: row.slug,
      description: row.description,
      maxFolders: row.maxFolders,
      maxNestingLevel: row.maxNestingLevel,
      maxFileSizeMb: row.maxFileSizeMb,
      totalFileLimit: row.totalFileLimit,
      filesPerFolderLimit: row.filesPerFolderLimit,
      mimeTypes: row.allowedFileTypes,
    });
    setIsModalOpen(true);
  };

  const onSubmit = async () => {
    try {
      const payload = await form.validateFields();
      if (editingPackage) {
        await subscriptionService.updatePackage(editingPackage.id, payload);
        message.success('Package updated');
      } else {
        await subscriptionService.createPackage(payload);
        message.success('Package created');
      }
      closeModal();
      await loadPackages();
    } catch {
      message.error('Failed to save package');
    }
  };

  const onDelete = async (id: string) => {
    try {
      await subscriptionService.deletePackage(id);
      message.success('Package deleted');
      await loadPackages();
    } catch {
      message.error('Failed to delete package');
    }
  };

  const columns = useMemo(
    () => [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'Allowed Types',
        dataIndex: 'allowedFileTypes',
        key: 'allowedFileTypes',
        render: (types: AllowedFileType[]) => (
          <Space wrap>
            {types?.map((type) => (
              <Tag key={type}>{type.toUpperCase()}</Tag>
            ))}
          </Space>
        ),
      },
      {
        title: 'Max Folders',
        dataIndex: 'maxFolders',
        key: 'maxFolders',
      },
      {
        title: 'Max Nesting',
        dataIndex: 'maxNestingLevel',
        key: 'maxNestingLevel',
      },
      {
        title: 'Max File MB',
        dataIndex: 'maxFileSizeMb',
        key: 'maxFileSizeMb',
      },
      {
        title: 'Total Files',
        dataIndex: 'totalFileLimit',
        key: 'totalFileLimit',
      },
      {
        title: 'Files/Folder',
        dataIndex: 'filesPerFolderLimit',
        key: 'filesPerFolderLimit',
      },
      {
        title: 'Actions',
        key: 'actions',
        render: (_: unknown, row: SubscriptionPackage) => (
          <Space>
            <Button size="small" onClick={() => openEditModal(row)}>
              Edit
            </Button>
            <Popconfirm
              title="Delete package?"
              description="Existing user data will remain unchanged."
              onConfirm={() => onDelete(row.id)}
            >
              <Button size="small" danger>
                Delete
              </Button>
            </Popconfirm>
          </Space>
        ),
      },
    ],
    []
  );

  return (
    <div style={{ padding: 24 }}>
      <Space direction="vertical" size={16} style={{ width: '100%' }}>
        <Card>
          <Space style={{ width: '100%', justifyContent: 'space-between' }}>
            <div>
              <Title level={3} style={{ margin: 0 }}>
                Subscription Package Management
              </Title>
              <Text type="secondary">
                Configure Free, Silver, Gold, and Diamond limits enforced server-side on every file and folder action.
              </Text>
            </div>
            <Button type="primary" icon={<PlusOutlined />} onClick={openCreateModal}>
              New Package
            </Button>
          </Space>
        </Card>

        <Table rowKey="id" loading={isLoading} columns={columns} dataSource={packages} />
      </Space>

      <Modal
        title={editingPackage ? 'Update Package' : 'Create Package'}
        open={isModalOpen}
        onCancel={closeModal}
        onOk={onSubmit}
        okText={editingPackage ? 'Update' : 'Create'}
        destroyOnClose
      >
        <Form form={form} layout="vertical" initialValues={initialFormValues}>
          <Form.Item name="name" label="Package Name" rules={[{ required: true }]}>
            <Input placeholder="Free / Silver / Gold / Diamond" />
          </Form.Item>

          <Form.Item name="slug" label="Slug" rules={[{ required: true }]}>
            <Input placeholder="free / silver / gold / diamond" />
          </Form.Item>

          <Form.Item name="description" label="Description">
            <Input.TextArea rows={2} />
          </Form.Item>

          <Form.Item
            name="mimeTypes"
            label="Allowed File Types"
            rules={[{ required: true, message: 'Select at least one file type' }]}
          >
            <Select mode="multiple" options={fileTypeOptions} />
          </Form.Item>

          <Form.Item name="maxFolders" label="Max Folders" rules={[{ required: true }]}> 
            <InputNumber min={0} style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item name="maxNestingLevel" label="Max Nesting Level" rules={[{ required: true }]}>
            <InputNumber min={1} style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item name="maxFileSizeMb" label="Max File Size (MB)" rules={[{ required: true }]}>
            <InputNumber min={1} style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item name="totalFileLimit" label="Total File Limit" rules={[{ required: true }]}>
            <InputNumber min={0} style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item name="filesPerFolderLimit" label="Files Per Folder" rules={[{ required: true }]}>
            <InputNumber min={0} style={{ width: '100%' }} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AdminPackages;
