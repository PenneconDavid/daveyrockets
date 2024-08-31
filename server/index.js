import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { connectToDatabase } from "./db/dbconn.js";
import { PORT } from "./config.js";
import blogsRouter from "./routes/blogsRouter.js";
import usersRouter from "./routes/usersRouter.js";
import contactRouter from "./routes/contactRouter.js";
import authRouter from "./routes/authRouter.js";
import projectsRouter from "./routes/projectsRouter.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();

const corsOptions = {
  origin: process.env.CLIENT_URL,
  credentials: true, // Allow cookies to be sent
};

app.use(cors(corsOptions)); // Set up CORS with options
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

await connectToDatabase();

app.use(cors(corsOptions));

// Blog routes
app.use("/api/blogs", blogsRouter);

// User routes
app.use("/api/users", usersRouter);

// Contact routes
app.use("/api/contact", contactRouter);

// Auth routes
app.use("/api/auth", authRouter);

// Project routes
app.use("/api/projects", projectsRouter);

app.listen(PORT, () => console.log(`backend server started on port ${PORT}`));

app.use((req, res, next) => {
  console.log(`Received ${req.method} request for ${req.url}`);
  next();
});
