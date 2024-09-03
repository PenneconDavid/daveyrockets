import { login as loginAPI } from "../api/authAPI";

export const login = async (email, password) => {
  try {
    const data = await loginAPI(email, password);
    // Store JWT token in localStorage
    localStorage.setItem("token", data.token);
    return data;
  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  }
};

export const logout = () => {
  // Remove JWT token from localStorage
  localStorage.removeItem("token");
};

export const getToken = () => {
  return localStorage.getItem("token");
};

export const isLoggedIn = () => {
  return !!getToken(); // Returns true if a token is present
};
