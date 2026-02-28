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
    CREATE: "/applications",
  },
} as const;
