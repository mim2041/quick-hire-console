import React, { useEffect, useMemo, useState } from 'react';
import { Button, Card, Form, Input, Modal, Popconfirm, Select, Space, Table, Tag, Typography, Upload, message } from 'antd';
import { DeleteOutlined, EditOutlined, ReloadOutlined, UploadOutlined } from '@ant-design/icons';
import { storageService, type FileItem, type FolderItem } from '../services/storageService';

const { Title, Text } = Typography;

const formatBytes = (bytes: number) => {
  if (!bytes) return '0 B';
  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  const power = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1);
  const value = bytes / 1024 ** power;
  return `${value.toFixed(value >= 10 ? 0 : 1)} ${units[power]}`;
};

const FilesPage: React.FC = () => {
  const [uploadForm] = Form.useForm<{ folderId: string }>();
  const [renameForm] = Form.useForm<{ filename: string }>();
  const [isLoading, setIsLoading] = useState(false);
  const [rows, setRows] = useState<FileItem[]>([]);
  const [folders, setFolders] = useState<FolderItem[]>([]);
  const [uploadOpen, setUploadOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [renameOpen, setRenameOpen] = useState(false);
  const [editingFile, setEditingFile] = useState<FileItem | null>(null);

  const load = async () => {
    setIsLoading(true);
    try {
      const data = await storageService.getFiles();
      setRows(data);

      const folderData = await storageService.getFolders();
      setFolders(folderData);
    } catch {
      message.error('Failed to load files');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void load();
  }, []);

  const onDelete = async (id: string) => {
    try {
      await storageService.deleteFile(id);
      message.success('File deleted');
      await load();
    } catch {
      message.error('Failed to delete file');
    }
  };

  const onUpload = async () => {
    if (!selectedFile) {
      message.warning('Please select a file');
      return;
    }

    try {
      const values = await uploadForm.validateFields();
      await storageService.uploadFile({ folderId: values.folderId, file: selectedFile });
      message.success('File uploaded');
      setUploadOpen(false);
      setSelectedFile(null);
      uploadForm.resetFields();
      await load();
    } catch {
      message.error('Failed to upload file');
    }
  };

  const openRenameModal = (row: FileItem) => {
    setEditingFile(row);
    renameForm.setFieldsValue({ filename: row.filename });
    setRenameOpen(true);
  };

  const onRename = async () => {
    if (!editingFile) return;

    try {
      const values = await renameForm.validateFields();
      await storageService.renameFile(editingFile.id, { filename: values.filename });
      message.success('File renamed');
      setRenameOpen(false);
      setEditingFile(null);
      renameForm.resetFields();
      await load();
    } catch {
      message.error('Failed to rename file');
    }
  };

  const columns = useMemo(
    () => [
      { title: 'Filename', dataIndex: 'filename', key: 'filename' },
      {
        title: 'Type',
        dataIndex: 'mimeType',
        key: 'mimeType',
        render: (value: string) => <Tag>{value}</Tag>,
      },
      { title: 'Size', dataIndex: 'sizeBytes', key: 'sizeBytes', render: (value: number) => formatBytes(value) },
      { title: 'Folder ID', dataIndex: 'folderId', key: 'folderId' },
      {
        title: 'Created',
        dataIndex: 'createdAt',
        key: 'createdAt',
        render: (value: string) => (value ? new Date(value).toLocaleString() : '-'),
      },
      {
        title: 'Actions',
        key: 'actions',
        render: (_: unknown, row: FileItem) => (
          <Space>
            <Button size="small" icon={<EditOutlined />} onClick={() => openRenameModal(row)}>Rename</Button>
            <Popconfirm title="Delete file?" onConfirm={() => onDelete(row.id)}>
              <Button danger size="small" icon={<DeleteOutlined />}>Delete</Button>
            </Popconfirm>
          </Space>
        ),
      },
    ],
    []
  );

  return (
    <div style={{ padding: 24 }}>
      <Card>
        <Space style={{ width: '100%', justifyContent: 'space-between', marginBottom: 16 }}>
          <div>
            <Title level={3} style={{ margin: 0 }}>Files</Title>
            <Text type="secondary">File listing and basic lifecycle controls.</Text>
          </div>
          <Space>
            <Button icon={<ReloadOutlined />} onClick={load} loading={isLoading}>Refresh</Button>
            <Button type="primary" icon={<UploadOutlined />} onClick={() => setUploadOpen(true)}>Upload</Button>
          </Space>
        </Space>

        <Table rowKey="id" loading={isLoading} columns={columns} dataSource={rows} />
      </Card>

      <Modal title="Upload File" open={uploadOpen} onCancel={() => setUploadOpen(false)} onOk={onUpload}>
        <Form form={uploadForm} layout="vertical">
          <Form.Item name="folderId" label="Folder" rules={[{ required: true }]}> 
            <Select
              options={folders.map((item) => ({ value: item.id, label: `${item.name} (depth ${item.depth})` }))}
              placeholder="Select folder"
            />
          </Form.Item>

          <Upload
            maxCount={1}
            beforeUpload={(file) => {
              setSelectedFile(file);
              return false;
            }}
            onRemove={() => {
              setSelectedFile(null);
            }}
          >
            <Button icon={<UploadOutlined />}>Choose file</Button>
          </Upload>
        </Form>
      </Modal>

      <Modal title="Rename File" open={renameOpen} onCancel={() => setRenameOpen(false)} onOk={onRename}>
        <Form form={renameForm} layout="vertical">
          <Form.Item name="filename" label="File Name" rules={[{ required: true }]}> 
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default FilesPage;
