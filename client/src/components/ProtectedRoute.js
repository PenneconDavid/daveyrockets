import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/authContext";

const ProtectedRoute = () => {
  const { auth } = useContext(AuthContext);

  console.log("ProtectedRoute auth:", auth); // Logs the auth state

  // Explicitly check if auth and isAuthenticated are correctly set
  if (auth && auth.isAuthenticated) {
    return <Outlet />;
  } else {
    return <Navigate to="/login" />;
  }
};

export default ProtectedRoute;
