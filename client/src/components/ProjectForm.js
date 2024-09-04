import React, { useState, useEffect } from "react";
import { useAuthContext } from "../context/authContext";
import { createProject, updateProject } from "../api/projectAPI";

const ProjectForm = ({
  onProjectCreated,
  selectedProject,
  onProjectUpdated,
}) => {
  const { auth } = useAuthContext();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [link, setLink] = useState("");

  useEffect(() => {
    if (selectedProject) {
      setTitle(selectedProject.title || "");
      setDescription(selectedProject.description || "");
      setThumbnail(selectedProject.thumbnail || "");
      setLink(selectedProject.link || "");
    }
  }, [selectedProject]);

  const onSubmit = async (e) => {
    e.preventDefault();
    const projectData = {
      title,
      description,
      thumbnail,
      link,
    };

    console.log("Project Data being submitted:", projectData);

    try {
      if (selectedProject) {
        await onProjectUpdated(selectedProject._id, projectData);
      } else {
        await onProjectCreated(projectData);
        // Optionally reset form fields after successful submission
        resetForm();
      }
    } catch (error) {
      console.error("Error submitting project:", error);
    }
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setThumbnail("");
    setLink("");
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label htmlFor="title" className="block">
          Project Title:
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border p-2"
          required
        />
      </div>
      <div>
        <label htmlFor="description" className="block">
          Description:
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border p-2"
          required
        />
      </div>
      <div>
        <label htmlFor="thumbnail" className="block">
          Thumbnail URL:
        </label>
        <input
          id="thumbnail"
          type="text"
          value={thumbnail}
          onChange={(e) => setThumbnail(e.target.value)}
          className="w-full border p-2"
          required
        />
      </div>
      <div>
        <label htmlFor="link" className="block">
          Project Link:
        </label>
        <input
          id="link"
          type="text"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          className="w-full border p-2"
          required
        />
      </div>
      <button type="submit" className="bg-blue-500 text-white p-2">
        {selectedProject ? "Update Project" : "Create Project"}
      </button>
    </form>
  );
};

export default ProjectForm;
