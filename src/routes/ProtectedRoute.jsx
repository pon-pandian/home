import React from "react";
import { Redirect } from "react-router-dom";

const ProtectedRoute = ({ component: Component, role, allowedRoles }) => {
  const isAuthenticated = !!role;
  return isAuthenticated && allowedRoles.includes(role) ? (
    <Component />
  ) : (
    <Redirect to="/signin" />
  );
};

export default ProtectedRoute;
