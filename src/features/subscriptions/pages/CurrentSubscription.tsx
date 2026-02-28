import React, { useEffect, useMemo, useState } from 'react';
import { Button, Card, Select, Space, Tag, Typography, message } from 'antd';
import { ReloadOutlined } from '@ant-design/icons';
import { subscriptionService } from '../services/subscriptionService';
import type { SubscriptionPackage, UserSubscriptionHistoryItem } from '../types/subscription.types';

const { Title, Text } = Typography;

const CurrentSubscription: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [packages, setPackages] = useState<SubscriptionPackage[]>([]);
  const [history, setHistory] = useState<UserSubscriptionHistoryItem[]>([]);
  const [selectedPackageId, setSelectedPackageId] = useState<string>();

  const load = async () => {
    setIsLoading(true);
    try {
      const [pkgData, historyData] = await Promise.all([
        subscriptionService.getPackages(),
        subscriptionService.getMySubscriptionHistory(),
      ]);
      setPackages(pkgData);
      setHistory(historyData);
      if (pkgData.length > 0) {
        setSelectedPackageId(pkgData[0].id);
      }
    } catch {
      message.error('Failed to load subscription data');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void load();
  }, []);

  const activeSubscription = useMemo(
    () => history.find((item) => item.isActive) ?? null,
    [history]
  );

  const activate = async () => {
    if (!selectedPackageId) {
      message.warning('Select a package first');
      return;
    }

    try {
      setIsLoading(true);
      await subscriptionService.activateMySubscription(selectedPackageId);
      message.success('Subscription activated');
      await load();
    } catch {
      message.error('Failed to activate subscription');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ padding: 24 }}>
      <Card>
        <Space style={{ width: '100%', justifyContent: 'space-between', marginBottom: 16 }}>
          <div>
            <Title level={3} style={{ margin: 0 }}>My Subscription</Title>
            <Text type="secondary">Activate package for your current admin account.</Text>
          </div>
          <Button icon={<ReloadOutlined />} onClick={load} loading={isLoading}>Refresh</Button>
        </Space>

        <Space direction="vertical" size={16} style={{ width: '100%' }}>
          <Card size="small" title="Active Plan">
            {activeSubscription ? (
              <Space>
                <Tag color="blue">{activeSubscription.packageName}</Tag>
                <Text type="secondary">Started: {new Date(activeSubscription.startedAt).toLocaleString()}</Text>
              </Space>
            ) : (
              <Text type="secondary">No active subscription yet.</Text>
            )}
          </Card>

          <Card size="small" title="Activate New Plan">
            <Space wrap>
              <Select
                style={{ minWidth: 320 }}
                value={selectedPackageId}
                onChange={setSelectedPackageId}
                options={packages.map((item) => ({ value: item.id, label: `${item.name} (${item.slug ?? 'no-slug'})` }))}
                placeholder="Select package"
              />
              <Button type="primary" onClick={activate} loading={isLoading}>Activate</Button>
            </Space>
          </Card>
        </Space>
      </Card>
    </div>
  );
};

export default CurrentSubscription;
