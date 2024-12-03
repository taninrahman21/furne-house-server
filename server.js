
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { connectDB } from "./config/db.js";
import { errorHandler } from "./middlewares/errorMiddleware.js";
import userRoute from "./routes/userRoute.js";
dotenv.config();
const PORT = process.env.PORT || 5000;

const app = express();

//middlewares
app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(
  cors(
    { origin: ["http://localhost:3000"], credentials: true }

  ));

// router handlers
app.use('/api/user', userRoute)


// error handling middleware
app.use(errorHandler);


// routes
app.get("/", (req, res) => {
  res.send("App Server is running");
});

app.listen(PORT, () => {
  connectDB();
  console.log(`App server is running on port ${PORT}`);
});



































// const dotenvConfig = require('./config/dotenv');
// const express = require('express');
// const connectDB = require('./config/db');
// const productRoutes = require('./routes/productRoutes');

// import express  from 'express';
// import { connectDB } from './config/db';
// const PORT = process.env.PORT || 5000;

// const app = express();
// app.use(express.json());

// // database connected
// connectDB();


// // Routes
// // app.use('/', productRoutes);

// app.get('/', (req, res) => res.send('API is running...'));

// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));