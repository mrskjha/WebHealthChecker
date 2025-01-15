require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../model/user");

module.exports = async (req, res, next) => {
  const jwtkey = process.env.JWT_KEY;
  if (!jwtkey) {
    console.error("JWT_KEY is not defined in the environment variables");
    process.exit(1); // Exit if key is missing
  }
  // Access the token from cookies
  const token = req.cookies.token; // Ensure cookie-parser is used

  if (!token) {
    return res.status(401).send({ error: "you must be logged in" });
  }

  // Verify the token
  jwt.verify(token, jwtkey, async (err, payload) => {
    if (err) {
      return res.status(401).send({ error: "you must be logged in 2" });
    }

    const { userId } = payload;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(401).send({ error: "User not found" });
    }

    req.user = user; // Attach user info to the request object
    next(); // Proceed to the next middleware
  });
};
