import React from 'react';
import { Button, Card, Space, Typography } from 'antd';
import { LinkOutlined } from '@ant-design/icons';
import { ENV } from '../../../config/env';

const { Title, Paragraph, Text } = Typography;

const ApiDocs: React.FC = () => {
  const docsUrl = `${ENV.BASE_URL.replace(/\/$/, '')}/docs`;

  return (
    <div style={{ padding: 24 }}>
      <Card>
        <Space direction="vertical" size={12}>
          <Title level={3} style={{ margin: 0 }}>
            API Documentation (Swagger)
          </Title>
          <Paragraph style={{ marginBottom: 0 }}>
            Backend Swagger should expose all auth, package, folder, file, and quota endpoints with request/response schemas and error codes.
          </Paragraph>
          <Text code>{docsUrl}</Text>
          <Button type="primary" icon={<LinkOutlined />} href={docsUrl} target="_blank">
            Open Swagger UI
          </Button>
        </Space>
      </Card>
    </div>
  );
};

export default ApiDocs;
