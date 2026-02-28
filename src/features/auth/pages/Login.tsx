import React, { useEffect } from "react";
import { Form, Input, Button, Typography, Alert, Checkbox, Card } from "antd";
import { useNavigate } from "react-router-dom";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "../../../core/store/hooks";
import { login, clearError } from "../store/authSlice";

import { routes } from "../../../config/routes";
import { selectIsLoading } from "../store/authSelectors";
import { selectError } from "../store/authSelectors";
import { selectIsAuthenticated } from "../store/authSelectors";
import type { LoginCredentials } from "../types/auth.types";

const { Text, Title } = Typography;

const Login: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const isLoading = useAppSelector(selectIsLoading);
  const error = useAppSelector(selectError);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const user = useAppSelector((state) => state.auth.user);

  useEffect(() => {
    // Clear any existing errors when component mounts
    dispatch(clearError());
  }, [dispatch]);

  useEffect(() => {
    // Redirect to dashboard if already authenticated
    if (isAuthenticated) {
      navigate(routes.dashboard.root, { replace: true });
    }
  }, [isAuthenticated, user, navigate]);

  const onFinish = async (
    values: LoginCredentials & { remember?: boolean },
  ) => {
    try {
      const loginData: LoginCredentials = {
        email: values.email,
        password: values.password,
        remember_me: values.remember || false,
      };
      await dispatch(login(loginData)).unwrap();
      // Navigation will be handled by the useEffect above
    } catch (error) {
      // Error is already handled by the Redux slice
      console.error("Login failed:", error);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{
        backgroundImage:
          "radial-gradient(circle at 0% 0%, #0f172a 0, #020617 50%, #000 100%)",
      }}
    >
      <div className="w-full max-w-md">
        <Card
          bordered={false}
          style={{
            borderRadius: 16,
            boxShadow:
              "0 18px 45px rgba(15,23,42,0.45), 0 0 0 1px rgba(148,163,184,0.25)",
          }}
        >
          <div className="text-center mb-6">
            <div className="mx-auto mb-4 h-10 w-10 rounded-full bg-slate-900 flex items-center justify-center">
              <UserOutlined style={{ color: "#38bdf8", fontSize: 20 }} />
            </div>
            <Title level={3} style={{ marginBottom: 4 }}>
              QuickHire Admin
            </Title>
            <Text type="secondary">
              Sign in to manage jobs and applications.
            </Text>
          </div>

          {error && (
            <Alert
              message="Login failed"
              description={error}
              type="error"
              showIcon
              className="mb-4"
            />
          )}

          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            autoComplete="off"
            size="large"
          >
            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true, message: "Please enter your email" },
                { type: "email", message: "Please enter a valid email" },
              ]}
            >
              <Input
                placeholder="admin@quickhire.test"
                prefix={<UserOutlined className="text-gray-400" />}
              />
            </Form.Item>

            <Form.Item
              name="password"
              label="Password"
              rules={[{ required: true, message: "Please enter your password" }]}
            >
              <Input.Password
                placeholder="Enter your password"
                prefix={<LockOutlined className="text-gray-400" />}
              />
            </Form.Item>

            <div className="flex items-center justify-between mb-2">
              <Form.Item
                name="remember"
                valuePropName="checked"
                style={{ marginBottom: 0 }}
              >
                <Checkbox>Remember me</Checkbox>
              </Form.Item>
            </div>

            <Form.Item style={{ marginBottom: 0 }}>
              <Button
                type="primary"
                htmlType="submit"
                loading={isLoading}
                className="w-full h-11 font-medium"
                style={{ background: "var(--color-dod-primary)" }}
              >
                {isLoading ? "Signing in..." : "Sign in"}
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </div>
  );
};

export default Login;
