import React, { useEffect, useState } from "react";
import { getProjects } from "../api/projectAPI";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const projectsData = await getProjects();
        if (Array.isArray(projectsData)) {
          setProjects(projectsData);
        } else if (projectsData && projectsData.length === 0) {
          setProjects([]);
        } else {
          setError("Unexpected response format.");
        }
      } catch (error) {
        console.error("Error fetching projects:", error);
        setError("Failed to load projects.");
      }
    };

    fetchProjects();
  }, []);

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  return (
    <div className="container bg-[#282828] mx-auto p-4 pb-40 max-w-8xl">
      <h1 className="text-5xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-[#EFBD19] to-[#8000FF] mb-8 py-10">
        Projects
      </h1>
      {projects.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div
              key={project._id}
              className="bg-gray-800 p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <img
                src={project.thumbnail}
                alt={project.title}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <div className="p-4">
                <h2 className="text-2xl font-semibold bg-gray-800 text-lime-600">
                  {project.title}
                </h2>
                <p className="text-[#F3EACC] bg-gray-800 mt-2 text-[18px]">
                  {project.description}
                </p>
                <a
                  href={project.link}
                  className="text-blue-400 mt-4 block text-center hover:text-blue-500"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Project
                </a>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-[#F3EACC] text-center text-[18px]">
          No projects found.
        </div>
      )}
    </div>
  );
};

export default Projects;