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

router.post('/signup', async (req, res) => {
    const { username, email, password, role,url } = req.body;

    if (!username || !email || !password || !role || !url) {
        return res.status(422).json({ error: "Please provide all the required fields" });
    }

    try {
        // Check for existing user
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return res.status(409).json({ error: "Username or email already exists" });
        }

        const user = new User({
            username,
            email,
            password,
            role,
            url
        });
        await user.save();
        // Generate JWT token
        const token = jwt.sign({ userId: user._id }, process.env.jwtkey, { expiresIn: "1h" });

        // Set the token as a cookie
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "Strict",
            maxAge: 3600000,
        });

        res.status(201).json({ message: "Signed up successfully!", token, success: true, user });
    } catch (err) {
        console.error("Signup Error:", err.message);
        res.status(500).json({ error: "Signup failed, please try again." });
    }
});

router.get("/signout", (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "Signed out successfully!" });
});

router.get("/me",async (req,res)=>{
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

  res.cookie("token", token, { httpOnly: true });

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
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  res.cookie("token", token, { httpOnly: true });

  res.status(200).json({
    success: true,
    token,
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
    },
  });
});



export default router;
