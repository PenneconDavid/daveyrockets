import { body, validationResult } from "express-validator";
import ContactModel from "../models/ContactModel.js"; // Make sure the path is correct

export const handleContactForm = [
  body("email")
    .isEmail()
    .withMessage("Please enter a valid email")
    .normalizeEmail(),
  body("firstName")
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage("First name is required"),
  body("lastName")
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage("Last name is required"),
  body("comments")
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage("Comments are required"),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { email, firstName, lastName, comments } = req.body;

      // Save the form data to the database
      const newContact = new ContactModel({
        email,
        firstName,
        lastName,
        comments,
      });

      await newContact.save();

      console.log("Sanitized form submission and saved to database:", req.body);
      res.status(200).json({ message: "Contact form submitted successfully." });
    } catch (error) {
      console.error("Error saving contact form data:", error);
      res
        .status(500)
        .json({ message: "An error occurred while submitting the form." });
    }
  },
];
