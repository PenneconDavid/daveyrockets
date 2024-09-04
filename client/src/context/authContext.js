import React, { createContext, useState, useContext, useEffect } from "react";
import { getToken, isLoggedIn, logout } from "../controllers/auth";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    isAuthenticated: isLoggedIn(),
    token: getToken(),
    userRole: null, // Initialize userRole as null
  });

  useEffect(() => {
    if (auth.isAuthenticated) {
      const decodedToken = JSON.parse(atob(getToken().split(".")[1]));
      console.log("Decoded Token:", decodedToken); // Log the decoded token to verify
      setAuth({
        isAuthenticated: true,
        token: getToken(),
        userRole: decodedToken.role,
      });
    }
  }, [auth.isAuthenticated]);

  const handleLogout = () => {
    logout();
    setAuth({ isAuthenticated: false, token: null, userRole: null });
  };

  return (
    <AuthContext.Provider value={{ auth, setAuth, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuthContext = () => useContext(AuthContext);
