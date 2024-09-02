import express from "express";
import Project from "../models/Project.js";
import cors from "cors";
import { isLoggedIn, isAdmin } from "../middlewares/authMiddleware.js";

const projectsRouter = express.Router(); // This should be defined first

const corsOptions = {
  origin: process.env.CLIENT_URL, // Use your frontend domain in production
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true, // If your frontend and backend are on different domains
};

projectsRouter.use(cors(corsOptions)); // Apply CORS options to all project routes

// Get all projects
projectsRouter.get("/", async (req, res) => {
  try {
    const projects = await Project.find();
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get single project by MongoDB _id
projectsRouter.get("/:id", async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }
    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Post new project (protected: only signed-in users can create projects)
projectsRouter.post("/", isLoggedIn, async (req, res) => {
  try {
    const { title, description, link, thumbnail } = req.body; // Ensure these field names match your model
    const newProject = new Project({
      title,
      description,
      link, // Correct field name
      thumbnail, // Correct field name
      author: req.user.id, // Assuming you have an 'author' field in the Project model
    });
    await newProject.save();
    console.log("Request body:", req.body);
    res.status(201).json(newProject);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update single project (protected: only admins or the project author can edit)
projectsRouter.put("/:id", isLoggedIn, async (req, res) => {
  try {
    const { title, description, link, thumbnail } = req.body;
    console.log("PUT Request to /api/projects/:id with data:", req.body);

    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    // Update project fields
    project.title = title || project.title;
    project.description = description || project.description;
    project.link = link || project.link;
    project.thumbnail = thumbnail || project.thumbnail;

    await project.save();
    console.log("Updated Project:", project);

    res.json(project);
  } catch (error) {
    console.error("Error updating project:", error);
    res.status(400).json({ error: error.message });
  }
});

// Delete single project (protected: only admins or the project author can delete)
projectsRouter.delete("/:id", isLoggedIn, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    // Check if the logged-in user is the author or an admin
    if (
      req.user.role !== "admin" &&
      project.author.toString() !== req.user._id
    ) {
      return res
        .status(403)
        .json({ error: "You are not authorized to delete this project" });
    }

    // Use findByIdAndDelete to remove the project
    await Project.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Project deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

export default projectsRouter;
