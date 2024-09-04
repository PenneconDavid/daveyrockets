import React, { useState, useEffect, useCallback } from "react";
import { createBlog, getBlogs, deleteBlog, updateBlog } from "../api/blogAPI";
import {
  getProjects,
  deleteProject,
  updateProject,
  createProject,
} from "../api/projectAPI";
import { Link } from "react-router-dom";
import ProjectForm from "../components/ProjectForm";
import { useAuthContext } from "../context/authContext";

const AdminDashboard = () => {
  const { auth } = useAuthContext();
  const [blogs, setBlogs] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [formTitle, setFormTitle] = useState("");
  const [formContent, setFormContent] = useState("");
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);

  const fetchBlogs = useCallback(async () => {
    try {
      const blogsData = await getBlogs(auth.token);
      setBlogs(blogsData);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  }, [auth.token]);

  const fetchProjects = useCallback(async () => {
    try {
      const projectsData = await getProjects(auth.token);
      setProjects(projectsData);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  }, [auth.token]);

  useEffect(() => {
    fetchBlogs();
    fetchProjects();
  }, [fetchBlogs, fetchProjects]);

  const handleCreateBlog = async () => {
    try {
      await createBlog({ title: formTitle, content: formContent }, auth.token);
      setFormTitle("");
      setFormContent("");
      fetchBlogs();
    } catch (error) {
      console.error("Error creating blog:", error);
    }
  };

  const handleDeleteBlog = async (blogId) => {
    try {
      await deleteBlog(blogId, auth.token);
      fetchBlogs();
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };

  const handleUpdateBlog = async () => {
    try {
      await updateBlog(
        selectedBlog._id,
        { title: formTitle, content: formContent },
        auth.token
      );
      setSelectedBlog(null);
      setFormTitle("");
      setFormContent("");
      fetchBlogs();
    } catch (error) {
      console.error("Error updating blog:", error);
    }
  };

  const handleEditBlogClick = (blog) => {
    setSelectedBlog(blog);
    setFormTitle(blog.title);
    setFormContent(blog.content);
  };

  const handleCreateProject = async (projectData) => {
    try {
      await createProject(projectData, auth.token);
      fetchProjects(); // Fetch projects again to update the list
    } catch (error) {
      console.error("Error creating project:", error);
    }
  };

  const handleUpdateProject = async (projectId, projectData) => {
    try {
      console.log("Updating Project ID:", projectId);
      console.log("Project Data:", projectData);
      await updateProject(projectId, projectData, auth.token);
      setSelectedProject(null);
      fetchProjects();
    } catch (error) {
      console.error("Error updating project:", error);
    }
  };

  const handleEditProjectClick = (project) => {
    setSelectedProject(project);
  };

  const handleDeleteProject = async (projectId) => {
    try {
      await deleteProject(projectId, auth.token);
      fetchProjects();
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-6xl p-6 font-bold text-center my-8">
        Admin Dashboard
      </h1>

      <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold mb-4 bg-gray-800">
          {selectedBlog ? "Edit Blog" : "Create Blog"}
        </h2>
        <input
          type="text"
          placeholder="Title"
          className="block w-full rounded-md border-0 px-3.5 py-2 mb-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-lime-600 sm:text-sm sm:leading-6"
          value={formTitle}
          onChange={(e) => setFormTitle(e.target.value)}
        />
        <textarea
          placeholder="Content"
          className="block w-full rounded-md border-0 px-3.5 py-2 mb-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-lime-600 sm:text-sm sm:leading-6"
          value={formContent}
          onChange={(e) => setFormContent(e.target.value)}
        />
        <button
          onClick={selectedBlog ? handleUpdateBlog : handleCreateBlog}
          className="bg-lime-600 text-white px-4 py-2 rounded-md hover:bg-lime-700 transition"
        >
          {selectedBlog ? "Update Blog" : "Create Blog"}
        </button>
        {selectedBlog && (
          <button
            onClick={() => {
              setSelectedBlog(null);
              setFormTitle("");
              setFormContent("");
            }}
            className="ml-4 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
          >
            Cancel
          </button>
        )}
      </div>

      <div className="bg-[#282828] mx-auto p-4 pb-40 max-w-6xl mt-10">
        <h2 className="text-5xl font-bold text-center text-[#F3EACC] mb-8 py-10 bg-inherit">
          All Blogs
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <div
              className="bg-gray-800 p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
              key={blog._id}
            >
              <h3 className="text-2xl font-semibold bg-gray-800 text-lime-600">
                {blog.title}
              </h3>
              <p className="text-[#F3EACC] mt-2 bg-gray-800 text-[18px]">
                {blog.content}
              </p>
              <div className="space-x-6 justify text-blue-400 mt-4 block text-center hover:text-blue-500">
                <button onClick={() => handleEditBlogClick(blog)}>Edit</button>
                <button onClick={() => handleDeleteBlog(blog._id)}>
                  Delete
                </button>
                <Link to={`/blogs/${blog._id}`}>View</Link>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-2xl">
          <h2>{selectedProject ? "Edit Project" : "Create Project"}</h2>
          <ProjectForm
            onProjectCreated={handleCreateProject}
            selectedProject={selectedProject}
            onProjectUpdated={handleUpdateProject}
          />
        </div>

        <div className="container bg-[#282828] mx-auto p-4 pb-40 max-w-6xl mt-10">
          <h2 className="text-5xl font-bold text-center text-[#F3EACC] mb-8 py-10 bg-inherit">
            All Projects
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <div
                className="bg-gray-800 p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
                key={project._id}
              >
                <h3 className="text-2xl font-semibold text-lime-600 bg-gray-800">
                  {project.title}
                </h3>
                <p className="text-[#F3EACC] mt-2 text-[18px] bg-gray-800">
                  {project.description}
                </p>
                <button
                  onClick={() => handleEditProjectClick(project)}
                  className="text-blue-400 hover:text-blue-500"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteProject(project._id)}
                  className="ml-4 text-red-400 hover:text-red-500"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
