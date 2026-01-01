import jwt from "jsonwebtoken";
import User from "../model/user.js";

const authenticateUser = async (req, res, next) => {
  try {
    const token =
      req.cookies?.token || req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    // 1. FIX: Variable name wahi rakhein jo authRouter mein hai (jwtkey)
    const decoded = jwt.verify(token, process.env.jwtkey || process.env.JWT_SECRET);

    if (!decoded?.userId) {
      return res.status(401).json({ message: "Invalid token payload" });
    }

    // 2. FIX: Check karein ki user database mein exist karta hai ya nahi
    const user = await User.findById(decoded.userId);
    
    if (!user) {
      return res.status(401).json({ message: "User no longer exists" });
    }

    req.user = {
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
    };

    next();
  } catch (err) {
    console.error("Auth Middleware Error:", err.message);
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

export default authenticateUser;