import React, { useState } from "react";
import {
  Card,
  Form,
  Input,
  Button,
  Typography,
  Switch,
  Select,
  message,
  Divider,
} from "antd";
import { SaveOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;
const { Option } = Select;

const Settings: React.FC = () => {
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async (_values: any) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      message.success("Settings saved successfully!");
    } catch (error) {
      message.error("Failed to save settings. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ padding: "24px", maxWidth: "800px", margin: "0 auto" }}>
      <Title level={2}>Settings</Title>

      <Card title="General Settings" style={{ marginBottom: "24px" }}>
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSave}
          initialValues={{
            theme: "light",
            language: "en",
            notifications: true,
            emailNotifications: true,
          }}
        >
          <Form.Item name="theme" label="Theme">
            <Select>
              <Option value="light">Light</Option>
              <Option value="dark">Dark</Option>
              <Option value="auto">Auto</Option>
            </Select>
          </Form.Item>

          <Form.Item name="language" label="Language">
            <Select>
              <Option value="en">English</Option>
              <Option value="es">Spanish</Option>
              <Option value="fr">French</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="notifications"
            label="Push Notifications"
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>

          <Form.Item
            name="emailNotifications"
            label="Email Notifications"
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>
        </Form>
      </Card>

      <Card title="Store Settings" style={{ marginBottom: "24px" }}>
        <Form
          layout="vertical"
          initialValues={{
            storeName: "Deshi Bazar",
            currency: "USD",
            timezone: "UTC",
          }}
        >
          <Form.Item name="storeName" label="Store Name">
            <Input placeholder="Enter store name" />
          </Form.Item>

          <Form.Item name="currency" label="Currency">
            <Select>
              <Option value="USD">USD - US Dollar</Option>
              <Option value="EUR">EUR - Euro</Option>
              <Option value="GBP">GBP - British Pound</Option>
              <Option value="BDT">BDT - Bangladeshi Taka</Option>
            </Select>
          </Form.Item>

          <Form.Item name="timezone" label="Timezone">
            <Select>
              <Option value="UTC">UTC</Option>
              <Option value="America/New_York">Eastern Time</Option>
              <Option value="Europe/London">London</Option>
              <Option value="Asia/Dhaka">Dhaka</Option>
            </Select>
          </Form.Item>
        </Form>
      </Card>

      <Card title="Security">
        <div style={{ marginBottom: "16px" }}>
          <Text strong>Change Password</Text>
          <br />
          <Text type="secondary">
            Update your password to keep your account secure
          </Text>
          <Button type="link" style={{ padding: 0, marginLeft: "8px" }}>
            Change Password
          </Button>
        </div>

        <Divider />

        <div style={{ marginBottom: "16px" }}>
          <Text strong>Two-Factor Authentication</Text>
          <br />
          <Text type="secondary">
            Add an extra layer of security to your account
          </Text>
          <Button type="link" style={{ padding: 0, marginLeft: "8px" }}>
            Enable 2FA
          </Button>
        </div>

        <Divider />

        <div style={{ textAlign: "right" }}>
          <Button
            type="primary"
            onClick={() => form.submit()}
            loading={isLoading}
            icon={<SaveOutlined />}
          >
            Save All Settings
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Settings;
