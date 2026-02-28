// API Endpoints Configuration
// Strictly scoped to SaaS File Management assessment requirements.

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
  },

  PACKAGES: {
    GET_ALL: '/packages',
    CREATE: '/admin/packages',
    UPDATE: (id: string) => `/admin/packages/${id}`,
    DELETE: (id: string) => `/admin/packages/${id}`,
  },

  USER_SUBSCRIPTIONS: {
    ACTIVATE: '/subscriptions/activate',
    MY_HISTORY: '/subscriptions/me',
    MY_CURRENT: '/subscriptions/me',
  },

  FOLDERS: {
    LIST: '/folders',
    CREATE: '/folders',
    UPDATE: (id: string) => `/folders/${id}`,
    DELETE: (id: string) => `/folders/${id}`,
  },

  FILES: {
    LIST: '/files',
    UPLOAD: '/files',
    GET_BY_ID: (id: string) => `/files/${id}`,
    DOWNLOAD: (id: string) => `/files/${id}/download`,
    UPDATE: (id: string) => `/files/${id}`,
    DELETE: (id: string) => `/files/${id}`,
  },

  QUOTA: {
    MY_QUOTA: '/users/me/quota',
    ADMIN_USER_SUMMARY: '/admin/users',
  },

  ADMIN: {
    GET_AUDIT_LOGS: '/admin/audit',
  },

  MEDIA: {
    UPLOAD: '/media/upload',
  },
} as const;

export const buildEndpoint = (
  base: string,
  params: Record<string, string> = {}
): string => {
  let endpoint = base;
  Object.entries(params).forEach(([key, value]) => {
    endpoint = endpoint.replace(`:${key}`, value);
  });
  return endpoint;
};

export type EndpointKey = keyof typeof API_ENDPOINTS;
