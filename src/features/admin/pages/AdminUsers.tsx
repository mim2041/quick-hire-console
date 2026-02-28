import React, { useEffect, useMemo, useState } from 'react';
import { Button, Card, Space, Table, Tag, Typography, message } from 'antd';
import { ReloadOutlined } from '@ant-design/icons';
import { adminService, type AdminUserQuotaSummary } from '../services/adminService';

const { Title, Text } = Typography;

const formatBytes = (bytes: number) => {
  if (!bytes) return '0 B';
  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  const power = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1);
  const value = bytes / 1024 ** power;
  return `${value.toFixed(value >= 10 ? 0 : 1)} ${units[power]}`;
};

const AdminUsers: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [rows, setRows] = useState<AdminUserQuotaSummary[]>([]);

  const load = async () => {
    setIsLoading(true);
    try {
      const data = await adminService.getUserQuotaSummary();
      setRows(data);
    } catch {
      message.error('Failed to load admin user quota summary');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void load();
  }, []);

  const columns = useMemo(
    () => [
      { title: 'Name', dataIndex: 'name', key: 'name' },
      { title: 'Email', dataIndex: 'email', key: 'email' },
      {
        title: 'Role',
        dataIndex: 'role',
        key: 'role',
        render: (role: string) => <Tag color={role?.toUpperCase() === 'ADMIN' ? 'blue' : 'default'}>{role}</Tag>,
      },
      {
        title: 'Folders',
        key: 'folderCount',
        render: (_: unknown, row: AdminUserQuotaSummary) => row.quota?.folderCount ?? 0,
      },
      {
        title: 'Files',
        key: 'fileCount',
        render: (_: unknown, row: AdminUserQuotaSummary) => row.quota?.fileCount ?? 0,
      },
      {
        title: 'Storage',
        key: 'usedStorageBytes',
        render: (_: unknown, row: AdminUserQuotaSummary) => formatBytes(row.quota?.usedStorageBytes ?? 0),
      },
    ],
    []
  );

  return (
    <div style={{ padding: 24 }}>
      <Card>
        <Space style={{ width: '100%', justifyContent: 'space-between', marginBottom: 16 }}>
          <div>
            <Title level={3} style={{ margin: 0 }}>User Quota Summary</Title>
            <Text type="secondary">Admin view of user counts and consumed storage.</Text>
          </div>
          <Button icon={<ReloadOutlined />} onClick={load} loading={isLoading}>Refresh</Button>
        </Space>

        <Table rowKey="id" loading={isLoading} columns={columns} dataSource={rows} />
      </Card>
    </div>
  );
};

export default AdminUsers;
