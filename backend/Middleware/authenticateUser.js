const jwt = require("jsonwebtoken");
const User = require("../model/user");

const authenticateUser = async (req, res, next) => {
    const token = req.cookies.token; 

  if (!token) {
    return res.status(401).json({ message: "Unauthorized! Login Required." });
  }

  try {
    const decoded = jwt.verify(token, "your_secret_key"); 
    req.user = await User.findById(decoded.id); 
    if (!req.user) return res.status(404).json({ message: "User Not Found" });
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid Token" });
  }
};

module.exports = authenticateUser;