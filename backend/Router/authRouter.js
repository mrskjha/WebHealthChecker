import dotenv from "dotenv";
dotenv.config();
import express from "express";
import jwt from "jsonwebtoken";
import User from "../model/user.js";
const jwtkey = process.env.jwtkey;
if (!jwtkey) {
  console.error("jwtkey is not defined in the environment variables");
  process.exit(1);
}
const router = express.Router();

router.get("/signout", (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "Signed out successfully!" });
});

router.get("/me", async (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  try {
    const decoded = jwt.verify(token, process.env.jwtkey);
    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json({ user });
  } catch (err) {
    console.error("Me Error:", err.message);
    res.status(401).json({ error: "Invalid token" });
  }
});

router.post("/signup", async (req, res) => {
  const { username, email, password, role } = req.body;

  if (!username || !email || !password || !role) {
    return res.status(422).json({ error: "All fields required" });
  }

  if (role !== "user") {
    return res.status(403).json({ error: "Invalid role" });
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(409).json({ error: "User already exists" });
  }

  const user = await User.create({ username, email, password, role });

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  res.cookie("token", token, {
  httpOnly: true,
  secure: true,      
  sameSite: "none",  
  maxAge: 3600000    
});

  res.status(201).json({
    success: true,
    user: {
      id: user._id,
      username,
      email,
      role,
    },
  });
});

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(422).json({ error: "Email and password required" });
  }
  const user = await User.findOne({ email });
  if (!user || !(await user.comparePassword(password))) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const token = jwt.sign({ userId: user._id }, process.env.jwtkey, {
    expiresIn: "1h",
  });

  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 3600000,
  });

  res.status(200).json({
    success: true,
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
    },
  });
});

export default router;
