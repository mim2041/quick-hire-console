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
} as const;
