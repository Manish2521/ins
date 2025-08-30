import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("User", userSchema, "users"); 
// <-- forces collection name = users
