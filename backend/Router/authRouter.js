require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../model/user'); // Ensure this path is correct
const { handleAddUserData } = require('../Controllers/userData');
const jwtkey = process.env.jwtkey;
if (!jwtkey) {
    console.error("jwtkey is not defined in the environment variables");
    process.exit(1); // Exit if key is missing
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
            maxAge: 3600000, // 1 hour
        });
  

        res.status(201).json({ message: "Signed up successfully!", token, success: true, user });
    } catch (err) {
        console.error("Signup Error:", err.message);
        res.status(500).json({ error: "Signup failed, please try again." });
    }
});

// Example signin route
router.post("/signin", async (req, res) => {
    const { email, password } = req.body;
    // Validate required fields
    if (!email || !password) {
        return res.status(422).json({ error: "Please provide email and password" });
    }
    try {
        // Find the user and verify the password
        const user = await User.findOne({ email });
        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ success: false, error: "Invalid credentials" });
        }

        // Ensure JWT_KEY is defined
        const jwtKey = process.env.jwtKey;
        if (!jwtKey) {
            return res.status(500).json({ error: "Server configuration error: JWT_KEY missing" });
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user._id }, jwtKey, { expiresIn: "1h" });

        // Set the token as a cookie
        res.cookie("token", token, {
            httpOnly: true, // Prevents client-side access
            secure: process.env.NODE_ENV === "production", // True in production
            maxAge: 3600000, // 1 hour
        });

        // Send response
        res.status(200).json({
            success: true,
            message: "Signed in successfully!",
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role,
                url: user.url, // Ensure `url` exists in your User model
            },
        });
    } catch (e) {
        console.error("Signin Error:", e.message);
        res.status(500).json({ error: "Signin failed, please try again." });
    }
});


router.post("/adduserdata",handleAddUserData);

module.exports = router;
