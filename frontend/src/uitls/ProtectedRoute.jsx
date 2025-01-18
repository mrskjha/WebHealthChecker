import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthContext } from "./AuthProvider"; // Ensure the correct path to AuthProvider

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuthContext();

  // If the user is authenticated, render the children components
  // If not authenticated, redirect to the "/login" page
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
