import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "/api";

export const getBlogs = async (token) => {
  const response = await axios.get(`${API_URL}/blogs`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const createBlog = async (blogData, token) => {
  const response = await axios.post(`${API_URL}/blogs`, blogData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const deleteBlog = async (blogId, token) => {
  const response = await axios.delete(`${API_URL}/blogs/${blogId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Add this function for updating a blog
export const updateBlog = async (blogId, blogData, token) => {
  const response = await axios.put(`${API_URL}/blogs/${blogId}`, blogData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Add this function for fetching a single blog by its ID
export const getBlog = async (blogId, token) => {
  const response = await axios.get(`${API_URL}/blogs/${blogId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
