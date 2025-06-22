import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

import roleRoute from "./routes/role.js";
import authRoute from "./routes/auth.js";
import articleRoute from "./routes/article.js";

import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

dotenv.config();

app.use(
  cors({
    origin: "http://localhost:4200",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static("uploads"));

app.use("/api/roles", roleRoute);
app.use("/api/auth", authRoute);
app.use("/api/articles", articleRoute);

// DB Connection
const connectMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to DB !");
  } catch (error) {
    throw error;
  }
};

app.listen(8000, () => {
  connectMongoDB();
  console.log("Connected to backend !");
});
