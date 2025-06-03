import express from "express";
import dotenv from "dotenv"; 
// Importing routes

import { connectDB } from "./lib/db.js";

import authRoutes from "./routes/auth.route.js";
dotenv.config();

const app = express();

const PORT = process.env.PORT ;
app.use(express.json()); // Middleware to parse JSON bodies

app.use("/api/auth", authRoutes)

app.listen(PORT, () => {
    console.log("Server is running on PORT:" + PORT);
    connectDB();
    }); 