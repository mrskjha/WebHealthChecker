require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../model/user");

module.exports = async (req, res, next) => {
  try {
    // Ensure JWT key is set
    const jwtKey = process.env.jwtkey; // Use uppercase key for consistency
    if (!jwtKey) {
      console.error("JWT_KEY is not defined in the environment variables");
      return res.status(500).json({ error: "Server configuration error" });
    }

    // Get token from cookies
    let token = req.cookies?.token; // Use optional chaining to prevent errors
    if (!token && req.headers.authorization?.startsWith("Bearer")) {
      // Get token from Authorization header
      token = req.headers.authorization.split(" ")[1];
      
    }
    if (!token) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    // Verify token
    jwt.verify(token, jwtKey, async (err, payload) => {
      if (err) {
        console.error("JWT Verification Error:", err.message);
        return res.status(401).json({ error: "Invalid or expired token" });
      }

      try {
        const { userId } = payload;
        const user = await User.findById(userId);
        if (!user) {
          return res.status(401).json({ error: "User not found" });
        }
        req.user = user; 
        next(); 
      } catch (error) {
        console.error("Database Error:", error.message);
        return res.status(500).json({ error: "Internal server error" });
      }
    });
  } catch (error) {
    console.error("Unexpected Error:", error.message);
    return res.status(500).json({ error: "Server error" });
  }
};
