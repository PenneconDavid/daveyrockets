import express from "express";
import bcrypt from "bcrypt";
import User from "../models/User.js";
import { login, logout } from "../controllers/auth.js";
import { isAdmin, isLoggedIn } from "../middlewares/authMiddleware.js";

const authRouter = express.Router(); // This should be defined first

authRouter.get("/admin-dashboard", isAdmin, (req, res) => {
  res.status(200).json({ message: "Welcome to the admin dashboard" });
});

authRouter.get("/user-profile", isLoggedIn, (req, res) => {
  res.status(200).json({ message: "Welcome to your profile" });
});

// POST route to handle login
authRouter.post(
  "/login",
  (req, res, next) => {
    console.log("Login route hit with body:", req.body); // Log the request body
    next();
  },
  login
);

// POST route to handle logout
authRouter.post("/logout", logout);

// POST route to handle user registration
authRouter.post("/register", async (req, res) => {
  const { email, password, name } = req.body;
  console.log("Received password:", password);

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Hashed password:", hashedPassword);

    const newUser = new User({
      email,
      password: hashedPassword,
      name,
    });

    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// PUT route to handle password update
authRouter.put("/update-password", async (req, res) => {
  const { email, newPassword } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;

    await user.save();

    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

export default authRouter;
