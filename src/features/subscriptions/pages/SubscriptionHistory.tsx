import React, { useEffect, useMemo, useState } from 'react';
import { Button, Card, Space, Table, Tag, Typography, message } from 'antd';
import { ReloadOutlined } from '@ant-design/icons';
import { subscriptionService } from '../services/subscriptionService';
import type { UserSubscriptionHistoryItem } from '../types/subscription.types';

const { Title, Text } = Typography;

const SubscriptionHistory: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [rows, setRows] = useState<UserSubscriptionHistoryItem[]>([]);

  const load = async () => {
    setIsLoading(true);
    try {
      const data = await subscriptionService.getMySubscriptionHistory();
      setRows(data);
    } catch {
      message.error('Failed to load subscription history');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void load();
  }, []);

  const columns = useMemo(
    () => [
      { title: 'Package', dataIndex: 'packageName', key: 'packageName' },
      { title: 'Slug', dataIndex: 'packageSlug', key: 'packageSlug' },
      {
        title: 'Status',
        dataIndex: 'isActive',
        key: 'isActive',
        render: (value: boolean) => <Tag color={value ? 'green' : 'default'}>{value ? 'ACTIVE' : 'INACTIVE'}</Tag>,
      },
      {
        title: 'Started',
        dataIndex: 'startedAt',
        key: 'startedAt',
        render: (value: string) => new Date(value).toLocaleString(),
      },
      {
        title: 'Ended',
        dataIndex: 'endedAt',
        key: 'endedAt',
        render: (value: string | null) => (value ? new Date(value).toLocaleString() : '-'),
      },
    ],
    []
  );

  return (
    <div style={{ padding: 24 }}>
      <Card>
        <Space style={{ width: '100%', justifyContent: 'space-between', marginBottom: 16 }}>
          <div>
            <Title level={3} style={{ margin: 0 }}>Subscription History</Title>
            <Text type="secondary">Timeline of plans used by this account.</Text>
          </div>
          <Button icon={<ReloadOutlined />} onClick={load} loading={isLoading}>Refresh</Button>
        </Space>

        <Table rowKey="id" loading={isLoading} columns={columns} dataSource={rows} />
      </Card>
    </div>
  );
};

export default SubscriptionHistory;
