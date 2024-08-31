import express from "express";
import Blog from "../models/Blog.js";
import mongoose from "mongoose";
import { isLoggedIn, isAdmin } from "../middlewares/authMiddleware.js";

const blogsRouter = express.Router();

// Get all blogs
blogsRouter.get("/", async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get single blog by mongodb _id
blogsRouter.get("/:id", async (req, res) => {
  try {
    const blogId = new mongoose.Types.ObjectId(req.params.id);
    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }
    res.json(blog);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Post new blog (protected: only signed-in users can create blogs)
blogsRouter.post("/", isLoggedIn, async (req, res) => {
  try {
    const { title, content } = req.body;
    const newBlog = new Blog({ title, content, author: req.user.id }); // Assuming you have an 'author' field in the Blog model
    await newBlog.save();
    res.status(201).json(newBlog);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update single blog (protected: only admins or the blog author can edit)
blogsRouter.put("/:id", isLoggedIn, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;

    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }

    if (blog.author.toString() !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({ error: "Forbidden" });
    }

    blog.title = title;
    blog.content = content;
    await blog.save();

    res.json(blog);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete single blog (protected: only admins or the blog author can delete)
blogsRouter.delete("/:id", isLoggedIn, async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }

    // Check if the logged-in user is the author or an admin
    if (req.user.role !== "admin" && blog.author.toString() !== req.user._id) {
      return res
        .status(403)
        .json({ error: "You are not authorized to delete this blog" });
    }

    // Use findByIdAndDelete to remove the blog
    await Blog.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

export default blogsRouter;
