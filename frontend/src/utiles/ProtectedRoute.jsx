import React from "react";
import { Navigate } from "react-router-dom";
import { isAuthenticated, getUserRole } from "./Auth";

const ProtectedRoute = ({ element: Component, allowedRoles }) => {
  // ✅ Check if the user is logged in
  const authenticated = isAuthenticated();
  const userRole = getUserRole();

  // 🚫 If no token, redirect to login
  if (!authenticated) {
    return <Navigate to="/login" replace />;
  }

  // 🚫 If role not allowed, redirect to home (or unauthorized page)
  if (allowedRoles && !allowedRoles.includes(userRole)) {
    return <Navigate to="/" replace />;
  }

  // ✅ Render the protected component
  return <Component />;
};

export default ProtectedRoute;
