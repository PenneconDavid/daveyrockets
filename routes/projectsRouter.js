const express = require("express");
const projectsRouter = express.Router();
const Project = require("../models/Project");
const { isAdmin } = require("../middleware/authMiddleware");

// Get all projects
projectsRouter.get("/", async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch projects" });
  }
});

// Get a single project by ID
projectsRouter.get("/:id", async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ error: "Project not found" });
    res.json(project);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch project" });
  }
});

// Create a new project
projectsRouter.post("/", isAdmin, async (req, res) => {
  try {
    const { title, description, thumbnail, link } = req.body;

    if (!title || !description || !thumbnail || !link) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newProject = new Project({
      title,
      description,
      thumbnail,
      link,
    });

    await newProject.save();
    res.status(201).json(newProject);
  } catch (err) {
    res.status(500).json({ error: "Failed to create project" });
  }
});

// Update an existing project
projectsRouter.put("/:id", isAdmin, async (req, res) => {
  try {
    const { title, description, thumbnail, link } = req.body;

    if (!title || !description || !thumbnail || !link) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ error: "Project not found" });

    project.title = title;
    project.description = description;
    project.thumbnail = thumbnail;
    project.link = link;

    await project.save();
    res.json(project);
  } catch (err) {
    res.status(500).json({ error: "Failed to update project" });
  }
});

// Delete a project
projectsRouter.delete("/:id", isAdmin, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ error: "Project not found" });

    await project.remove();
    res.json({ message: "Project deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete project" });
  }
});

module.exports = projectsRouter;
