import mongoose from "mongoose"; // Import Mongoose to work with MongoDB

// Define the structure of a contact message
const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },     // Name is required
  message: { type: String, required: true },  // Message is required
  createdAt: { type: Date, default: Date.now } // Timestamp when created
});

// Create a model for the "contacts" collection in MongoDB
// Use this model to create, read, update, or delete contact messages
export default mongoose.model("Contact", contactSchema);
