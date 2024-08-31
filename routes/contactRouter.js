import express from "express";
import { handleContactForm } from "../controllers/contact.js";

const router = express.Router();

router.post("/", handleContactForm);

export default router; // Ensure the router is exported as the default export
