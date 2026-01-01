import express from 'express';
const app = express();
import { connectDB } from './config/db.js';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
const PORT = process.env.PORT || 5000;


const corsOptions = {
  origin: ['http://localhost:3000', 'https://web-health-checker.vercel.app'],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, 
  optionsSuccessStatus: 200 
};



app.use(cors(corsOptions)); 
app.use(bodyParser.json());
app.use(cookieParser());

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware for token verification 

import authRouter from './Router/authRouter.js';
app.use("/api/auth", authRouter);

import siteRouter from './Router/siteRouter.js';
app.use("/api/site", siteRouter);

import "./Jobs/monitor.job.js"; 


const startServer = async () => {
  try {
    await connectDB(); 
    console.log("Database connected successfully");

    app.listen(PORT, () => {
      console.log(`Server listening on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1); 
  }
};

startServer();