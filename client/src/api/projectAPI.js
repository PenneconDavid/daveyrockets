import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "/api";

export const getProjects = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/projects`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching projects:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const createProject = async (projectData, token) => {
  try {
    const response = await axios.post(`${API_URL}/projects`, projectData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error creating project:", error.response.data);
    throw error.response.data || new Error("Failed to create project");
  }
};

export const updateProject = async (projectId, projectData, token) => {
  try {
    console.log(
      `PUT Request to /api/projects/${projectId} with data:`,
      projectData
    );
    const response = await axios.put(
      `${API_URL}/projects/${projectId}`,
      projectData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating project:", error.response.data);
    throw error.response.data;
  }
};

export const deleteProject = async (id, token) => {
  try {
    const response = await axios.delete(`${API_URL}/projects/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error deleting project:",
      error.response?.data || error.message
    );
    throw error;
  }
};
