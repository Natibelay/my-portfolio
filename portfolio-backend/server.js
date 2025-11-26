import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import { protect } from "./middleware/authMiddleware.js";
import Contact from "./models/contact.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const URL = process.env.RENDER_EXTERNAL_URL || `http://localhost:${PORT}`;

// Middleware
app.use(cors());           // Allow cross-origin requests
app.use(express.json());   // Parse JSON bodies

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// ------------------- Routes -------------------

// Auth routes
app.use("/api/auth", authRoutes);

// Protected route example
app.get("/api/protected", protect, (req, res) => {
  res.json({ message: `Welcome ${req.user.name}, you are authorized!` });
});

// Contact routes
app.post("/api/contact", async (req, res) => {
  try {
    const { name, message } = req.body;
    if (!name || !message) return res.status(400).json({ message: "All fields required" });

    const newMsg = new Contact({ name, message });
    await newMsg.save();
    res.status(201).json(newMsg);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get("/api/contact", async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.delete("/api/contact/:id", async (req, res) => {
  try {
    const deleted = await Contact.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Message not found" });
    res.status(200).json({ message: "Message deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.put("/api/contact/:id", async (req, res) => {
  try {
    const updated = await Contact.findByIdAndUpdate(
      req.params.id,
      { message: req.body.message },
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: "Message not found" });
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Root test route
app.get("/", (req, res) => res.send("Backend is running!"));

// Start server
app.listen(PORT, () => console.log(`Server running on ${URL}`));
