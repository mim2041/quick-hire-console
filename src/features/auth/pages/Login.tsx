import React, { useEffect } from "react";
import { Form, Input, Button, Typography, Alert, Checkbox } from "antd";
import { useNavigate, Link } from "react-router-dom";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "../../../core/store/hooks";
import { login, clearError } from "../store/authSlice";

import { routes } from "../../../config/routes";
import { selectIsLoading } from "../store/authSelectors";
import { selectError } from "../store/authSelectors";
import { selectIsAuthenticated } from "../store/authSelectors";
import type { LoginCredentials } from "../types/auth.types";
import AuthLayoutLeft from "../../onboarding/AuthLayoutLeft";

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
    values: LoginCredentials & { remember?: boolean }
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
      className="min-h-screen flex flex-col lg:grid lg:grid-cols-2"
      style={{
        backgroundImage: `linear-gradient(#0F2B4BE0, #0F2B4B), url("/bg-auth.png")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Left Side - Hidden on mobile, visible on desktop */}
      <div className="hidden lg:block">
        <AuthLayoutLeft />
      </div>

      {/* Right Side - Login Form */}
      <div className="flex-1 lg:flex-none w-full h-full flex flex-col justify-center bg-white p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12">
        <div className="max-w-sm sm:max-w-md md:max-w-lg mx-auto w-full">
          {/* Header */}
          <div className="text-center mb-6 sm:mb-8 lg:mb-10">
            <Title
              level={2}
              className="!text-xl sm:!text-2xl lg:!text-3xl !mb-2 sm:!mb-3"
            >
              Welcome Back
            </Title>
            <Text className="text-sm sm:text-base lg:text-lg text-gray-600">
              Sign in to your Deshi Bazar account
            </Text>
          </div>

          {/* Error Alert */}
          {error && (
            <Alert
              message="Login Failed"
              description={error}
              type="error"
              showIcon
              className="mb-4 sm:mb-6"
            />
          )}

          {/* Login Form */}
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            autoComplete="off"
            size="large"
            className="space-y-4 sm:space-y-6"
          >
            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true, message: "Please enter your email!" },
                { type: "email", message: "Please enter a valid email!" },
              ]}
              className="!mb-4 sm:!mb-6"
            >
              <Input
                placeholder="Enter your email"
                prefix={<UserOutlined className="text-gray-400" />}
                className="!rounded-md !h-12 sm:!h-11 text-base sm:text-sm"
              />
            </Form.Item>

            <Form.Item
              name="password"
              label="Password"
              rules={[
                { required: true, message: "Please enter your password!" },
              ]}
              className="!mb-4 sm:!mb-6"
            >
              <Input.Password
                placeholder="Enter your password"
                prefix={<LockOutlined className="text-gray-400" />}
                className="!rounded-md !h-12 sm:!h-11 text-base sm:text-sm"
              />
            </Form.Item>

            <div className="flex items-center justify-between">
              <Form.Item
                name="remember"
                valuePropName="checked"
                className="!mb-0"
              >
                <Checkbox className="text-sm sm:text-base">
                  Remember me
                </Checkbox>
              </Form.Item>
            </div>

            <Form.Item className="!mb-4 sm:!mb-6">
              <Button
                type="primary"
                htmlType="submit"
                loading={isLoading}
                className="w-full h-12 sm:h-11 text-base sm:text-sm font-medium"
                style={{ background: "var(--color-dod-primary)" }}
              >
                {isLoading ? "Signing In..." : "Sign In"}
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;
