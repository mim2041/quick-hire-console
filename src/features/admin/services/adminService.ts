import { api } from '../../../core/api/api-client';
import { API_ENDPOINTS } from '../../../core/api/endpoints';

interface ApiEnvelope<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface AdminUserQuotaSummary {
  id: string;
  email: string;
  name: string;
  role: string;
  quota?: {
    folderCount: number;
    fileCount: number;
    usedStorageBytes: number;
  };
}

export interface AdminAuditLog {
  id: string;
  actorUserId?: string;
  actionType: string;
  targetType?: string;
  targetId?: string;
  metaJson?: Record<string, unknown>;
  createdAt: string;
}

export const adminService = {
  async getUserQuotaSummary() {
    const response = await api.get<ApiEnvelope<AdminUserQuotaSummary[]>>(
      API_ENDPOINTS.QUOTA.ADMIN_USER_SUMMARY
    );
    return response?.data ?? [];
  },

  async getAuditLogs() {
    const response = await api.get<ApiEnvelope<AdminAuditLog[]>>(
      API_ENDPOINTS.ADMIN.GET_AUDIT_LOGS
    );
    return response?.data ?? [];
  },
};
