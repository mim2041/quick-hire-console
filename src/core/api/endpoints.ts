export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: "/api/auth/login",
    REFRESH: "/api/auth/refresh",
    LOGOUT: "/api/auth/logout",
    ME: "/api/auth/me",
  },
  JOBS: {
    LIST: "/api/jobs",
    CREATE: "/api/jobs",
    GET_BY_ID: (id: string) => `/api/jobs/${id}`,
    DELETE: (id: string) => `/api/jobs/${id}`,
  },
  APPLICATIONS: {
    CREATE: "/api/applications",
  },
} as const;
