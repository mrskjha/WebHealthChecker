const express = require("express");
const app = express();
const connectDB = require("./Config/db");
const cors = require("cors");
const PORT = 5000;
const bodyParser = require("body-parser");

connectDB();


const corsOptions = {
  origin: 'http://localhost:5173', // Your frontend URL
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // Allow credentials (like cookies) to be sent
  optionsSuccessStatus: 200 // For legacy browser support
};


app.use(cors(corsOptions)); // Enable CORS with options
app.use(bodyParser.json());

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
