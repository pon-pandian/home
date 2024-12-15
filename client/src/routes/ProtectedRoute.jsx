import React from "react";

const ProtectedRoute = ({ component: Component, role, allowedRoles }) => {
  const isAuthenticated = !!role;
  console.log("isAuthenticated", isAuthenticated);

  return isAuthenticated && allowedRoles.includes(role) ? (
    <Component />
  ) : (
    <Component />
  );
};

export default ProtectedRoute;
