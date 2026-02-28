import React, { Suspense, useEffect } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { Spin } from "antd";
import { routes } from "../../config/routes";
import AuthLayout from "../../components/layouts/auth/AuthLayout";
import DashboardLayout from "../../components/layouts/dashboard/DashboardLayout";
import { Forbidden, NotFound, ServerError } from "../../app/common/errors";
import ProtectedRoute from "./guards/ProtectedRoute";

// Lazy loaded pages
const Login = React.lazy(() => import("../../features/auth/pages/Login"));
const DashboardHome = React.lazy(
  () => import("../../features/dashboard/pages/DashboardHome")
);

// Loading spinner component
const LoadingSpinner = () => (
  <div className="flex h-screen w-screen items-center justify-center">
    <Spin size="large" />
    {/* <div className="mt-4 text-gray-600">Loading...</div> */}
  </div>
);

// Analytics service (placeholder)
const analyticsService = {
  trackPageView: (pathname: string) => {
    // Implement analytics tracking here
    console.log("Page view:", pathname);
  },
};

// AppRouter component handles routing with Redux state management
const AppRouter: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    analyticsService.trackPageView(location.pathname);
  }, [location.pathname]);

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route
          path={routes.root}
          element={<Navigate to={routes.auth.login} replace />}
        />

        <Route path={routes.auth.root} element={<AuthLayout />}>
          <Route index element={<Navigate to={routes.auth.login} replace />} />
          <Route path={routes.auth.login} element={<Login />} />
        </Route>

        <Route
          path={routes.dashboard.root}
          element={
            <ProtectedRoute requiredRole="admin">
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardHome />} />
        </Route>

        <Route path={routes.errors.forbidden} element={<Forbidden />} />
        <Route path={routes.errors.serverError} element={<ServerError />} />
        <Route path={routes.errors.notFound} element={<NotFound />} />

        <Route
          path="*"
          element={<Navigate to={routes.errors.notFound} replace />}
        />
      </Routes>
    </Suspense>
  );
};

export default AppRouter;
