import express from "express";
import User from "../models/User.js";
import mongoose from "mongoose";
import { isLoggedIn, isAdmin } from "../middlewares/authMiddleware.js";

const usersRouter = express.Router();

// Create a new user (admin-only route)
usersRouter.post("/", isAdmin, async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    res.status(400).json({ error: "Error creating user" });
  }
});

// Edit a user (admin-only route)
usersRouter.put("/:id", isAdmin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    Object.assign(user, req.body);
    await user.save();

    res.status(200).json({ message: "User updated successfully", user });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// Delete a user (admin-only route)
usersRouter.delete("/:id", isAdmin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    await User.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// Get all users (admin-only route)
usersRouter.get("/", isAdmin, async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

export default usersRouter;
