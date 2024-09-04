import axios from "axios";

// Login method
export const login = async (email, password) => {
  const API_URL = process.env.REACT_APP_API_URL;
  console.log("Attempting to login with API URL:", `${API_URL}/auth/login`); // Log the URL being used
  try {
    const response = await axios.post(`${API_URL}/auth/login`, {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

// Logout method (optional, depending on your implementation)
export const logout = () => {
  // Add any client-side cleanup if necessary
};
