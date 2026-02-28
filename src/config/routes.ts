// Minimal application routes for QuickHire admin console
export const routes = {
  root: "/",
  auth: {
    root: "/auth",
    login: "/auth/login",
  },
  dashboard: {
    root: "/dashboard",
    jobs: "/dashboard/jobs",
    jobsNew: "/dashboard/jobs/new",
    jobsEdit: "/dashboard/jobs/:id/edit",
    applications: "/dashboard/applications",
    profile: "/dashboard/profile",
  },
  errors: {
    notFound: "/404",
    forbidden: "/403",
    serverError: "/500",
    unauthorized: "/401",
  },
  public: {},
} as const;

export type RouteKey = keyof typeof routes;
