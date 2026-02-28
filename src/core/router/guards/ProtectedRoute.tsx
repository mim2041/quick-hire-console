import React from "react";
import { Navigate, useLocation } from "react-router-dom";
// import { maintenanceService } from "../../services/maintenanceService";
import { routes } from "../../../config/routes";
import { useAppSelector } from "../../store/hooks";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: string;
  requiredPermissions?: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredRole,
  // requiredPermissions = [],
}) => {
  const location = useLocation();
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);

  // Check if user should bypass maintenance mode
  // Note: 'shouldBypass' is not used and 'user?.ip' does not exist on type 'User', so this code is removed.

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return (
      <Navigate to={routes.auth.login} state={{ from: location }} replace />
    );
  }


  // Check role requirements: on mismatch, send to role-based dashboard root
  if (requiredRole && user?.role !== requiredRole) {
    return <Navigate to={routes.dashboard.root} replace />;
  }

  // Check permission requirements
  // if (requiredPermissions.length > 0) {
  //   const hasRequiredPermissions = requiredPermissions.every((permission) =>
  //     user?.permissions?.includes(permission)
  //   );

  //   if (!hasRequiredPermissions) {
  //     return <Navigate to={routes.errors.forbidden} replace />;
  //   }
  // }

  return <>{children}</>;
};

export default ProtectedRoute;
