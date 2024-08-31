import mongoose from "mongoose";

const ContactSchema = new mongoose.Schema({
  email: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  comments: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

const ContactModel = mongoose.model("Contact", ContactSchema);

export default ContactModel;
