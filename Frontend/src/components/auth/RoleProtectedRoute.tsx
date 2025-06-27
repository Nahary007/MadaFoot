import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { UserRole } from "../../types";

interface RoleProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles: UserRole[];
  redirectTo?: string;
}

const RoleProtectedRoute: React.FC<RoleProtectedRouteProps> = ({
  children,
  allowedRoles,
  redirectTo = "/login",
}) => {
  const { authState } = useAuth();
  const location = useLocation();

  if (authState.loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!authState.isAuthenticated) {
    return (
      <Navigate
        to={redirectTo}
        state={{ redirect: location.pathname }}
        replace
      />
    );
  }

  if (!authState.user || !allowedRoles.includes(authState.user.role)) {
    // Redirect based on user role
    switch (authState.user?.role) {
      case "admin":
        return <Navigate to="/admin/dashboard" replace />;
      case "owner":
        return <Navigate to="/owner/dashboard" replace />;
      case "visitor":
        return <Navigate to="/dashboard" replace />;
      default:
        return <Navigate to="/" replace />;
    }
  }

  return <>{children}</>;
};

export default RoleProtectedRoute;
