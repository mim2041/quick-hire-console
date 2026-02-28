import React, { useEffect, useState } from "react";
import { Card, Typography, Avatar, Spin, Alert } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { authService } from "../../auth/services/authService";
import { useAppSelector } from "../../../core/store/hooks";
import { selectUser } from "../../auth/store/authSelectors";

const { Title, Text } = Typography;

const Profile: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [me, setMe] = useState<{ id: string; name: string; email: string; role: string } | null>(null);
  const cachedUser = useAppSelector(selectUser);

  useEffect(() => {
    const fetchMe = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const current = await authService.getCurrentUser();
        setMe(current);
      } catch {
        setError("Failed to load profile from server. Showing cached data.");
      } finally {
        setIsLoading(false);
      }
    };

    void fetchMe();
  }, []);

  const displayUser = me ?? cachedUser;

  return (
    <div style={{ padding: "24px", maxWidth: "640px", margin: "0 auto" }}>
      <Title level={2}>My Profile</Title>

      <Card>
        {isLoading && (
          <div style={{ marginBottom: 16 }}>
            <Spin />
          </div>
        )}

        {error && (
          <Alert
            type="warning"
            message={error}
            showIcon
            style={{ marginBottom: 16 }}
          />
        )}

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
              {displayUser?.name ?? "QuickHire Admin"}
            </Title>
            <Text type="secondary">
              {displayUser?.email ?? "admin@quickhire.test"}
            </Text>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <div>
            <Text type="secondary">User ID</Text>
            <div>{displayUser?.id ?? "-"}</div>
          </div>
          <div>
            <Text type="secondary">Role</Text>
            <div>{displayUser?.role ?? "admin"}</div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Profile;
