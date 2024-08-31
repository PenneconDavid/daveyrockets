import express from "express";
import Project from "../models/Project.js";
import mongoose from "mongoose";
import { isLoggedIn, isAdmin } from "../middlewares/authMiddleware.js";
import cors from "cors";

const corsOptions = {
  origin: process.env.CLIENT_URL || "https://daveyrockets.vercel.app", // Replace with your frontend URL
  credentials: true,
};

projectsRouter.use(cors(corsOptions)); // Apply CORS options to all project routes

// Create a new project
projectsRouter.post("/", isLoggedIn, isAdmin, async (req, res) => {
  try {
    console.log("Request body received:", req.body); // Log the received data
    const project = new Project(req.body);
    console.log("Project instance created:", project); // Log the created project instance
    await project.save();
    console.log("Project saved to database successfully.");
    res.status(201).json(project);
  } catch (error) {
    console.error("Detailed error creating project:", error); // More detailed error logging
    res
      .status(500)
      .json({ error: "Error creating project", details: error.message });
  }
});

// Get all projects
projectsRouter.get("/", async (req, res) => {
  try {
    const projects = await Project.find();
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ error: "Error fetching projects" });
  }
});

// Update a project
projectsRouter.put("/:id", isLoggedIn, isAdmin, async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }
    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ error: "Error updating project" });
  }
});

// Delete a project
projectsRouter.delete("/:id", isLoggedIn, isAdmin, async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }
    res.status(200).json({ message: "Project deleted" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting project" });
  }
});

export default projectsRouter;
