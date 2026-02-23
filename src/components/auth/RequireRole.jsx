import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";

const RequireRole = ({ roles = [], children }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/admin/login" replace />;
  }

  if (roles.length && !roles.includes(user.role)) {
    return <Navigate to="/admin" replace />;
  }

  return children;
};

export default RequireRole;







