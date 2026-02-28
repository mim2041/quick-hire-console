import React, { useEffect, useMemo, useState } from 'react';
import { Button, Card, Space, Table, Typography, message } from 'antd';
import { ReloadOutlined } from '@ant-design/icons';
import { adminService, type AdminAuditLog } from '../services/adminService';

const { Title, Text } = Typography;

const AdminAudits: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [rows, setRows] = useState<AdminAuditLog[]>([]);

  const load = async () => {
    setIsLoading(true);
    try {
      const data = await adminService.getAuditLogs();
      setRows(data);
    } catch {
      message.error('Failed to load audit logs');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void load();
  }, []);

  const columns = useMemo(
    () => [
      { title: 'Action', dataIndex: 'actionType', key: 'actionType' },
      { title: 'Target Type', dataIndex: 'targetType', key: 'targetType' },
      { title: 'Target ID', dataIndex: 'targetId', key: 'targetId' },
      { title: 'Actor', dataIndex: 'actorUserId', key: 'actorUserId' },
      {
        title: 'Time',
        dataIndex: 'createdAt',
        key: 'createdAt',
        render: (value: string) => (value ? new Date(value).toLocaleString() : '-'),
      },
    ],
    []
  );

  return (
    <div style={{ padding: 24 }}>
      <Card>
        <Space style={{ width: '100%', justifyContent: 'space-between', marginBottom: 16 }}>
          <div>
            <Title level={3} style={{ margin: 0 }}>Audit Logs</Title>
            <Text type="secondary">Track admin and quota-critical actions.</Text>
          </div>
          <Button icon={<ReloadOutlined />} onClick={load} loading={isLoading}>Refresh</Button>
        </Space>

        <Table rowKey="id" loading={isLoading} columns={columns} dataSource={rows} />
      </Card>
    </div>
  );
};

export default AdminAudits;
