import express from "express";
import User from "../models/User.js";

const router = express.Router();

// Save credentials to MongoDB
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const newUser = new User({ username, password });
    await newUser.save();

    res.json({ success: true, message: "Saved successfully" });
  } catch (err) {
    console.error("Error saving user:", err);
    res.status(500).json({ error: "Failed to save user" });
  }
});

export default router;
