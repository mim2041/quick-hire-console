import React, { useState } from "react";
import { Form, Input, Button, Typography, Alert } from "antd";
import { useNavigate } from "react-router-dom";
import { MailOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import { routes } from "../../../config/routes";

const { Text, Title } = Typography;

const ForgotPassword: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (_values: { email: string }) => {
    setIsLoading(true);
    setError(null);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setIsEmailSent(true);
    } catch (err) {
      setError("Failed to send reset email. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToLogin = () => {
    navigate(routes.auth.login);
  };

  if (isEmailSent) {
    return (
      <div
        style={{
          display: "flex",
          minHeight: "100vh",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        }}
      >
        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "2rem",
            backgroundColor: "white",
          }}
        >
          <div
            style={{ width: "100%", maxWidth: "400px", textAlign: "center" }}
          >
            <div style={{ marginBottom: "2rem" }}>
              <div
                style={{
                  width: "80px",
                  height: "80px",
                  borderRadius: "50%",
                  backgroundColor: "#52c41a",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 1rem",
                }}
              >
                <MailOutlined style={{ fontSize: "32px", color: "white" }} />
              </div>
              <Title level={2}>Check Your Email</Title>
              <Text type="secondary">
                We've sent a password reset link to your email address.
              </Text>
            </div>

            <Button
              type="primary"
              onClick={handleBackToLogin}
              style={{ width: "100%" }}
            >
              Back to Login
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      }}
    >
      {/* Left Side - Branding */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          color: "white",
          padding: "2rem",
        }}
      >
        <div style={{ textAlign: "center", maxWidth: "400px" }}>
          <Title level={1} style={{ color: "white", marginBottom: "1rem" }}>
            Deshi Bazar
          </Title>
          <Title
            level={3}
            style={{ color: "rgba(255,255,255,0.8)", fontWeight: "normal" }}
          >
            Reset Password
          </Title>
          <Text style={{ color: "rgba(255,255,255,0.7)", fontSize: "16px" }}>
            Enter your email to receive reset instructions
          </Text>
        </div>
      </div>

      {/* Right Side - Form */}
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem",
          backgroundColor: "white",
        }}
      >
        <div style={{ width: "100%", maxWidth: "400px" }}>
          <div style={{ textAlign: "center", marginBottom: "2rem" }}>
            <Title level={2}>Forgot Password?</Title>
            <Text type="secondary">
              Enter your email address and we'll send you a reset link
            </Text>
          </div>

          {error && (
            <Alert
              message={error}
              type="error"
              showIcon
              style={{ marginBottom: "1rem" }}
            />
          )}

          <Form
            form={form}
            name="forgotPassword"
            onFinish={handleSubmit}
            layout="vertical"
            size="large"
          >
            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true, message: "Please input your email!" },
                { type: "email", message: "Please enter a valid email!" },
              ]}
            >
              <Input prefix={<MailOutlined />} placeholder="Enter your email" />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={isLoading}
                style={{ width: "100%" }}
              >
                Send Reset Link
              </Button>
            </Form.Item>
          </Form>

          <div style={{ textAlign: "center", marginTop: "1rem" }}>
            <Button
              type="link"
              icon={<ArrowLeftOutlined />}
              onClick={handleBackToLogin}
            >
              Back to Login
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
