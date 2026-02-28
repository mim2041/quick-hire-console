import React from "react";
import { useSelector } from "react-redux";
import { Alert, Card, Typography, Button, Result } from "antd";
import { LockOutlined, UserOutlined, CodeOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { routes } from "../../config/routes";
import type { RootState } from "../../core/store/rootReducer";

const { Title, Text } = Typography;

interface PermissionGuardProps {
  children: React.ReactNode;
  requiredRole?: string | string[];
  requiredPermissions?: string[];
  fallback?: React.ReactNode;
  showAlert?: boolean;
  stageHideContent?: boolean;
}

const PermissionGuard: React.FC<PermissionGuardProps> = ({
  children,
  requiredRole,
  requiredPermissions = [],
  fallback,
  showAlert = true,
  stageHideContent = false,
}) => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useSelector(
    (state: RootState) => state.auth
  );

  // Check if user is authenticated
  if (!isAuthenticated) {
    return showAlert ? (
      <Card className="text-center py-8">
        <UserOutlined className="text-4xl text-gray-400 mb-4" />
        <Title level={4}>Authentication Required</Title>
        <Text type="secondary" className="block mb-4">
          Please log in to access this feature.
        </Text>
        <Button type="primary" href="/login">
          Go to Login
        </Button>
      </Card>
    ) : null;
  }

  // Check if user has required role
  if (requiredRole) {
    const allowedRoles = Array.isArray(requiredRole)
      ? requiredRole
      : [requiredRole];
    const hasRequiredRole = allowedRoles.includes(user?.role || "");

    if (!hasRequiredRole) {
      return showAlert ? (
        <Card className="text-center py-8">
          <LockOutlined className="text-4xl text-red-400 mb-4" />
          <Title level={4}>Access Denied</Title>
          <Text type="secondary" className="block mb-4">
            You don't have the required permissions to access this feature.
            {requiredRole && (
              <span className="block mt-2">
                Required role:{" "}
                <Text strong>
                  {Array.isArray(requiredRole)
                    ? requiredRole.join(" or ")
                    : requiredRole}
                </Text>
              </span>
            )}
          </Text>
          <Alert
            message="Permission Required"
            description={`This feature requires ${
              Array.isArray(requiredRole)
                ? requiredRole.join(" or ")
                : requiredRole
            } access. Please contact your administrator if you believe this is an error.`}
            type="warning"
            showIcon
            className="max-w-md mx-auto"
          />
        </Card>
      ) : (
        fallback || null
      );
    }
  }

  // Check if user has required permissions
  if (requiredPermissions.length > 0) {
    // For simplified auth, we'll just check if user has admin role for now
    const hasAllPermissions =
      user?.role === "admin" || user?.role === "super_admin";

    if (!hasAllPermissions) {
      return showAlert ? (
        <Card className="text-center py-8">
          <LockOutlined className="text-4xl text-red-400 mb-4" />
          <Title level={4}>Insufficient Permissions</Title>
          <Text type="secondary" className="block mb-4">
            You don't have the required permissions to access this feature.
          </Text>
          <Alert
            message="Missing Permissions"
            description={`Required permissions: ${requiredPermissions.join(
              ", "
            )}`}
            type="warning"
            showIcon
            className="max-w-md mx-auto"
          />
        </Card>
      ) : (
        fallback || null
      );
    }
  }

  // In staging mode, optionally hide content even if permitted
  if (stageHideContent) {
    return showAlert ? (
      <div className="flex items-center justify-center min-h-[70vh] p-6 max-w-lg mx-auto">
        <Result
          status="warning"
          icon={<CodeOutlined className="text-primary text-4xl" />}
          title="Feature in Development"
          subTitle="We are building this feature in the development environment. It is not available on staging yet. Once development is complete, it will be enabled here for testing and demo."
          extra={
            <Button
              type="primary"
              onClick={() => navigate(routes.dashboard.root)}
            >
              Back to Dashboard
            </Button>
          }
        />
      </div>
    ) : null;
  }

  // User has all required permissions, render children
  return <>{children}</>;
};

export default PermissionGuard;
