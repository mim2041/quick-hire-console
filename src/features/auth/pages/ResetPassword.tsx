import React, { useState } from "react";
import { Form, Input, Button, Typography, Alert } from "antd";
import { useNavigate, Link } from "react-router-dom";
import { LockOutlined, CheckCircleOutlined } from "@ant-design/icons";
import { routes } from "../../../config/routes";

const { Text, Title } = Typography;

const ResetPassword: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (_values: {
    password: string;
    confirmPassword: string;
  }) => {
    setIsLoading(true);
    setError(null);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setIsSuccess(true);
    } catch (err) {
      setError("Failed to reset password. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToLogin = () => {
    navigate(routes.auth.login);
  };

  if (isSuccess) {
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
                <CheckCircleOutlined
                  style={{ fontSize: "32px", color: "white" }}
                />
              </div>
              <Title level={2}>Password Reset Successfully</Title>
              <Text type="secondary">
                Your password has been updated. You can now sign in with your
                new password.
              </Text>
            </div>

            <Button
              type="primary"
              onClick={handleBackToLogin}
              style={{ width: "100%" }}
            >
              Sign In
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
            Create a new password for your account
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
            <Title level={2}>Reset Password</Title>
            <Text type="secondary">Enter your new password below</Text>
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
            name="resetPassword"
            onFinish={handleSubmit}
            layout="vertical"
            size="large"
          >
            <Form.Item
              name="password"
              label="New Password"
              rules={[
                { required: true, message: "Please input your password!" },
                { min: 6, message: "Password must be at least 6 characters!" },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Enter new password"
              />
            </Form.Item>

            <Form.Item
              name="confirmPassword"
              label="Confirm Password"
              dependencies={["password"]}
              rules={[
                { required: true, message: "Please confirm your password!" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error("Passwords do not match!"));
                  },
                }),
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Confirm new password"
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={isLoading}
                style={{ width: "100%" }}
              >
                Reset Password
              </Button>
            </Form.Item>
          </Form>

          <div style={{ textAlign: "center", marginTop: "1rem" }}>
            <Link to={routes.auth.login}>Back to Login</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
