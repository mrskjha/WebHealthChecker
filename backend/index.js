const express = require("express");
const app = express();
const connectDB = require("./Config/db");
const PORT = 5000;

connectDB();

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware for token verification (applied selectively later)

const authRouter = require("./Router/authRouter");
app.use("/api/auth", authRouter);

const siteRouter = require("./Router/siteRouter");
app.use("/api", siteRouter);



app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
