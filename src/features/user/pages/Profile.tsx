import React, { useState, useEffect } from "react";
import {
  Card,
  Form,
  Input,
  Button,
  Typography,
  Avatar,
  message,
  Divider,
} from "antd";
import { UserOutlined, SaveOutlined, EditOutlined } from "@ant-design/icons";
import { useAppSelector } from "../../../core/store/hooks";
import { selectUser } from "../../auth/store/authSelectors";

const { Title, Text } = Typography;

interface ProfileFormData {
  first_name: string;
  last_name: string;
  email: string;
}

const Profile: React.FC = () => {
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const user = useAppSelector(selectUser);

  useEffect(() => {
    // Load user data from Redux state
    if (user) {
      form.setFieldsValue({
        first_name: user.name?.split(" ")[0] || "",
        last_name: user.name?.split(" ")[1] || "",
        email: user.email || "",
      });
    }
  }, [form, user]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset form to original values
    form.setFieldsValue({
      first_name: user?.name?.split(" ")[0] || "",
      last_name: user?.name?.split(" ")[1] || "",
      email: user?.email || "",
    });
  };

  const handleSave = async (_values: ProfileFormData) => {
    setIsLoading(true);
    console.log(_values);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // In a real app, you would dispatch an action to update the user in Redux
      // For now, we'll just show a success message
      message.success("Profile updated successfully!");
      setIsEditing(false);
    } catch {
      message.error("Failed to update profile. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ padding: "24px", maxWidth: "800px", margin: "0 auto" }}>
      <Title level={2}>Profile Settings</Title>

      <Card>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "24px",
          }}
        >
          <Avatar
            size={64}
            icon={<UserOutlined />}
            style={{ marginRight: "16px" }}
          />
          <div>
            <Title level={4} style={{ margin: 0 }}>
              {user?.name || "User Name"}
            </Title>
            <Text type="secondary">{user?.email || "user@example.com"}</Text>
          </div>
        </div>

        <Divider />

        <Form
          form={form}
          layout="vertical"
          onFinish={handleSave}
          disabled={!isEditing}
        >
          <div style={{ display: "flex", gap: "16px" }}>
            <Form.Item
              name="first_name"
              label="First Name"
              rules={[
                { required: true, message: "Please input your first name!" },
              ]}
              style={{ flex: 1 }}
            >
              <Input placeholder="First name" />
            </Form.Item>

            <Form.Item
              name="last_name"
              label="Last Name"
              rules={[
                { required: true, message: "Please input your last name!" },
              ]}
              style={{ flex: 1 }}
            >
              <Input placeholder="Last name" />
            </Form.Item>
          </div>

          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: "Please input your email!" },
              { type: "email", message: "Please enter a valid email!" },
            ]}
          >
            <Input placeholder="Email address" />
          </Form.Item>

          <div
            style={{ display: "flex", gap: "8px", justifyContent: "flex-end" }}
          >
            {isEditing ? (
              <>
                <Button onClick={handleCancel}>Cancel</Button>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={isLoading}
                  icon={<SaveOutlined />}
                >
                  Save Changes
                </Button>
              </>
            ) : (
              <Button
                type="primary"
                onClick={handleEdit}
                icon={<EditOutlined />}
              >
                Edit Profile
              </Button>
            )}
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default Profile;
