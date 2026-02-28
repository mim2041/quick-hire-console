export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: "/auth/login",
    REFRESH: "/auth/refresh",
    LOGOUT: "/auth/logout",
    ME: "/auth/me",
  },
  JOBS: {
    LIST: "/jobs",
    CREATE: "/jobs",
    GET_BY_ID: (id: string) => `/jobs/${id}`,
    DELETE: (id: string) => `/jobs/${id}`,
  },
  APPLICATIONS: {
    LIST: "/applications",
    CREATE: "/applications",
    GET_BY_ID: (id: string) => `/applications/${id}`,
    UPDATE: (id: string) => `/applications/${id}`,
    DELETE: (id: string) => `/applications/${id}`,
  },
  // Legacy stubs for unused services (build-only; not used by QuickHire app)
  MEDIA: {
    UPLOAD: "/media/upload",
  },
  QUOTA: {
    ADMIN_USER_SUMMARY: "/admin/users",
  },
  ADMIN: {
    GET_AUDIT_LOGS: "/admin/audit",
  },
  FOLDERS: {
    LIST: "/folders",
    CREATE: "/folders",
    UPDATE: (id: string) => `/folders/${id}`,
    DELETE: (id: string) => `/folders/${id}`,
  },
  FILES: {
    LIST: "/files",
    UPLOAD: "/files",
    GET_BY_ID: (id: string) => `/files/${id}`,
    UPDATE: (id: string) => `/files/${id}`,
    DELETE: (id: string) => `/files/${id}`,
  },
  PACKAGES: {
    GET_ALL: "/packages",
    CREATE: "/admin/packages",
    UPDATE: (id: string) => `/admin/packages/${id}`,
    DELETE: (id: string) => `/admin/packages/${id}`,
  },
  USER_SUBSCRIPTIONS: {
    ACTIVATE: "/subscriptions/activate",
    MY_HISTORY: "/subscriptions/me",
    MY_CURRENT: "/subscriptions/me",
  },
} as const;
