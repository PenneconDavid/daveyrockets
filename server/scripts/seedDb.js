import mongoose from "mongoose";
import bcrypt from "bcrypt";
import User from "../models/User.js";
import Blog from "../models/Blog.js";
import Project from "../models/Project.js"; // Import Project model
import { MONGO_URI } from "../config.js";
import { v4 as uuidv4 } from "uuid"; // Import UUID for generating unique user IDs

mongoose.connect(`${MONGO_URI}`);

const users = [
  {
    userId: uuidv4(),
    name: "Admin John Doe",
    email: "john.doe@example.com",
    role: "admin",
    password: "admin_password",
  },
  {
    userId: uuidv4(),
    name: "Normal Jane Doe",
    email: "jane.doe@example.com",
    role: "normal",
    password: "normal_password",
  },
];

const blogs = [
  {
    title: "Blog 1",
    content: "Content of Blog 1",
    author: null, // Placeholder, will be replaced with the actual user ID
  },
  {
    title: "Blog 2",
    content: "Content of Blog 2",
    author: null, // Placeholder, will be replaced with the actual user ID
  },
];

const projects = [
  {
    title: "Project 1",
    description: "Description of Project 1",
    thumbnail: "project1-thumbnail-url",
    link: "https://github.com/project1",
  },
  {
    title: "Project 2",
    description: "Description of Project 2",
    thumbnail: "project2-thumbnail-url",
    link: "https://github.com/project2",
  },
];

const seedUsers = async () => {
  try {
    const hashedUsers = await Promise.all(
      users.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        return { ...user, password: hashedPassword };
      })
    );

    const insertedUsers = await User.insertMany(hashedUsers);
    console.log("Users seeded:", insertedUsers);

    const blogsWithAuthors = blogs.map((blog, index) => {
      blog.author = insertedUsers[index % insertedUsers.length]._id;
      return blog;
    });

    const insertedBlogs = await Blog.insertMany(blogsWithAuthors);
    console.log("Blogs seeded:", insertedBlogs);

    const projectsWithAuthors = projects.map((project, index) => {
      project.author = insertedUsers[index % insertedUsers.length]._id;
      return project;
    });

    const insertedProjects = await Project.insertMany(projectsWithAuthors);
    console.log("Projects seeded:", insertedProjects);
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    mongoose.connection.close();
  }
};

seedUsers();
